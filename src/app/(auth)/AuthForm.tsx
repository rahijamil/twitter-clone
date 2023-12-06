"use client";

import { Button } from '@/components';
import React, { useEffect } from 'react';
import useAuthForm from './useAuthForm';

export default function AuthForm() {
    const {
        loginData,
        handleChange,
        handleSubmit,
        error,
        setError,
        loading,
        setLoading,
        setAuthStatus,
        authStatus
    } = useAuthForm();

    return (
        <div className='min-h-screen grid grid-cols-2 place-items-center gap-8'>
            <div className='w-96 h-96'>
                <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>

            <div className='w-full space-y-12'>
                <div className='space-y-8'>
                    <h1 className='text-7xl font-extrabold'>Happening Now</h1>
                    <h2 className='text-3xl font-bold'>
                        {
                            authStatus == "signup" ? "Join today." : "Log in to X."
                        }
                    </h2>
                </div>
                <div className='bg-gray-100 rounded-md p-8 w-full max-w-md'>
                    <div
                        className='w-full mx-auto max-w-md'>
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
                            <Button
                                size='lg'
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {
                                    loading ? "Loading..." : authStatus == "login" ? "Log in" : "Sign Up"
                                }
                            </Button>
                        </div>

                        <div className='text-center'>
                            <p
                                className='inline-block align-baseline font-normal text-sm text-primary hover:underline transition cursor-pointer'
                                onClick={() => {
                                    setAuthStatus(authStatus == "login" ? "signup" : "login");
                                    setError("");
                                    setLoading(false);
                                }}
                            >
                                {
                                    authStatus == "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
