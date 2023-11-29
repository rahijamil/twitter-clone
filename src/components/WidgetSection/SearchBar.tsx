import React from 'react'

export default function SearchBar() {
    return (
        <div className='bg-white/60 backdrop-blur-md px-8 sticky top-0 py-1'>
            <div className='rounded-full bg-gray-100 focus-within:bg-white flex items-center gap-2 px-4 group border border-transparent  focus-within:border-primary transition'>
                <div className='w-5 h-5 text-gray-500 group-focus-within:text-primary transition'>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" fill='currentColor'></path></g></svg>
                </div>
                <input
                    type="text"
                    placeholder='Search'
                    className='w-full bg-transparent border-none focus:outline-none py-[9px] px-2 placeholder:text-gray-500'
                />
            </div>
        </div>
    )
}
