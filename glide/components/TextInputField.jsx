import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function TextInputField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  isPasswordField = false,
  showPassword = false,
  onTogglePassword,
  keyboardType = "default",
  style,
}) {
  return (
    <View style={styles.fieldGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, style]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#9CA3AF"
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {isPasswordField && (
          <Pressable onPress={onTogglePassword} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#9CA3AF"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: "#F9FAFB",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
  },
  eyeIcon: {
    padding: 8,
  },
});
