import { View, Text } from "react-native";
import { useSession } from "@/context/AuthContext";

export default function Home() {
  const { user, signOut } = useSession();

  return (
    <View>
      <Text className="text-white mt-5 text-center text-2xl">
        Welcome {user?.name}
      </Text>

      <Text
        onPress={() => signOut()}
        className="text-white mt-2 text-center text-lg underline"
      >
        Log Out
      </Text>
    </View>
  );
}
