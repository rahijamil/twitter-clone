"use client";
import React, { useState } from 'react'
import { Avatar, Button } from '..'
import { Tweet } from '@/lib/types';
import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import Poll from './Poll';
import { supabase } from '@/config/supabase.config';

export default function TweetBox() {
    const { userProfile } = useAuthContext();

    const [tweetData, setTweetData] = useState<Tweet>({
        profile_id: userProfile?.id!,
        content: '',
        media: {
            images: [],
            gif: null,
        },
        poll: null,
        likes: 0,
        retweets: 0,
        replies: 0,
        profile_metadata: {
            name: userProfile?.name!,
            avatar_url: userProfile?.avatar_url!,
            username: userProfile?.username!,
        }
    });
    const [media, setMedia] = useState<{
        images: File[],
        gif: File | null
    }>({
        images: [],
        gif: null
    });

    const [tweetLoading, setTweetLoading] = useState<boolean>(false);

    const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'gif') => {
        const files = ev.target.files;

        if (files?.length) {
            if (type === 'image' && tweetData.media.images.length < 4) {
                const newImages = [...tweetData.media.images];
                for (let i = 0; i < files.length; i++) {
                    const preview_url = URL.createObjectURL(files[i]);
                    newImages.push(preview_url);
                }

                setTweetData((prevData) => ({
                    ...prevData,
                    media: {
                        ...prevData.media,
                        images: newImages,
                    },
                }));

                setMedia({
                    ...media,
                    images: [...media.images, ...Array.from(files)],
                })
            } else if (type === 'gif' && tweetData.media.gif === null) {
                const preview_url = URL.createObjectURL(files[0]);
                setTweetData((prevData) => ({
                    ...prevData,
                    media: {
                        ...prevData.media,
                        gif: preview_url,
                    },
                }));

                setMedia({
                    ...media,
                    gif: files[0],
                })
            }

            // Reset the input field
            ev.target.value = '';
        }
    };

    const handleRemoveMedia = (url: string, fileName?: string) => {
        setTweetData((prevData) => ({
            ...prevData,
            media: {
                ...prevData.media,
                images: prevData.media.images.filter((_, i) => _ !== url),
                gif: prevData.media.gif === url ? null : prevData.media.gif,
            },
        }));

        setMedia({
            ...media,
            images: media.images.filter((_, i) => media.images[i].name !== fileName),
            gif: media.gif?.name === fileName ? null : media.gif
        })
    };

    const handleCreatePoll = () => {
        if (!tweetData.poll) {
            const newPoll: Tweet['poll'] = {
                options: [
                    { id: '1', text: '' },
                    { id: '2', text: '' },
                ],
                duration: 60, // 1 minute
                votes: {},
            };

            setTweetData((prevData) => ({
                ...prevData,
                poll: newPoll,
            }));
        }
    };

    const handlePostTweet = async () => {
        setTweetLoading(true);

        // Upload images to Supabase Storage
        const imageUrls = await Promise.all(
            media.images.map(async (image) => {
                const { data, error } = await supabase.storage.from('tweet_media').upload(`images/${Date.now().toString()}_${image.name}`, image);
                if (error) {
                    console.error(error);
                    return null;
                }
                return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tweet_media/${data.path}`;
            })
        );

        // Upload gif to Supabase Storage
        let gifUrl = null;
        if (media.gif) {
            const { data, error } = await supabase.storage.from('tweet_media').upload(`gifs/${Date.now().toString()}_${media.gif.name}`, media.gif);
            if (error) {
                console.error(error);
            } else {
                gifUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tweet_media/${data.path}`;
            }
        }

        // Prepare tweet data with media URLs
        const tweetWithMedia = {
            ...tweetData,
            media: {
                images: imageUrls.filter((url) => url !== null),
                gif: gifUrl,
            },
        };

        // Insert tweet data into the 'tweets' table
        const { data: tweetInsertData, error: tweetInsertError } = await supabase.from('tweets').insert(tweetWithMedia);

        if (tweetInsertError) {
            console.error(tweetInsertError);
            setTweetLoading(false);
            return;
        }

        // Reset tweet data and media state
        setTweetData({
            profile_id: userProfile?.id!,
            content: '',
            media: {
                images: [],
                gif: null,
            },
            poll: null,
            likes: 0,
            retweets: 0,
            replies: 0,
            profile_metadata: {
                name: userProfile?.name!,
                username: userProfile?.username!,
                avatar_url: userProfile?.avatar_url!,
            }
        });

        setMedia({
            images: [],
            gif: null,
        });

        setTweetLoading(false);
    };

    return (
        <div className='flex gap-4 border-b py-2 px-4 border-gray-200'>
            <div className='pt-2'>
                <Avatar avatarUrl={userProfile?.avatar_url} />
            </div>

            <div className='flex-1'>
                <div className='relative'>
                    <div className='px-3 py-[2px] border border-primary rounded-3xl text-xs font-bold text-primary flex items-center gap-2 hover:bg-[rgb(29_161_242_/_0.125)] transition cursor-pointer w-fit'>
                        <span>Everyone</span>

                        <span className='inline-block w-5 h-5'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" fill='currentColor'></path></g></svg>
                        </span>
                    </div>
                </div>

                <div className='w-full'>
                    <textarea
                        className='resize-none border-none focus:outline-none py-4 w-full text-xl placeholder:text-gray-500'
                        placeholder={tweetData.poll ? 'Ask a question' : 'What is happening?!'}
                        value={tweetData?.content}
                        onChange={(e) => setTweetData({ ...tweetData, content: e.target.value })}
                        rows={1}
                    ></textarea>
                </div>

                {
                    tweetData?.media.images.length || tweetData?.media.gif ? (
                        <div className={`grid gap-2 ${tweetData.media.images.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {tweetData.media.images.map((url, index) => (
                                <div key={index} className='relative aspect-square w-full rounded-2xl overflow-hidden transition-all duration-500 ease-in-out'>
                                    <Image
                                        src={url}
                                        fill
                                        objectFit='cover'
                                        alt="tweet"
                                    />

                                    <div className='absolute top-0 left-0 bottom-0 right-0 flex items-start justify-end p-4'>
                                        <button onClick={() => handleRemoveMedia(url, media.images[index].name)} className='p-1 hover:bg-black/60 transition bg-black/50 rounded-full text-white'>
                                            <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill='currentColor'>
                                                <g>
                                                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {tweetData.media.gif && (
                                <div key="gif" className='relative aspect-square w-full rounded-2xl overflow-hidden transition-all duration-500 ease-in-out'>
                                    <Image
                                        src={tweetData.media.gif}
                                        fill
                                        objectFit='cover'
                                        alt="tweet"
                                    />

                                    <div className='absolute top-0 left-0 bottom-0 right-0 flex items-start justify-end p-4'>
                                        <button onClick={() => handleRemoveMedia(tweetData.media.gif!, media.gif?.name)} className='p-1 hover:bg-black/60 transition bg-black/50 rounded-full text-white'>
                                            <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill='currentColor'>
                                                <g>
                                                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null
                }

                {tweetData.poll && <Poll poll={tweetData.poll} setTweetData={setTweetData} />}

                <div className={`flex items-center justify-between gap-8 border-t border-gray-200 pt-2 ${tweetData.poll && "mt-4"}`}>
                    <div className='flex items-center justify-center'>
                        <div>
                            <label htmlFor='imageFile' className={`w-[34px] h-[34px] flex items-center justify-center rounded-full text-primary ${(tweetLoading || tweetData.poll !== null || tweetData.media.images.length >= 4) ? "cursor-default opacity-50" : "cursor-pointer transition hover:bg-[rgb(29_161_242_/_0.125)]"}`}>
                                <div className='w-5 h-5'>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                                </div>
                            </label>

                            <input
                                type="file"
                                name="imageFile"
                                id="imageFile"
                                className='sr-only'
                                accept="image/png, image/jpeg"
                                onChange={(ev) => handleFileChange(ev, 'image')}
                                multiple
                                disabled={tweetData.poll !== null || tweetData.media.images.length >= 4}
                            />
                        </div>
                        <div>
                            <label htmlFor='gifFile' className={`w-[34px] h-[34px] flex items-center justify-center rounded-full text-primary ${(tweetLoading || (tweetData.poll !== null || tweetData.media.gif ? true : false)) ? "cursor-default opacity-50" : "cursor-pointer transition hover:bg-[rgb(29_161_242_/_0.125)]"}`}>
                                <div className='w-5 h-5'>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path></g></svg>
                                </div>
                            </label>

                            <input
                                type="file"
                                name='gifFile'
                                id='gifFile'
                                className='sr-only'
                                accept="image/gif"
                                onChange={(ev) => handleFileChange(ev, 'gif')}
                                disabled={tweetLoading || tweetData.poll !== null || tweetData.media.gif ? true : false}
                            />
                        </div>

                        <button onClick={handleCreatePoll} disabled={tweetLoading || tweetData.media.images.length > 0 || tweetData.media.gif != null || tweetData.poll !== null} className='w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-pointer transition hover:bg-[rgb(29_161_242_/_0.125)] text-primary disabled:opacity-50 disabled:cursor-default disabled:hover:bg-transparent'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path></g></svg>
                            </div>
                        </button>

                        <li className='w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-default transitionhover:bg-[rgb(29_161_242_/_0.125)] text-primary opacity-50'>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path></g></svg>
                            </div>
                        </li>
                    </div>
                    <div>
                        <Button disabled={!tweetData.content.trim() || tweetLoading} onClick={handlePostTweet}>
                            {
                                tweetLoading ? "Posting..." : "Post"
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
