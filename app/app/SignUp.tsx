/* React Native */
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native'

/* Hooks */
import { useState } from "react";

/* Components */
import Button from '@/components/core/Button';
import Input from '@/components/core/Input';

/* Expo */
import { Link } from 'expo-router';

/* Axios */
import axiosInstance from '@/config/axiosConfig';

/* Context */
import { useTheme } from '@/context/ThemeContext';

function SignUp() {
    return (
        <View>
            <Text>Sign Up Screen </Text>
        </View>
    )
}

export default SignUp