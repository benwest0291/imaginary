/* React Native */
import { View, Text, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

/* Hooks */
import { useState } from "react";

/* Components */
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";

/* Expo */
import { Link, router } from "expo-router"; 

/* Axios */
import axiosInstance from "@/config/axiosConfig";
import { isAxiosError } from "axios";

/* Context */
import { useTheme } from "@/context/ThemeContext";

function SignUp() {
	const { currentTheme } = useTheme();
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (name: string, value: string) => {
		setData({ ...data, [name]: value });
	};

	const handleSignup = async () => {
			setLoading(true);
			setErrors({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		});

		try {
		await axiosInstance.post("/api/register", data);

		resetForm();
			setSuccessMessage(
			"Account created successfully. Please check your email for verification."
		);

		router.replace("/(app)");

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

	const resetForm = () => {
		setData({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		});

		setErrors({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		});
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
				<View className="items-center justify-center mb-12 w-full">
					<Image
						source={require("../assets/images/welcome.png")}
						className="w-72 h-72"
						resizeMode="contain"
					/>

					<Text
						className={`text-3xl font-extrabold mt-6 tracking-wide ${
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
					Sign Up
				</Text>

				{!!successMessage && (
					<Text className="bg-green-500 text-white rounded-lg py-3 px-4 mb-4">
					{successMessage}
					</Text>
				)}
				
				<Input
					value={data.name}
					placeholder="Name"
					onChangeText={(value) => handleChange("name", value)}
					error={errors.name}
				/>
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
				<Input
					value={data.password_confirmation}
					placeholder="Confirm Password"
					secureTextEntry
					onChangeText={(value) =>
					handleChange("password_confirmation", value)
					}
					error={errors.password_confirmation}
				/>
				<Button
					title="Sign Up"
					className="w-full bg-emerald-500 mb-4 rounded-xl"
					onPress={handleSignup}
					disabled={loading}
					loading={loading}
				>
					<View className="flex-row items-center justify-center">
					<Text className="text-white text-center">Sign Up</Text>
					</View>
				</Button>
				<Text
					className={`text-lg mt-5 ${
					currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
					}`}
				>
					Already have an account?{" "}
					<Link href="/SignIn" className="text-emerald-500 font-bold">
					Sign In
					</Link>
				</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default SignUp;
