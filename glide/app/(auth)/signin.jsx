import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputField from "../../components/TextInputField";
import { colors } from "../../constants/theme";
import useUser from "../../hooks/useUser";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, login, register } = useUser();
  const inset = useSafeAreaInsets();

  async function handleSignIn(email, password) {
    // Handle sign in logic here
    try {
      await login(email, password);
      router.replace("/home");
    } catch (error) {
      console.log("Error during sign in:", error);
    }
  }
  async function handleSignUp(name, email, password, address, phone) {
    try {
      await register(name, email, password, address, phone);
      router.push("/home");
    } catch (error) {
      console.log("Error during sign up:", error);
    }
  }

  function tabSignIn(activeTab) {
    if (activeTab === "signin") {
      return (
        <View>
          {/* Email field */}
          <TextInputField
            label="Email"
            icon="mail-outline"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password field */}
          <TextInputField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            isPasswordField={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </View>
      );
    } else if (activeTab === "signup") {
      return (
        <View>
          {/* Name field */}
          <TextInputField
            label="Name"
            icon="person-outline"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            keyboardType="email-address"
          />
          {/* Email field */}
          <TextInputField
            label="Email"
            icon="mail-outline"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password field */}
          <TextInputField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            isPasswordField={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          {/* address field */}
          <TextInputField
            label="Address"
            icon="location-outline"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInputField
            label="Phone Number"
            icon="call-outline"
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
        </View>
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/login illustration.png")}
            style={[styles.header, { paddingTop: inset.top }]}
          >
            <Text style={styles.brandName}>Glide</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue ordering your{"\n"}favorite meals.
            </Text>
          </ImageBackground>

          {/* Main content */}
          <View style={styles.content}>
            {/* Tabs */}
            <View style={styles.tabsContainer}>
              <Pressable
                style={[styles.tab, activeTab === "signin" && styles.activeTab]}
                onPress={() => setActiveTab("signin")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "signin" && styles.activeTabText,
                  ]}
                >
                  Log In
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === "signup" && styles.activeTab]}
                onPress={() => setActiveTab("signup")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "signup" && styles.activeTabText,
                  ]}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>

            {/* Form */}

            {tabSignIn(activeTab)}
            <TouchableOpacity
              onPress={() => {
                if (activeTab === "signin") {
                  handleSignIn(email, password);
                } else {
                  handleSignUp(name, email, password, address, phone);
                }
              }}
              style={styles.signInButton}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                {activeTab === "signin"
                  ? "Press to Log In"
                  : "Press to Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    // flex: 1,
    paddingBottom: 36,
    backgroundColor: "#ffffff",
  },
  header: {
    height: 300,
    paddingHorizontal: 24,
    paddingBottom: 36,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    opacity: 0.9,
    textAlign: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 46,
    marginBottom: 12,
    letterSpacing: -0.8,
    textAlign: "center",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#ffffff",
    marginTop: -30,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 0,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#000000",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  activeTabText: {
    color: "#000000",
  },
  signInButton: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: colors.light.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 32,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
});
