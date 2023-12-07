"use client";
import { Tweet } from '@/lib/types';
import React, { useState } from 'react';

interface PollProps {
    poll: Tweet['poll'];
    setTweetData: React.Dispatch<React.SetStateAction<Tweet>>;
}

export default function Poll({ poll, setTweetData }: PollProps) {

    const handleCreateOption = () => {
        setTweetData((prevData) => ({
            ...prevData,
            poll: {
                ...prevData.poll,
                options: [...prevData.poll?.options!, {
                    id: Date.now().toString(),
                    text: '',
                }],
            } as Tweet['poll'],
        }))
    }

    const handleOptionChange = (id: string, value: string) => {
        setTweetData((prevData) => ({
            ...prevData,
            poll: {
                ...prevData.poll,
                options: prevData.poll?.options.map((option, i) =>
                    option.id == id ? { ...option, text: value } : option
                ),
            } as Tweet['poll'],
        }));
    };

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className='flex gap-1 p-3'>
                <div className='space-y-3 flex-1'>
                    {
                        poll?.options.map((option, index) => (
                            <div key={option.id}>
                                <input
                                    type="text"
                                    placeholder={`Choice ${index + 1}`}
                                    className='border border-gray-200 rounded-lg px-4 py-2 w-full'
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                    autoFocus={poll.options.length > 2 ? true : index == 0}
                                />
                            </div>
                        ))
                    }
                </div>

                <div className='flex items-end justify-center pb-1'>
                    <div className='w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-pointer transition hover:bg-[rgb(29_161_242_/_0.125)] text-primary' onClick={handleCreateOption}>
                        <div className='w-5 h-5'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"></path></g></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button onClick={() => setTweetData((prevData) => ({ ...prevData, poll: null }))} className='text-red-500 font-base py-3 text-center hover:bg-red-100 transition w-full'>
                    Remove poll
                </button>
            </div>
        </div>
    );
}
