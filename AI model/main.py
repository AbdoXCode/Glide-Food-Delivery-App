# app/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
# Import your model functions here...

from recommendation import build_collaborative_engine, recommend_for_user

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Welcome to the Recommendation API"}

@app.get("/recommend/{user_id}")
def get_user_recommendations(user_id: int):
    # 1. Re-calculate or fetch the matrices
    u_matrix, u_sim_df = build_collaborative_engine()
    
    # 2. Run your prediction logic
    recommendations = recommend_for_user(user_id, u_matrix, u_sim_df, top_n=4)
    
    if isinstance(recommendations, str):
        return {"status": "success", "data": [], "message": recommendations,"status": 422}
        
    # 3. Convert pandas DataFrame directly to native JSON dict
    return {"status": "success", "data": recommendations.to_dict(orient="records"),"status": 200}