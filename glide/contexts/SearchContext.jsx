import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([]);

  console.log("Search history updated:", searchHistory);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const data = await AsyncStorage.getItem("searchHistory");

    if (data) {
      setSearchHistory(JSON.parse(data));
    }
  }

  async function addSearch(query) {
    console.log("Adding search query:", query);
    const trimmed = query.trim();
    if (!trimmed) return;

    // FIXED: Using a functional state callback guarantee updates happen sequentially
    setSearchHistory((prevHistory) => {
      const updated = [
        trimmed,
        ...prevHistory.filter((item) => item !== trimmed),
      ].slice(0, 10);

      // Save the freshly updated list to storage immediately
      AsyncStorage.setItem("searchHistory", JSON.stringify(updated)).catch(
        (err) => console.error("Failed to save history", err),
      );

      return updated;
    });
  }

  async function clearHistory() {
    setSearchHistory([]);
    await AsyncStorage.removeItem("searchHistory");
  }
  return (
    <SearchContext.Provider value={{ searchHistory, addSearch, clearHistory }}>
      {children}
    </SearchContext.Provider>
  );
}
