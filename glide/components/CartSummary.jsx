import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartSummary({ cartTotal }) {
  return (
    <View>
      <View style={{ marginVertical: 20, gap: 10 }}>
        <View style={styles.feeRow}>
          <Text>Subtotal</Text>
          <Text>{cartTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text>Delivery Fee</Text>
          <Text>14.00</Text>
        </View>

        <View style={styles.feeRow}>
          <Text>Service Fee</Text>
          <Text>5.00</Text>
        </View>

        <View style={styles.feeRow}>
          <Text style={styles.totalText}>Total amount (EGP) </Text>
          <Text>{(cartTotal() + 14.0 + 5.0).toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutButton: {
    backgroundColor: "#3EC8B1",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
