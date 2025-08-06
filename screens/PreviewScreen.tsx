// File: screens/PreviewScreen.tsx

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSaved } from "../context/SavedContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Constants from "expo-constants";

const API_URL = "http://192.168.1.170:5000/caption";
type Props = NativeStackScreenProps<RootStackParamList, "Preview">;

export default function PreviewScreen({ route, navigation }: Props) {
  const { uri } = route.params;
  const { addItem } = useSaved();
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateCaption = async () => {
    setLoading(true);
    try {
      // Build multipart/form-data body
      const form = new FormData();
      form.append("file", {
        uri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);

      // Fire off to your Flask API
      const res = await fetch(API_URL, {
        method: "POST",
        body: form,
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("Server error:", res.status, json);
        throw new Error(json.error || `Status ${res.status}`);
      }

      setCaption(json.caption);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message || "Unable to generate caption.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    addItem({ uri, caption });
    navigation.navigate("Saved");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Enter caption here..."
        placeholderTextColor="#666"
        value={caption}
        onChangeText={setCaption}
        multiline
      />

      <View style={styles.buttonRow}>
        <Pressable
          onPress={generateCaption}
          disabled={loading}
          style={({ pressed }) => [
            styles.buttonOuter,
            pressed && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.buttonInner}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="#fff"
                />
                <Text style={styles.buttonLabel}>
                  {caption ? "Generate Again" : "Generate Caption"}
                </Text>
              </>
            )}
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.buttonOuter,
            pressed && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.buttonInner}
          >
            <Ionicons name="save-outline" size={24} color="#fff" />
            <Text style={styles.buttonLabel}>Save</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    minHeight: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonOuter: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.8,
  },
  buttonInner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonLabel: {
    marginTop: 6,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
