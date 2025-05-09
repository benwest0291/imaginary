import {
  createContext,
  useEffect,
  useContext,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "../hooks/useStorageState"; // Fixed import
import { router } from "expo-router";
import axiosInstance from "@/config/axiosConfig";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  email_validated_at: string | null;
  credits: number | null;
}

interface AuthContextType {
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  session?: string | null;
  user?: User | null;
  isLoading: boolean;
  updateUser: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  user: null,
  isLoading: false,
  updateUser: async () => {},
});

export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production" && !value) {
    throw new Error("useSession must be used within a AuthProvider");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[, user], setUser] = useStorageState("user");

  // function to load user info
  const loadUserInfo = async (token: string) => {
    try {
      const response = await axiosInstance.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(JSON.stringify(response.data));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Unauthorized, please sign in again");
        setSession(null);
        setUser(null);
        router.replace("/SignIn");
      } else {
        console.error("Error loading user info:", error);
      }
    }
  };

  // sign out function
  const handleSignOut = async () => {
    try {
      if (session) {
        await axiosInstance.post("api/logout", null, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        });

        setSession(null);
        setUser(null);
        router.replace("/SignIn");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    if (session) {
      loadUserInfo(session);
    }
  }, [session]);

  // parsed user data if available
  const parsedUser = user
    ? (() => {
        try {
          return JSON.parse(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          return null;
        }
      })()
    : null;

  // function to update the user data with proper JSON stringification
  const handleUserUpdate = async (userData: any) => {
    try {
      const userString = JSON.stringify(userData);
      await setUser(userString);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // sign user in
  const handleSignIn = async (token: string, userData: User) => {
    try {
      await setSession(token);
      await setUser(JSON.stringify(userData));
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        session,
        user: parsedUser,
        isLoading,
        updateUser: handleUserUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
