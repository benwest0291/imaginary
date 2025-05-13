
import { View, Text, Alert } from "react-native";
import { useSession } from "@/context/AuthContext";
import Button from "@/components/core/Button";

export default function Home() {
  const { user, signOut } = useSession();

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
    <View>
      <Text className="text-white mt-5 text-center text-2xl">
        Welcome {user?.name}
      </Text>

      <Button
        title="Sign Out"
        onPress={handleSignOut}
        variant="danger"
        className="rounded-2xl shadow-lg mt-6"
      >
        <Text className="text-white text-lg font-semibold">
          Sign Out
        </Text>
      </Button>
    </View>
  );
}