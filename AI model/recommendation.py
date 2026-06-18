import pandas as pd
from sqlalchemy import create_engine
from sklearn.metrics.pairwise import cosine_similarity

engine = create_engine('postgresql://postgres:bodaelking@localhost:5432/Glide')

def fetch_user_purchase_profiles():
    """Connects to PostgreSQL and extracts what cuisines users have bought"""
    # Replace with your actual database credentials
    
    # This query joins orders to order_items and menu_items to see exactly 
    # what cuisine types each user spending habits lean toward.
    query = """
        SELECT 
            o.user_id,
            m.cuisine_tag,
            SUM(oi.quantity) as total_quantity
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items m ON oi.menu_item_id = m.id
        GROUP BY o.user_id, m.cuisine_tag;
    """
    df = pd.read_sql(query, con=engine)
    return df

def fetch_all_menu_items():
    """Fetches all items so we know what to recommend"""
    return pd.read_sql("SELECT id, name, cuisine_tag FROM menu_items;", con=engine)

def fetch_all_user_orders():
    """Fetches past items users already bought so we don't recommend them again"""
    query = """
        SELECT DISTINCT o.user_id, oi.menu_item_id
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id;
    """
    return pd.read_sql(query, con=engine)

def build_collaborative_engine():
    # 1. Load profiles from the database
    profiles_df = fetch_user_purchase_profiles()

    if profiles_df.empty:
        print("No purchase patterns found. Seed your orders and order_items tables first!")
        return None, None

    # 2. Pivot into a User-Cuisine Profile Matrix
    # Rows = Users, Columns = Cuisine Tags, Values = Total Quantities Ordered
    user_matrix = profiles_df.pivot(index='user_id', columns='cuisine_tag', values='total_quantity').fillna(0)

    # 3. Calculate User-to-User Similarity using Cosine Similarity
    user_sim = cosine_similarity(user_matrix)

    user_similarity_df = pd.DataFrame(user_sim, index=user_matrix.index, columns=user_matrix.index)

    return user_matrix, user_similarity_df 

def recommend_for_user(target_user_id, user_matrix, user_similarity_df, top_n=4):
    if target_user_id not in user_matrix.index:
        return f"User {target_user_id} has no purchase history yet (Cold Start)."
        
    # Find the most similar users to our target user (excluding themselves)
    similar_users = user_similarity_df[target_user_id].sort_values(ascending=False).iloc[1:]
    
    # If no other similar users exist, exit early
    if similar_users.empty or similar_users.iloc[0] == 0:
        return "No similar peer users found based on cuisine taste."
        
    # Get items already bought by the target user to filter them out
    past_orders = fetch_all_user_orders()
    bought_items = past_orders[past_orders['user_id'] == target_user_id]['menu_item_id'].tolist()
    
    # Look at what our most similar peer user has ordered
    peer_user_id = similar_users.index[0]
    peer_items = past_orders[past_orders['user_id'] == peer_user_id]['menu_item_id'].tolist()
    
    # Find items the peer bought but our target user hasn't tried yet
    recommendation_candidates = [item for item in peer_items if item not in bought_items]
    
    # Fetch clean names for these item IDs
    all_items = fetch_all_menu_items()
    recommended_dishes = all_items[all_items['id'].isin(recommendation_candidates)].head(top_n)
    
    return recommended_dishes[['id', 'name', 'cuisine_tag']]

if __name__ == "__main__":
    u_matrix, u_sim_df = build_collaborative_engine()

    if u_matrix is not None:
        # Test finding recommendations for User 2 based on User 3's overlapping tastes
        print("--- Generating User-Based Collaborative Recommendations ---")
        print(recommend_for_user(target_user_id=14, user_matrix=u_matrix, user_similarity_df=u_sim_df))