import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuantityContainer({ item, updateQuantity, style }) {
  return (
    <View style={[styles.quantityContainer, style]}>
      <TouchableOpacity
        onPress={() => {
          if (item.quantity <= 1) {
            updateQuantity(item.id, 0); // Assuming 0 quantity means delete
          }
          updateQuantity(item.id, Math.max(1, item.quantity - 1));
        }}
      >
        <Ionicons
          name={item.quantity > 1 ? "remove" : "trash"}
          size={22}
          color={item.quantity > 1 ? "#3EC8B1" : "#ccc"}
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.quantity}</Text>

      <TouchableOpacity
        onPress={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
        disabled={item.quantity >= 99}
      >
        <Ionicons
          name="add"
          size={22}
          color={item.quantity < 99 ? "#3EC8B1" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
  },
});
