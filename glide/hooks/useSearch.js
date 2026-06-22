import React from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function useSearch() {
  const context = React.useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
