import { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { useSession } from "@/context/AuthContext";
import Button from "@/components/core/Button";
import axiosInstance from "@/config/axiosConfig";

export default function Home() {
  const { user, signOut, session, updateUser } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isEmailVerified =
    (user?.email_verified_at &&
      user.email_verified_at !== "null" &&
      user.email_verified_at.length > 0) ||
    (user?.email_validated_at &&
      user.email_validated_at !== "null" &&
      user.email_validated_at.length > 0);

  // Function to refresh user data from the server
  const refreshUserData = async () => {
        if (!session) return;

        setIsRefreshing(true);
            try {
            const response = await axiosInstance.get("api/user", {
                headers: {
                Authorization: `Bearer ${session}`,
                },
            });

        // Update the user in context with fresh data
        await updateUser(response.data);
            } catch (error) {
                console.error("Error refreshing user data:", error);
            } finally {
                setIsRefreshing(false);
        }
    };

    useEffect(() => {
        refreshUserData();
    }, []);

    useEffect(() => {
        if (user && !isEmailVerified) {
            Alert.alert(
                "Email Verification Required",
                "Please check your email to verify your account. You may need to check your spam folder.",
                [
                    {
                        text: "OK",
                        style: "default",
                    },
                ]
            );
        }
    }, [user, isEmailVerified]);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      `Are you sure you want to sign out, ${user?.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => signOut(),
          style: "destructive",
        },
      ]
    );
  };

  return (
        <ScrollView className="p-4">
            <Text className="text-white mt-5 text-center text-2xl">
                Welcome {user?.name}
            </Text>

            {isRefreshing ? (
                <Text className="text-gray-400 text-center mt-2">
                Refreshing user data...
                </Text>
            ) : (
                user &&
                !isEmailVerified && (
                <View className="bg-yellow-600/20 p-3 mt-4 rounded-lg">
                    <Text className="text-yellow-400 text-center">
                    Your email is not verified. Please check your inbox to verify your
                    account.
                    </Text>
                    <Button
                    title="Refresh Status"
                    onPress={refreshUserData}
                    variant="secondary"
                    className="mt-2"
                    >
                    <Text className="text-white">Refresh Status</Text>
                    </Button>
                </View>
                )
            )}

            <Button
                title="Sign Out"
                onPress={handleSignOut}
                variant="danger"
                className="rounded-2xl shadow-lg mt-6"
            >
                <Text className="text-white text-lg font-semibold">Sign Out</Text>
            </Button>
        </ScrollView>
  );
}
