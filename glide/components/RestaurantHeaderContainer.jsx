import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

export default function RestaurantHeaderContainer({ restaurant }) {
  return (
    <View style={styles.restaurantContainer}>
      <View style={styles.topSectionContainer}>
        <Image
          source={{
            uri:
              restaurant?.image_url ||
              "https://dummyimage.com/600x400/fff&text=Restaurant+Image",
          }}
          style={styles.restaurantImage}
        />

        <View>
          <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          <Text style={styles.restaurantCuisine}>
            {restaurant?.cuisine_type}
          </Text>
          <Text style={styles.restaurantAddress}>{restaurant?.address}</Text>
          <View style={styles.info}>
            <Text style={styles.restaurantRating}>
              ⭐ {restaurant?.rating}{" "}
              <Text style={{ color: "#666" }}>
                ({Math.floor(Math.random() * 1000) + 100} reviews)
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
          <MaterialIcons name="delivery-dining" size={16} color="#000" />
          <Text>{restaurant?.delivery_fee} EGP</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#959595" }}>
          •
        </Text>
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
          <Ionicons name="time-outline" size={16} color="#000" />
          <Text>{restaurant?.delivery_time} min</Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#959595" }}>
          •
        </Text>
        <Text>
          Delivered by{" "}
          <Text style={{ fontWeight: "bold", color: "#3EC8B1", fontSize: 16 }}>
            Glide
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantContainer: {
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 20,
  },
  topSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  restaurantImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantCuisine: {
    fontSize: 16,
    color: "#666",
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#999",
  },
  restaurantRating: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 4,
  },
});
