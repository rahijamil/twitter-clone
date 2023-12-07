"use client";
import { PollOption, Tweet } from '@/lib/types';
import React, { useState } from 'react';

interface PollProps {
    poll: Tweet['poll'];
}

export default function ShowPoll({ poll }: PollProps) {
    const [selectedOption, setSelectedOption] = useState<PollOption>({
        id: '',
        text: '',
    });

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
                                    className={`border border-gray-200 rounded-lg px-4 py-2 w-full text-center transition cursor-pointer ${option.id == selectedOption.id ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}
                                    value={option.text}
                                    onClick={() => setSelectedOption(option)}
                                    readOnly
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
