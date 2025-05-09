/* React Native */
import { Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";

/* Expo */
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

/* Context */
import { useThemeColors } from "../hooks/useThemeColors";
import { useTheme } from "@/context/ThemeContext";

type Feature = {
  icon: string;
  text: string;
  description: string;
};

const features: Feature[] = [
	{
		icon: "🎨",
		text: "Recolour Images",
		description: "Choose Arbitrary Colour",
	},
	{
		icon: "🖼️",
		text: "Restore Photos",
		description: "In Excellent Quality",
	},
	{
		icon: "⭐️",
		text: "Generative Fill",
		description: "Smart Expand",
	},
	{
		icon: "✂️",
		text: "Remove Objects",
		description: "Clean Removal",
	},
];

export default function WelcomeScreen() {
  const colors = useThemeColors();
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 ${
        currentTheme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <View className="items-center px-5 pt-10">
        <Image
          source={require("../assets/images/welcome.png")}
          className="w-[150px] h-[150px] mb-5"
          resizeMode="contain"
        />

        <Text
          className={`${
            currentTheme === "dark" ? "text-white" : "text-gray-900"
          } text-[28px] font-bold mb-3 text-center`}
        >
          Imaginary
        </Text>

        <Text
          className={`${
            currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
          } text-base text-center mb-10`}
        >
          Transform your images with the power of AI
        </Text>

        <View className="flex-row flex-wrap justify-between mb-[30px] px-[5px]">
          {features.map((feature, index) => (
            <View
              key={index}
              className={`${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-200"
              } w-[47%] rounded-2xl p-4 mb-4`}
            >
              <Text className="text-2xl mb-2">{feature.icon}</Text>
              <View className="w-full">
                <Text
                  className={`${
                    currentTheme === "dark" ? "text-white" : "text-gray-900"
                  } text-base font-bold mb-1`}
                >
                  {feature.text}
                </Text>

                <Text
                  className={`${
                    currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                  } text-sm`}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="w-full">
          <TouchableOpacity
            className="h-[54px] w-full rounded-xl border-[1.5px] justify-center items-center mb-4"
            style={{ borderColor: colors.primary }}
            onPress={() => router.push("/SignIn")}
          >
            <Text
              className="text-base font-bold"
              style={{ color: colors.primary }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <LinearGradient
            colors={["#4F46E5", "#7C3AED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 12,
              width: "100%",
              height: 54,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              className="h-[54px] w-full rounded-xl justify-center items-center"
              onPress={() => router.push("/SignUp")}
            >
              <Text className="text-base font-bold text-white">
                Create Account
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text
            className={`${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            } text-sm text-center mt-4`}
          >
            Start transforming your images today!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
