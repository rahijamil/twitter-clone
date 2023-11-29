"use client";

import { supabase } from '@/config/supabase.config';
import Link from 'next/link';
import React, { useState } from 'react';

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

export default function LoginPage() {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [ev.target.id]: ev.target.value });
    }

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (loginData.email.trim() === '' || loginData.password.trim() === '') {
            return;
        }

        try {

            if (!validateEmail(loginData.email)) {
                setError('Invalid email');
                return;
            }

            if (loginData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            setLoading(true);
            setError("")

            const {data: {user}, error} = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password
            });

            if(error) {
                setError(error.message);
                return;
            }

        } catch (error: any) {
            setError(error.message);

            console.error(error);
        }
        finally {
            setLoading(false);
            setError("");
        }
    }

    return (
        <div className='flex min-h-screen justify-center items-center bg-gray-100'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded shadow-md w-11/12 max-w-md'>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={loginData.email}
                        onChange={handleChange}
                        className='w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        value={loginData.password}
                        onChange={handleChange}
                        className='w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>
                <div className='flex items-center justify-between mb-4'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        disabled={loading}
                    >
                        {
                            loading ? "Loading..." : "Log in"
                        }
                    </button>
                </div>

                <div className='text-center'>
                    <Link
                        className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                        href='/register'
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}
