import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrderItemsList from "../../components/OrderItemsList";
import { colors } from "../../constants/theme";
import useOrders from "../../hooks/useOrders";

export default function OrderDetails() {
  const { id } = useLocalSearchParams();

  const inset = useSafeAreaInsets();
  const { orders, orderDetailsList, fetchOrderDetails } = useOrders();

  const order = orders.find((o) => String(o.id) === String(id));

  function formatOrderDate(dateValue) {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    const datePart = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const timePart = date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" AM", "am")
      .replace(" PM", "pm");

    return `${datePart}  ${timePart}`;
  }

  const displayDate = formatOrderDate(order?.created_at);

  useEffect(() => {
    fetchOrderDetails(id);
  }, []);

  return (
    <View
      style={[styles.container, { paddingTop: inset.top + 16 }]}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={20} color="#0F172A" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Order #{order?.id ?? id}</Text>
      <Text style={styles.subtitle}>
        {order?.restaurant_name ?? "Order details"}
      </Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{order?.status ?? "Completed"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>
            EGP {Number(order?.total_price ?? 0).toFixed(2)}
          </Text>
        </View>

        {order?.created_at ? (
          <View style={[styles.row]}>
            <Text style={styles.label}>Placed</Text>
            <Text style={styles.value}>{displayDate}</Text>
          </View>
        ) : null}
        <View style={[styles.row]}>
          <Text style={styles.label}>Delivery Fee</Text>
          <Text style={styles.value}>
            EGP {Number(order?.delivery_fee ?? 0).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.row]}>
          <Text style={styles.label}>Service Fee</Text>
          <Text style={styles.value}>EGP {Number(5).toFixed(2)}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>
            EGP{" "}
            {Number(order?.total_price - order?.delivery_fee - 5).toFixed(2)}
          </Text>
        </View>
      </View>

      {OrderDetails ? (
        <OrderItemsList orderDetailsList={orderDetailsList} />
      ) : (
        <View style={styles.card}>
          <Text style={styles.detailsText}>Order details are unavailable.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  content: {
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  backButtonText: {
    marginLeft: 4,
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    color: "#64748B",
    fontSize: 14,
  },
  value: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F8F4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  statusText: {
    color: colors.light.primaryColor,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  detailsText: {
    marginTop: 4,
    color: "#334155",
    fontSize: 15,
    lineHeight: 22,
  },
});
