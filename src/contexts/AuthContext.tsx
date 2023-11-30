"use client";

import { supabase } from "@/config/supabase.config";
import { createContext, useContext, useEffect, useState } from "react";

export type UserProfile = {
    id?: number,
    user_uid: string;
    email: string,
    username: string
    avatar_url: string;
    cover_url: string;
    name: string;
    bio: string;
    location: string;
    website: string;
    created_at: string;
}

const AuthContext = createContext<UserProfile | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const getUserProfile = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if(error) {
                console.error(error);
                return;
            }

            const { data, error: errorProfile } = await supabase.from("profiles").select("*").eq("user_uid", user?.id).single();

            if(errorProfile) {
                console.error(errorProfile);
                return;
            }

            setUserProfile(data);
        }

        getUserProfile();

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                getUserProfile();
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={userProfile}>{children}</AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    return useContext(AuthContext);
}