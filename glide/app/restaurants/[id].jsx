import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartBar from "../../components/CartBar";
import MenuCard from "../../components/MenuCard";
import RestaurantHeaderContainer from "../../components/RestaurantHeaderContainer";
import useCart from "../../hooks/useCart";
import useRestaurants from "../../hooks/useRestaurants";

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();
  const inset = useSafeAreaInsets();

  const { fetchRestaurantDetails, fetchRestaurantMenu } = useRestaurants();
  const { cartItems, cartTotal, cartLength } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function loadData() {
      const details = await fetchRestaurantDetails(id);
      const menuData = await fetchRestaurantMenu(id);

      setRestaurant(details);
      setMenu(menuData);
    }

    loadData();
  }, [id]);

  if (!restaurant) {
    return (
      <ActivityIndicator size="large" color="#3EC8B1" style={{ flex: 1 }} />
    );
  }

  //   console.log("Menu data:", menu);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        style={styles.container}
        contentContainerStyle={{
          paddingTop: inset.top,
          padding: 20,
        }}
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <RestaurantHeaderContainer restaurant={restaurant} />
        }
        renderItem={({ item }) => <MenuCard item={item} />}
      />

      {cartLength() > 0 && (
        <CartBar
          cartItems={cartItems}
          cartTotal={cartTotal}
          cartLength={cartLength}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
