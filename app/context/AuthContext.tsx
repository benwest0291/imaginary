import { createContext, useContext, type PropsWithChildren } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    email_validated_at: string | null;
    credits: number | null;
}

interface AuthContextType {
    signIn:(token: string, user: User) => void;
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

export function useSession(){
    const value = useContext(AuthContext);
 
    if (process.env.NODE_ENV !== 'production' && !value) {
        throw new Error('useSession must be used within a AuthProvider');
    }
    return value;
}

const SessionProvider = ({children}: PropsWithChildren) => {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[, user], setUser] = useStorageState('user');

    // Sign in function
    const updateUser = async (userData: any) => {
       
    }

    const handleSignIn = async () => {

    }

    const loadUserInfo = async (token:string) => {

    }

    // pasrsed user data if available
    const parsedUser = user ? (()=>{
        
    }): null;

}

