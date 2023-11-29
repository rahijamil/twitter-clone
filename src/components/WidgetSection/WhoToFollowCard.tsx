import React from 'react'
import { Avatar, Button } from '..'

export default function WhoToFollowCard() {
    return (
        <div className='flex items-center justify-between gap-8 px-4 py-2 hover:bg-gray-200 transition cursor-pointer'>
            <div className='flex gap-4'>
                <Avatar />

                <div className='space-y-1 text-sm'>
                    <p className='font-bold'>Display Name</p>
                    <p className='text-gray-500'>@username</p>
                </div>
            </div>

            <Button color='secondary'>Follow</Button>
        </div>
    )
}
