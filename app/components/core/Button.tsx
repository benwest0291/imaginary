/* React Native */
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";

/* Expo */
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  onPress: () => void;
  children?: React.ReactNode;
}

function Button({ title, className, disabled, loading, variant = "primary", onPress, children }: ButtonProps) {

  function getVariantStyles() {
    switch (variant) {
        case "primary":
            return {
            gradient: ["#059669", "#047857"],
            textColor: "text-white",
            };

        case "secondary":
            return {
            gradient: ["#4b5563", "#374151"],
            textColor: "text-white",
            };

        case "danger":
            return {
            gradient: ["#EF4444", "#DC2626"],
            textColor: "text-white",
            };

        case "ghost":
            return {
            gradient: ["transparent", "transparent"],
            textColor: "text-gray-200",
            };

        default:
            return {
            gradient: ["#059669", "#047857"] as [string, string],
            textColor: "text-white",
            };
        }
    }

    // Get the gradient and text color based on the variant
    const { gradient, textColor } = getVariantStyles();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`overflow-hidden rounded-2xl ${disabled ? "opacity-50" : ""} ${
                className || ""
            }`}
            style={{
                elevation: 3,
            }}
        >
        <LinearGradient
                colors={
                (disabled ? ["#cccccc", "#aaaaaa"] : gradient) as [string, string]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-row items-center justify-center"
        >
            <View className="flex-row items-center justify-center py-3 px-4">
                {loading && (
                    <ActivityIndicator color="white" size="small" className="mr-2" />
                )}
                {children ? (
                    children
                ) : (
                    <Text className={`text-center font-semibold ${textColor}`}>
                        {title}
                    </Text>
                )}
            </View>
        </LinearGradient>
    </TouchableOpacity>
    );
}

export default Button;