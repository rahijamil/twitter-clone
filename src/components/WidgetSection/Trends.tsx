import React from 'react'
import TrendsCard from './TrendsCard'

export default function Trends() {
    return (
        <div className='bg-gray-100 rounded-3xl overflow-hidden'>
            <div className='p-4'>
                <h3 className='font-extrabold text-lg'>Trends for you</h3>
            </div>

            <div>
                {
                    Array.from({ length: 10 }).map((item, index) => (
                        <TrendsCard key={index} />
                    ))
                }
            </div>

            <div className='p-4 hover:bg-gray-200 transition flex items-center justify-between gap-8 cursor-pointer'>
                <p className='text-primary text-sm'>Show more</p>
            </div>
        </div>
    )
}
