import React from 'react'
import WhoToFollowCard from './WhoToFollowCard'

export default function WhoToFollow() {
    return (
        <div className='bg-gray-100 rounded-3xl overflow-hidden'>
            <div className='p-4'>
                <h3 className='font-extrabold text-lg'>Who to follow</h3>
            </div>

            <div>
                {
                    Array.from({ length: 3 }).map((item, index) => (
                        <WhoToFollowCard key={index} />
                    ))
                }
            </div>

            <div className='p-4 hover:bg-gray-200 transition flex items-center justify-between gap-8 cursor-pointer'>
                <p className='text-primary text-sm'>Show more</p>
            </div>
        </div>
    )
}
