import React from 'react'

export default function TrendsCard() {
    return (
        <div className='px-4 py-2 hover:bg-gray-200 transition flex items-center justify-between gap-8 cursor-pointer'>
            <div className='text-xs text-gray-500'>
                <p>Coding · Tredning</p>
                <p className='text-gray-800 font-bold text-base'>#React</p>
                <p>138K</p>
            </div>

            <div className="group">
                <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-gray-500 group-hover:text-primary'>
                    <div className='w-5 h-5'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
