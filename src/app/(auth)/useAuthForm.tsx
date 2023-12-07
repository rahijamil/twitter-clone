"use client";

import { supabase } from '@/config/supabase.config';
import React, { useState } from 'react'

type LoginData = {
    email: string;
    password: string;
}

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export default function useAuthForm() {
    const [authStatus, setAuthStatus] = useState<"login" | "signup">("signup");

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [ev.target.id]: ev.target.value });
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError("")

        if (loginData.email.trim() === '' || loginData.password.trim() === '') {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            if (!validateEmail(loginData.email)) {
                setError('Invalid email');
                setLoading(false);
                return;
            }

            if (loginData.password.trim().length < 6) {
                setError('Password must be at least 6 characters');
                setLoading(false);
                return;
            }

            if (authStatus == "login") {
                const { data: { user }, error } = await supabase.auth.signInWithPassword({
                    email: loginData.email,
                    password: loginData.password
                });

                if (error) {
                    console.error({ loginError: error.message })
                    setError(error.message);
                    setLoading(false);
                    return;
                }
            }
            else {
                const { data, error } = await supabase.auth.signUp({
                    email: loginData.email,
                    password: loginData.password
                });

                if (error) {
                    setError(error.message);
                    setLoading(false);
                    return;
                }

                if (data.user) {
                    const newUser = {
                        user_uid: data.user.id,
                        email: data.user.email as string,
                        avatar_url: '',
                        cover_url: '',
                        name: '',
                        bio: '',
                        location: '',
                        website: '',
                        username: data.user.email?.split('@')[0] as string,
                    }

                    const { } = await supabase.from("profiles").insert(newUser);

                    alert("Check your email for the verification link");
                    setAuthStatus("login");

                    setLoginData({
                        ...loginData,
                        password: '',
                    })
                    setLoading(false);
                }
            }

        } catch (error: any) {
            setError(error.message);
            console.error(error);
        }
    }

    return {
        loginData,
        error,
        setError,
        loading,
        setLoading,
        handleChange,
        handleSubmit,
        setAuthStatus,
        authStatus
    }
}
