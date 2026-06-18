import React from "react";
import { UserContext } from "../contexts/UserContext";

export default function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
