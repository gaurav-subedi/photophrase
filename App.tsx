import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SavedProvider } from "./context/SavedContext";
import { RootStackParamList } from "./types";
import HomeScreen from "./screens/HomeScreen";
import PreviewScreen from "./screens/PreviewScreen";
import SavedScreen from "./screens/SavedScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SavedProvider>
      <SafeAreaView style={styles.wrapper}>
        <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Preview" component={PreviewScreen} />
              <Stack.Screen name="Saved" component={SavedScreen} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SavedProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
