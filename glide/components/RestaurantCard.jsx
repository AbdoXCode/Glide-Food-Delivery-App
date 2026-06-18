import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RestaurantCard({ restaurant }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: restaurant.image_url }} style={styles.image} />
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <View style={styles.info}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.tag}>
            <Text style={styles.cuisineTag}>{restaurant.cuisine_type}</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="time-outline" size={16} color="#ffffff" />
            <Text style={styles.cuisineTag}>30 min</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="bicycle" size={16} color="#ffffff" />
            <Text style={styles.cuisineTag}>14 EGP</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: 15,
    shadowColor: "#000",
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deliveryTime: {
    fontSize: 16,
  },
  deliveryFee: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#3EC8B1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  cuisineTag: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
