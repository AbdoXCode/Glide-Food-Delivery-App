import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartSummary from "../../components/CartSummary";
import QuantityContainerCart from "../../components/QuantityContainerCart";
import useCart from "../../hooks/useCart";
import useRestaurants from "../../hooks/useRestaurants";
import useUser from "../../hooks/useUser";

export default function cart() {
  const { cartItems, cartTotal, updateQuantity, submitOrder } = useCart();
  const { fetchRestaurantDetails } = useRestaurants();
  const { user } = useUser();

  const inset = useSafeAreaInsets();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    async function loadRestaurant() {
      const data = await fetchRestaurantDetails(cartItems[0]?.restaurant_id);
      setRestaurant(data);
    }

    loadRestaurant();
  }, []);

  if (cartItems.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
        <FlatList
          style={{ paddingTop: inset.top }}
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              <Text style={styles.headerCart}>Cart </Text>
              <Text style={styles.restaurantNameCart}>
                {restaurant?.name || "Loading..."}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16, marginTop: "25%" }}>
                  EGP {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>

              <View style={styles.imageContainerQuantity}>
                <Image
                  source={{
                    uri:
                      item.image_url ??
                      "https://dummyimage.com/200x200/fff&text=NO+Image",
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: 10,
                    borderRadius: 10,
                    position: "relative",
                  }}
                />

                <QuantityContainerCart
                  item={item}
                  updateQuantity={updateQuantity}
                  style={{ position: "absolute", right: 0, bottom: 5 }}
                />
              </View>
            </View>
          )}
        />

        <CartSummary
          cartTotal={cartTotal}
          deliveryFee={restaurant?.delivery_fee}
          onCheckout={() => {
            submitOrder(
              user?.user.id,
              restaurant?.id,
              "pending",
              cartTotal() + (restaurant?.delivery_fee ?? 0) + 5,
            );
            router.navigate("/orders");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerCart: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
  },
  restaurantNameCart: {
    fontSize: 15,
    marginBottom: 10,
    color: "#666",
  },
  cartItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainerQuantity: {
    position: "relative",
  },
});
