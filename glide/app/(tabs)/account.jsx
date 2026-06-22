import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputField from "../../components/TextInputField";
import useUser from "../../hooks/useUser";

export default function AccountScreen() {
  const inset = useSafeAreaInsets();

  const { user, updateUser, logOut } = useUser();
  console.log(user);

  function editProfile() {
    if (isEditing) {
      updateUser(
        formData.name,
        formData.email,
        formData.phone_number,
        formData.address,
      );

      ToastAndroid.show("Profile updated successfully", ToastAndroid.SHORT);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone_number: user?.user?.phone_number || "",
    address: user?.user?.address || "",
  });

  return (
    <ScrollView
      style={[styles.container, { paddingTop: inset.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>

        <TouchableOpacity style={styles.editButton} onPress={editProfile}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.editText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.user?.name[0]}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <TextInputField
            label="Name"
            value={formData.name}
            placeholder="Name"
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            editable={isEditing}
            style={[
              !isEditing && {
                borderWidth: 0,
                backgroundColor: "transparent",
                paddingHorizontal: 0,
              },
              { marginBottom: 0 },
            ]}
          />
        </View>
      </View>

      {/* Info */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.card}>
        <InfoRow
          icon="call-outline"
          title="Phone"
          value={user?.user?.phone_number}
          textField="phone_number"
          formData={formData}
          isEditing={isEditing}
          setFormData={setFormData}
        />

        <InfoRow
          icon="location-outline"
          title="Address"
          value={user?.user?.address}
          textField="address"
          formData={formData}
          isEditing={isEditing}
          setFormData={setFormData}
        />

        <InfoRow
          icon="mail-outline"
          title="Email"
          value={user?.user?.email}
          textField="email"
          formData={formData}
          isEditing={isEditing}
          setFormData={setFormData}
        />
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          logOut();
          ToastAndroid.show(
            "Account logged out successfully",
            ToastAndroid.SHORT,
          );
        }}
      >
        <Ionicons name="log-out-outline" size={22} color="#fff" />

        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  title,
  value,
  textField,
  formData,
  isEditing,
  setFormData,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color="#3EC8B1" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{title}</Text>

        <TextInputField
          value={formData[textField]}
          onChangeText={(text) =>
            setFormData({ ...formData, [textField]: text })
          }
          editable={isEditing}
          style={[
            !isEditing && {
              borderWidth: 0,
              backgroundColor: "transparent",
              paddingHorizontal: 0,
            },
            { marginBottom: 0 },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  editButton: {
    backgroundColor: "#3EC8B1",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
  },

  editText: {
    color: "#fff",
    fontWeight: "600",
  },

  profileCard: {
    marginTop: 25,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#ff6b00",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  email: {
    color: "#777",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 15,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#3ec8b150",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    color: "#888",
    fontSize: 14,
    marginBottom: 3,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 3,
  },

  logout: {
    marginTop: 30,
    backgroundColor: "#e53935",
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
