/* React Native */
import { ActivityIndicator, Text, View } from "react-native";

/* Context & Constants */
import { useSession } from "@/context/AuthContext";
import { useThemeColors } from "@/hooks/useThemeColors";

/* Expo */
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colors = useThemeColors();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-2 text-gray-800 dark:text-white">Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/SignIn" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}
