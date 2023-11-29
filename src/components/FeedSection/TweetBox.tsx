import Image from 'next/image'
import React from 'react'
import { Avatar, Button } from '..'

export default function TweetBox() {
    return (
        <div className='flex gap-4 border-b py-2 px-4 border-gray-200'>
            <div className='pt-2'>
                <Avatar />
            </div>

            <div className='flex-1'>
                <div className='relative'>
                    <div className='px-3 py-[2px] border border-primary rounded-3xl text-xs font-bold text-primary flex items-center gap-2 hover:bg-primary/10 transition cursor-pointer w-fit'>
                        <span>Everyone</span>

                        <span className='inline-block w-5 h-5'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" fill='currentColor'></path></g></svg>
                        </span>
                    </div>
                </div>
                <div className='w-full'>
                    <textarea className='resize-none border-none focus:outline-none py-4 w-full text-xl placeholder:text-gray-500' placeholder='What is happening?!'></textarea>
                </div>
                <div className='flex items-center justify-between gap-8 border-t border-gray-200 pt-2'>
                    <div>
                        <ul className='flex items-center justify-center'>
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
                            <li className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-primary'>
                                <div className='w-5 h-5'>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Button>Post</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
