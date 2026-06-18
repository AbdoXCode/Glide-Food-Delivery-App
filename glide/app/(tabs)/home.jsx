import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OfferList from "../../components/OfferList";
import RestaurantList from "../../components/RestaurantList";
import { colors } from "../../constants/theme";
import useRestaurants from "../../hooks/useRestaurants";

export default function Home() {
  const inset = useSafeAreaInsets();

  const { restaurants, popularRestaurants } = useRestaurants();
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={[{ paddingTop: inset.top }, styles.header]}>
        <View style={styles.statusBar}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.addressBox}>
              <Text style={{ color: "#ffffff", fontWeight: "300" }}>
                Deliver to{" "}
                <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Alexandria, Egypt
                </Text>
              </Text>
              <Ionicons name="chevron-down" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search-outline" size={22} color="#9CA3AF" />
          <Text style={styles.searchText}>
            Search food, groceries and more...
          </Text>
        </TouchableOpacity>
      </View>
      {/* content */}
      <ScrollView>
        <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
          {/* offer list */}
          <OfferList
            img={[
              require("../../assets/images/papa johns.jpg"),
              require("../../assets/images/papa ranch.jpg"),
              require("../../assets/images/domino.jpg"),
            ]}
          />
        </View>

        <View
          style={{
            // flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <Text style={styles.sectionTitle}>Fastest Near You</Text>
          <RestaurantList restaurants={restaurants} />

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            Highest Rating
          </Text>
          <RestaurantList restaurants={popularRestaurants} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    height: 150,
    width: "100%",
    backgroundColor: colors.light.primaryColor,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    width: "90%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
  searchText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
