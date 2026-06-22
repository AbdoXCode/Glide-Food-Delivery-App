import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RestaurantList from "../../components/RestaurantList";
import SearchBox from "../../components/SearchBox";
import useRestaurants from "../../hooks/useRestaurants";
import useSearch from "../../hooks/useSearch";

export default function search() {
  const { restaurants, recommendedRestaurants } = useRestaurants();
  const { searchHistory, addSearch } = useSearch();
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState("");

  const searchedRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSearchSubmit(text) {
    const trimmedText = text.trim();
    if (trimmedText) {
      addSearch(trimmedText);
    }
  }
  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 16 }]}
      contentContainerStyle={{ paddingBottom: insets.bottom * 3 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <SearchBox
        onSearch={() => {
          handleSearchSubmit(query);
        }}
        query={query}
        setQuery={setQuery}
      />

      {/* RECENT SEARCHES (Only displays when search input is empty) */}
      {query.length === 0 && searchHistory && searchHistory.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.historyContainer}>
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                key={`${item}-${index}`}
                style={styles.historyItem}
                onPress={() => {
                  // console.log("Recent search selected:", item); // Debugging line
                  setQuery(item);
                }}
              >
                <Text style={styles.historyText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* SEARCH RESULTS SECTION */}
      {searchedRestaurants.length > 0 ? (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <RestaurantList restaurants={searchedRestaurants} />
        </View>
      ) : (
        query.length > 0 && (
          <View
            style={{ marginTop: 24, marginBottom: 16, alignItems: "center" }}
          >
            <Text>No results found</Text>
          </View>
        )
      )}

      {/* RECOMMENDATIONS SECTION */}
      <View style={styles.sectionContainer}>
        {recommendedRestaurants.length > 0 && (
          <Text style={[styles.sectionTitle, { marginTop: 8 }]}>
            Recommended Restaurants
          </Text>
        )}
        <RestaurantList restaurants={recommendedRestaurants} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  sectionContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 8,
    marginBottom: 16,
  },
  historyItem: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  historyText: {
    fontSize: 14,
    color: "#333333",
  },
});
