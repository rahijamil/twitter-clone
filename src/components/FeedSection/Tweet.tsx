import React from 'react'
import { Avatar } from '..'
import { Tweet } from '@/lib/types'
import Image from 'next/image'
import ShowPoll from './ShowPoll'
import moment from 'moment'
import Link from 'next/link'

export default function Tweet({ tweet }: { tweet: Tweet }) {
    return (
        <div className='flex gap-4 py-2 px-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition'>
            <Avatar username={tweet.profile_metadata.username} avatarUrl={tweet.profile_metadata.avatar_url} />

            <div className='flex-1 space-y-1'>
                <div className='flex items-center justify-between gap-8'>
                    <div className='flex items-center gap-1'>
                        <Link href={`/${tweet.profile_metadata.username}`} className='font-bold text-sm hover:underline transition'>{tweet.profile_metadata.name}</Link>
                        <Link href={`/${tweet.profile_metadata.username}`} className='text-sm text-gray-500 hover:underline transition'>@{tweet.profile_metadata.username}</Link>
                        <span className='text-sm text-gray-500'>·</span>
                        <span className='text-sm text-gray-500'>{moment(tweet.created_at).fromNow()}</span>
                    </div>
                    <div className="group">
                        <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition hover:bg-primary/10 text-gray-500 group-hover:text-primary'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='space-y-4'>
                    <p className='text-sm'>{tweet.content}</p>

                    {
                        tweet?.media.images.length || tweet?.media.gif ? (
                            <div className={`grid gap-2 ${tweet.media.images.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                {tweet.media.images.map((url, index) => (
                                    <div key={index} className='relative aspect-square w-full rounded-2xl overflow-hidden transition-all duration-500 ease-in-out bg-gray-100 dark:bg-gray-800'>
                                        <Image
                                            src={url}
                                            fill
                                            objectFit='cover'
                                            alt="tweet"
                                        />

                                        {/* <div className='absolute top-0 left-0 bottom-0 right-0 flex items-start justify-end p-4'>
                                            <button onClick={() => handleRemoveMedia(url)} className='p-1 hover:bg-black/60 transition bg-black/50 rounded-full text-white'>
                                                <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill='currentColor'>
                                                    <g>
                                                        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div> */}
                                    </div>
                                ))}
                                {tweet.media.gif && (
                                    <div key="gif" className='relative aspect-square w-full rounded-2xl overflow-hidden transition-all duration-500 ease-in-out'>
                                        <Image
                                            src={tweet.media.gif}
                                            fill
                                            objectFit='cover'
                                            alt="tweet"
                                        />
                                        {/* 
                                        <div className='absolute top-0 left-0 bottom-0 right-0 flex items-start justify-end p-4'>
                                            <button onClick={() => handleRemoveMedia(tweet.media.gif!)} className='p-1 hover:bg-black/60 transition bg-black/50 rounded-full text-white'>
                                                <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill='currentColor'>
                                                    <g>
                                                        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div> */}
                                    </div>
                                )}
                            </div>
                        ) : null
                    }

                    {
                        tweet.poll && (
                            <ShowPoll poll={tweet.poll} />
                        )
                    }
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
