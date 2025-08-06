// context/SavedContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of a saved item (photo URI + caption)
export type SavedItem = {
  uri: string;
  caption: string;
};

// Context type: list of saved items + functions to add/remove
type SavedContextType = {
  savedItems: SavedItem[];
  addItem: (item: SavedItem) => void;
  removeItem: (index: number) => void;
};

const STORAGE_KEY = "SAVED_ITEMS";

// Create the context
const SavedContext = createContext<SavedContextType | undefined>(undefined);

// Provider component to wrap the app and manage saved state
export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // 1) Load from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) {
          setSavedItems(JSON.parse(json));
        }
      })
      .catch(console.error);
  }, []);

  // 2) Persist to AsyncStorage whenever savedItems changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems)).catch(
      console.error
    );
  }, [savedItems]);

  const addItem = (item: SavedItem) => {
    setSavedItems((prev) => [...prev, item]);
  };

  const removeItem = (index: number) => {
    setSavedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SavedContext.Provider value={{ savedItems, addItem, removeItem }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = (): SavedContextType => {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
};
