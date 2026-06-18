import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RestaurantList from "../../components/RestaurantList";
import SearchBox from "../../components/SearchBox";
import useRestaurants from "../../hooks/useRestaurants";

export default function search() {
  const { recommendedRestaurants } = useRestaurants();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <SearchBox />
      <View>
        {recommendedRestaurants.length > 0 && (
          <Text style={styles.sectionTitle}>Recommended Restaurants</Text>
        )}
        <RestaurantList restaurants={recommendedRestaurants} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
