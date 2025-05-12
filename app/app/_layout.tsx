/* Styles */
import "../global.css";

/* Expo */
import { Stack } from "expo-router";

/* Context */
import { ThemeProvider } from "../context/ThemeContext";
import { SessionProvider } from "@/context/AuthContext";

export default function RootLayout() {
	return (
    <SessionProvider>
      <ThemeProvider>
        <Stack />
      </ThemeProvider>
    </SessionProvider>
  );
}
