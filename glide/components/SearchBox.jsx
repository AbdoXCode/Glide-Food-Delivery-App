import { StyleSheet } from "react-native";
import TextInputField from "./TextInputField";

export default function SearchBox({ onSearch, query, setQuery }) {
  return (
    <TextInputField
      placeholder="Search food, groceries and more..."
      style={styles.searchInput}
      value={query}
      onChangeText={setQuery}
      returnKeyType="search" // Changes keyboard "Enter" to a "Search" button
      onSubmitEditing={onSearch}
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
