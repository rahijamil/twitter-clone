"use client";

import { supabase } from "@/config/supabase.config";
import { createContext, useContext, useEffect, useState } from "react";

type UserProfile = {
    id?: number,
    user_uid: string;
    email: string,
    username: string
    avatar_url: string;
    cover_url: string;
    first_name: string;
    last_name: string;
    bio: string;
    created_at: string;
}

const AuthContext = createContext<UserProfile | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const getUserProfile = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            const userData: UserProfile = {
                user_uid: user?.id as string,
                email: user?.email as string,
                avatar_url: '',
                cover_url: '',
                first_name: '',
                last_name: '',
                bio: '',
                username: user?.email?.split('@')[0] as string,
                created_at: user?.created_at as string,
            }

            setUserProfile(userData);
        }

        getUserProfile();
    }, []);

    return (
        <AuthContext.Provider value={userProfile}>{children}</AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    return useContext(AuthContext);
}