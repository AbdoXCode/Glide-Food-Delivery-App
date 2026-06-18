import { FlatList } from "react-native";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ restaurants }) {
  return (
    <FlatList
      horizontal
      data={restaurants}
      renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 16,
      }}
    />
  );
}
