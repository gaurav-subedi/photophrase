import React from "react";
import { Pressable, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type GalleryButtonProps = {
  onImagePicked: (uri: string) => void;
};

export function GalleryButton({ onImagePicked }: GalleryButtonProps) {
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Gallery access is needed to pick photos."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });
    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={openGallery}
      style={({ pressed }) => [styles.outer, pressed && styles.pressed]}
      android_ripple={{ color: "rgba(255,255,255,0.3)" }}
    >
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.inner}
      >
        <Ionicons name="images-outline" size={28} color="#fff" />
        <Text style={styles.label}>Gallery</Text>
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
