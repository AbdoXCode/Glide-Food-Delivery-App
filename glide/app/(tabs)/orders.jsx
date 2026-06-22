import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/theme";
import useOrders from "../../hooks/useOrders";
import useUser from "../../hooks/useUser";

export default function Orders() {
  const inset = useSafeAreaInsets();
  const { orders, loading, fetchOrders } = useOrders();
  const { user } = useUser();

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

    return `${datePart} · ${timePart}`;
  }

  useFocusEffect(
    useCallback(() => {
      if (user.user?.id) {
        fetchOrders(user.user.id);
      }
    }, [user]),
  );

  if (loading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator size="large" color={colors.light.primaryColor} />
      </View>
    );
  }

  const hasOrders = orders.length > 0;

  if (!hasOrders) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptySubtitle}>
          Your completed and pending orders will appear here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item, index) => String(item.displayId ?? index)}
      contentContainerStyle={[
        styles.listContent,
        { paddingTop: inset.top + 16 },
      ]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>
            Track your recent purchases and past deliveries.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.orderCard}>
          <View style={styles.orderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderLabel}>Order #{item.id}</Text>
              <Text style={styles.orderRestaurant}>
                {item.restaurant_name ?? "Loading Restaurant..."}
              </Text>
            </View>

            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Total</Text>
            <Text style={styles.metaValue}>
              EGP {Number(item.total_price ?? 0).toFixed(2)}
            </Text>
          </View>

          {item.created_at ? (
            <Text style={styles.orderDate}>
              {formatOrderDate(item.created_at)}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              router.push({
                pathname: `/orders/${item.id}`,
                params: {
                  order: JSON.stringify(item),
                },
              })
            }
          >
            <Text style={styles.viewButtonText}>View Order</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 16,
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
    lineHeight: 21,
  },
  centeredState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8FAFC",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: "#64748B",
    textAlign: "center",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  orderLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  orderRestaurant: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F8F4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    color: colors.light.primaryColor,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  metaLabel: {
    color: "#64748B",
    fontSize: 14,
  },
  metaValue: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
  orderDate: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 12,
  },
  viewButton: {
    marginTop: 14,
    backgroundColor: colors.light.primaryColor,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
