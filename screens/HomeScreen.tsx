import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { CameraButton } from "../components/CameraButton";
import { SavedButton } from "../components/SavedButton";
import { GalleryButton } from "../components/GalleryButton";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      {/* Transparent status bar to let gradient bleed under */}
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* SafeAreaView only insets left/right/bottom; gradient covers top */}
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <Text style={styles.title}>Photo Journal</Text>
        <View style={styles.buttonRow}>
          <CameraButton
            onImagePicked={(uri) => navigation.navigate("Preview", { uri })}
          />
          <SavedButton onPress={() => navigation.navigate("Saved")} />
          <GalleryButton
            onImagePicked={(uri) => navigation.navigate("Preview", { uri })}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
