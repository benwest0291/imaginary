/* React Native */
import {
  View,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

/* Hooks */
import { useState } from "react";

/* Components */
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";

/* Expo */
import { Link, router } from "expo-router";

/* Axios */
import { isAxiosError } from "axios";
import axiosInstance from "@/config/axiosConfig";

/* Context */
import { useSession } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

function SignIn() {
  const { signIn } = useSession();
  const { currentTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrors({
      email: "",
      password: "",
    });

    try {
      const response = await axiosInstance.post("/api/login", data);
      await signIn(response.data.token, response.data.user);
      router.replace("/");

    } catch (error) {
      if (isAxiosError(error)) {
        const responseData = error.response?.data;

        if (responseData?.errors) {
          setErrors(responseData.errors);

        } else if (responseData?.message) {
          Alert.alert("Error", responseData.message);

        } else {
          Alert.alert("Error", "An unexpected error occurred.");

        }
      } else {
        Alert.alert("Error", "An unexpected error occurred.");

      }
    } finally {
      setLoading(false);
	  
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${
        currentTheme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center p-5">
          <View className="items-center mb-8">
            <Image
              source={require("../assets/images/welcome.png")}
              className="w-36 h-36"
              resizeMode="contain"
            />

            <Text
              className={`text-2xl font-bold mt-8 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Imageinary
            </Text>
          </View>

          <Text
            className={`text-2xl font-bold mb-4 ${
              currentTheme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Sign In
          </Text>

          <Input
            value={data.email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(value) => handleChange("email", value)}
            error={errors.email}
          />

          <Input
            value={data.password}
            placeholder="Password"
            secureTextEntry
            onChangeText={(value) => handleChange("password", value)}
            error={errors.password}
          />

          <Button
            title="Sign In"
            className="w-full bg-emerald-500 mb-4 rounded-xl"
            onPress={handleLogin}
            disabled={loading}
            loading={loading}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-center">Sign In</Text>
            </View>
          </Button>

          <Text
            className={`text-lg mt-5 ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don&apos;t have an account?{" "}
            <Link href="/SignUp" className="text-emerald-500 font-bold">
              Sign Up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
