import { StyleSheet } from "react-native";
import TextInputField from "./TextInputField";

export default function SearchBox() {
  return (
    <TextInputField
      placeholder="Search food, groceries and more..."
      style={styles.searchInput}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 25,
    alignItems: "center",
    gap: 10,
  },
});
