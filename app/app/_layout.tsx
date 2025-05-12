/* Styles */
import "../global.css";

/* Expo */
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

/* Context */
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { SessionProvider, useSession } from "@/context/AuthContext";

function Header() {
  const { currentTheme } = useTheme();
  const { session, isLoading } = useSession();

  if (session && !isLoading) {
    return (
      <>
        <StatusBar
          style={currentTheme === "dark" ? "light" : "dark"}
          backgroundColor={currentTheme === "dark" ? "#111827" : "#ffffff"}
        />
        <Redirect href="/(app)" />
      </>
    );
  }

  return (
    <StatusBar
      style={currentTheme === "dark" ? "light" : "dark"}
      backgroundColor={currentTheme === "dark" ? "#111827" : "#ffffff"}
    />
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Header />
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
