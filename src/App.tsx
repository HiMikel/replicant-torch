import React, { useState } from "react";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from "@expo-google-fonts/open-sans";
import IntroScreen from "./screens/IntroScreen";
import OrbitScreen from "./screens/OrbitScreen";

type Screen = "intro" | "orbit";

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");

  const [fontsLoaded] = useFonts({
    "Open Sans": OpenSans_400Regular,
    "Open Sans SemiBold": OpenSans_600SemiBold,
    "Open Sans Bold": OpenSans_700Bold,
  });

  if (!fontsLoaded) return null;

  if (screen === "intro") {
    return <IntroScreen onEnter={() => setScreen("orbit")} />;
  }

  return <OrbitScreen />;
}
