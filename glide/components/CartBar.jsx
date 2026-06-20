import { StyleSheet, Text, View } from "react-native";

export default function CartBar() {
  return (
    <View style={styles.cartBar}>
      <Text>CartBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartBar: {
    backgroundColor: "#3EC8B1",
    padding: 12,
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
