/* React Native */
import { Appearance, useColorScheme } from "react-native";

/* Hooks */
import { useStorageState } from "@/hooks/useStorageState";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  currentTheme: "light" | "dark";
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  currentTheme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const syestemColorTheme = useColorScheme() as "light" | "dark";
  const [[, storedTheme], setStoredTheme] = useStorageState("theme");
  const [theme, setThemeState] = useState<ThemeType>("system");
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // Init theme from storage or default to system
  useEffect(() => {
    if (storedTheme) {
      setThemeState(storedTheme as ThemeType);
    } else {
      setThemeState("system");
    }
  }, [storedTheme]);

  // Set current theme based on system or stored theme
  useEffect(() => {
    if (theme === "system") {
      setCurrentTheme(syestemColorTheme || "dark");
    } else {
      setCurrentTheme(theme as "light" | "dark");
    }
  }, [theme, syestemColorTheme]);

  // Listen for theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === "system") {
        setCurrentTheme((colorScheme as "light" | "dark") || "dark");
      }
    });

    return () => {
      subscription.remove();
    };
  }, [theme]);

  // Set theme in storage when it changes
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
