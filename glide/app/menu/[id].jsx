import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QuantityContainer from "../../components/QuantityContainer";
import useCart from "../../hooks/useCart";

export default function MenuItemDetails() {
  const { id, menuItem } = useLocalSearchParams();

  const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;

  const [quantity, setQuantity] = useState(1);

  const { addToCart, clearCart } = useCart();

  function handleAddToCart() {
    const result = addToCart({ ...parsedMenuItem, quantity });

    if (result.success) {
      router.back(); // Navigate back to the previous screen after adding to cart
    }
    if (!result.success) {
      Alert.alert(
        "Different restaurant",
        `Your cart contains items from another restaurant. Do you want to clear it and add this item?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Clear Cart",
            onPress: () => {
              clearCart();
              addToCart({ ...parsedMenuItem, quantity });
              router.back(); // Navigate back to the previous screen after clearing the cart
            },
          },
        ],
      );
    }
  }
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
          <QuantityContainer
            item={{ ...parsedMenuItem, quantity }}
            updateQuantity={(_, newQuantity) => setQuantity(newQuantity)}
          />

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              handleAddToCart();
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
