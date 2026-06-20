import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuCard({ item }) {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={() =>
        router.push({
          pathname: `/menu/${item.id}`,
          params: { menuItem: JSON.stringify(item) },
        })
      }
    >
      <View style={styles.menuItem}>
        <View>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription} numberOfLines={3}>
            {item.description}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.menuItemPrice}>EGP {item.price.toFixed(2)}</Text>
          <Text style={styles.menuDiscountPrice}>
            EGP {(item.price + 8).toFixed(2)}
          </Text>
        </View>
      </View>

      <Image
        source={{
          uri:
            item.image_url ||
            "https://dummyimage.com/200x200/fff&text=NO+Image",
        }}
        style={styles.menuItemImage}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 15,
  },
  menuItem: {
    flex: 0.9,
    gap: 25,
  },

  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },

  menuItemDescription: {
    fontSize: 16,
    color: "#666",
  },
  menuItemPrice: {
    fontSize: 16,
    color: "#3EC8B1",
  },
  menuDiscountPrice: {
    fontSize: 16,
    color: "#929292",
    textDecorationLine: "line-through",
  },
  menuItemImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
