import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useSaved } from "../context/SavedContext";
import { Ionicons } from "@expo/vector-icons";

export default function SavedScreen() {
  const { savedItems, removeItem } = useSaved();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleSaveToGallery = async (uri: string) => {
    if (!hasPermission) {
      Alert.alert("Permission required", "Need gallery access to save photos.");
      return;
    }
    try {
      await MediaLibrary.createAssetAsync(uri);
      Alert.alert("Saved", "Photo saved to device gallery.");
    } catch {
      Alert.alert("Error", "Could not save photo.");
    }
  };

  const handleDelete = (index: number) => {
    removeItem(index);
  };

  return (
    <FlatList
      data={savedItems}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <Text style={styles.caption}>{item.caption || "No caption"}</Text>
          <View style={styles.actions}>
            <Pressable
              onPress={() => handleSaveToGallery(item.uri)}
              style={styles.actionBtn}
            >
              <Ionicons name="download-outline" size={24} color="#667eea" />
            </Pressable>
            <Pressable
              onPress={() => handleDelete(index)}
              style={styles.actionBtn}
            >
              <Ionicons name="trash-outline" size={24} color="#e74c3c" />
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: { width: "100%", height: 200 },
  caption: { padding: 12, fontSize: 16, textAlign: "center", color: "#333" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  actionBtn: { padding: 8 },
});
