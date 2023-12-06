"use client";

import { supabase } from "@/config/supabase.config";
import { UserProfile } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    userProfile: UserProfile | null,
    userLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
    userProfile: null,
    userLoading: true
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {

        const channels = supabase.channel('custom-update-channel')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'profiles' },
                (payload) => {
                    setUserProfile(payload.new as UserProfile);
                }
            )
            .subscribe()


        const getUserProfile = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error(error);
                setUserLoading(false);
                return;
            }

            const { data, error: errorProfile } = await supabase.from("profiles").select("*").eq("user_uid", user?.id).single();

            if (errorProfile) {
                console.error(errorProfile);
                setUserLoading(false);
                return;
            }

            setUserProfile(data);
            setUserLoading(false);
        }

        getUserProfile();

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                getUserProfile();
            }
        })

    }, []);

    return (
        <AuthContext.Provider value={{
            userProfile,
            userLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    return useContext(AuthContext);
}