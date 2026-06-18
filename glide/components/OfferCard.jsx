import { Image, StyleSheet } from "react-native";

export default function OfferCard({ img }) {
  return <Image source={img} style={styles.image} resizeMethod="contain" />;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
});
