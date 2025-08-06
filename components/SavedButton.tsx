import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type SavedButtonProps = {
  onPress: () => void;
};

export function SavedButton({ onPress }: SavedButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outer, pressed && styles.pressed]}
      android_ripple={{ color: "rgba(255,255,255,0.3)" }}
    >
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.inner}
      >
        <Ionicons name="bookmark-outline" size={28} color="#fff" />
        <Text style={styles.label}>Saved</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    margin: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  inner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  label: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
