import { useRef, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import OfferCard from "./OfferCard";

export default function OfferList({ img }) {
  const { width } = useWindowDimensions();
  const itemWidth = width - 32;
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (itemWidth + 16));
    setActiveIndex(index);
  };

  return (
    <>
      <FlatList
        ref={listRef}
        data={img}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        snapToInterval={itemWidth + 16}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: itemWidth,
              height: 200,
              marginRight: 16,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <OfferCard img={item} />
          </View>
        )}
      />
      <View style={styles.dotsRow}>
        {img.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    width: 20,
    backgroundColor: "#3EC8B1",
  },
  dotInactive: {
    width: 8,
    backgroundColor: "#D1D5DB",
  },
});
