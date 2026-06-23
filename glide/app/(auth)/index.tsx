import { colors } from "@/constants/theme";
import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Index() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        // "../assets/images/onboarding/glide logo.jpg"
        source={require("../../assets/images/onboarding/glide logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Order Food for{`\n`}
        <Text style={styles.titleHighlight}>Everyone</Text>
      </Text>

      <Image
        source={require("../../assets/images/onboarding/onboarding person.png")}
        style={[styles.characters, { width, marginLeft: -18 }]}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/signin")}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.primaryColor,
    paddingTop: 44,
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  title: {
    marginTop: 26,
    marginLeft: 6,
    color: "#FFFFFF",
    fontSize: 48,
    lineHeight: 48,
    fontWeight: "900",
    letterSpacing: -1.4,
    width: 250,
  },
  titleHighlight: {
    backgroundColor: "#A8FF6A",
    color: "#0F172A",
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: "hidden",
    transform: [{ rotate: "50deg" }],
  },
  characters: {
    marginTop: 8,
    flex: 1,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginHorizontal: 10,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  buttonText: {
    color: "#2FB7A6",
    fontSize: 17,
    fontWeight: "700",
  },
});
