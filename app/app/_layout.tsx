/* Styles */
import "../global.css";

/* Expo */
import { Stack } from "expo-router";

/* Context */
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
	return (
		<ThemeProvider>
			<Stack />
		</ThemeProvider>
	);
}
