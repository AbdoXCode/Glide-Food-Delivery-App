import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartBar({ cartItems, cartTotal, cartLength }) {
  // cartLength = cartItems;
  console.log("Cart Items in CartBar:", cartItems);
  return (
    <TouchableOpacity
      style={styles.cartBar}
      onPress={() => router.push("/cart")}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={styles.cartCount}>
          <Text style={styles.cartCountText}>{cartLength()}</Text>
        </View>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          View Cart
        </Text>
      </View>

      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        EGP {cartTotal().toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartBar: {
    backgroundColor: "#3EC8B1",
    padding: 12,
    borderRadius: 50,
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartCount: {
    backgroundColor: "#69e1cd",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
