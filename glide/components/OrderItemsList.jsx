import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

export default function OrderItemsList({ orderDetailsList }) {
  return (
    <FlatList
      data={orderDetailsList}
      keyExtractor={(item, index) => String(item.id ?? index)}
      renderItem={({ item }) => (
        <View style={styles.itemCard}>
          <Image
            source={{
              uri:
                item.image_url ??
                "https://dummyimage.com/200x200/fff&text=NO+Image",
            }}
            style={styles.itemImage}
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>

            <Text style={styles.itemPrice}>
              EGP {Number(item.price ?? 0).toFixed(2)}
            </Text>

            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
  },

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
  },

  itemInfo: {
    marginLeft: 14,
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  itemPrice: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: colors.light.primaryColor,
  },

  itemQuantity: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 14,
  },
});
