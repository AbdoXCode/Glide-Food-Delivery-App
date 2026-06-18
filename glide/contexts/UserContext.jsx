import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/api";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    try {
      const data = await loginUser(email, password);
      setUser(data);
      setLoading(false);
      await AsyncStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error logging in(from context):", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async function register(name, email, password, address, phone) {
    try {
      const data = await registerUser(name, email, password, address, phone);
      setUser(data);
      setLoading(false);
      await AsyncStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error registering(from context):", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Error loading user from AsyncStorage:", error);
      setLoading(false);
    }
  }
  console.log("UserContext user:", user);
  return (
    <UserContext.Provider value={{ user, loading, login, register }}>
      {children}
    </UserContext.Provider>
  );
}
