import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuItemDetails() {
  const { id, menuItem } = useLocalSearchParams();

  const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;
  console.log("Menu item data:", parsedMenuItem);

  const [quantity, setQuantity] = useState(1);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              parsedMenuItem?.image_url ||
              "https://dummyimage.com/200x200/fff&text=NO+Image",
          }}
          style={styles.menuItemImage}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            {parsedMenuItem?.name || "Menu Item Name"}
          </Text>

          <Text style={{ fontSize: 16, color: "#666", marginBottom: 8 }}>
            {parsedMenuItem?.description || "Menu Item Description"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Ionicons name="remove" size={22} color="#000" />
            </TouchableOpacity>

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{quantity}</Text>

            <TouchableOpacity
              onPress={() => setQuantity(Math.min(99, quantity + 1))}
            >
              <Ionicons name="add" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              router.back();
            }}
          >
            <Text
              style={{ color: "#fff", fontWeight: "semibold", fontSize: 18 }}
            >
              Add to Cart
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
              {parsedMenuItem?.price * quantity} EGP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 0.5,
  },
  menuItemImage: {
    height: "100%",
  },
  detailsContainer: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
    paddingBottom: 32,
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
  },
  addToCartButton: {
    backgroundColor: "#3EC8B1",
    padding: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
