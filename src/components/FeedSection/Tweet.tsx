import React from 'react'
import { Avatar } from '..'

export default function Tweet() {
    return (
        <div className='flex gap-4 py-2 px-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition'>
            <Avatar />

            <div className='flex-1 space-y-1'>
                <div className='flex items-center justify-between gap-8'>
                    <div className='flex items-center gap-1'>
                        <span className='font-bold text-sm'>Rahi Jamil</span>
                        <span className='text-sm text-gray-500'>@RahiJamil</span>
                        <span className='text-sm text-gray-500'>·</span>
                        <span className='text-sm text-gray-500'>1h</span>
                    </div>
                    <div className="group">
                        <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-gray-500 group-hover:text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quisquam, quae.</p>
                </div>
                <div>
                    <ul className='flex items-center justify-between'>
                        <li className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                            </div>
                        </li>
                        <li className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                            </div>
                        </li>
                        <li className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                            </div>
                        </li>
                        <li className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                            </div>
                        </li>
                        <li className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
