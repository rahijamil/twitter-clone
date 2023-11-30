import { Avatar } from '@/components'
import Image from 'next/image'
import React from 'react'
import { ProfileCoverImage } from './EditProfileModal'
import { useAuthContext } from '@/contexts/AuthContext'

type Props = {
    setImages: React.Dispatch<React.SetStateAction<ProfileCoverImage>>
}

export default function EditProfileCover({ setImages }: Props) {
    const userProfile = useAuthContext();
    const [avatarPreviewURL, setAvatarPreviewURL] = React.useState<string | null>(userProfile?.avatar_url || null);
    const [coverPreviewURL, setCoverPreviewURL] = React.useState<string | null>(userProfile?.cover_url || null);

    const handleAvatarChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;

        if (files?.length) {
            const avatar = files[0];

            const preview_url = URL.createObjectURL(avatar);
            setAvatarPreviewURL(preview_url);

            setImages((prevImage) => ({
                ...prevImage as ProfileCoverImage,
                avatar
            }))


        }
    };

    const handleCoverChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;

        if (files?.length) {
            const cover = files[0];

            const preview_url = URL.createObjectURL(cover);
            setCoverPreviewURL(preview_url);

            setImages((prevImage) => ({
                ...prevImage as ProfileCoverImage,
                cover
            }))


        }
    };

    return (
        <div className='pb-20'>
            <div className='relative'>
                <div className='relative aspect-[3/1] bg-gray-100'>
                    {
                        coverPreviewURL && (
                            <Image src={coverPreviewURL} alt="cover" fill />
                        )
                    }

                    <div className={`absolute top-0 left-0 bottom-0 right-0 bg-black/25`}></div>

                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                        <label htmlFor='coverUpload' className='w-11 h-11 rounded-full bg-black/50 hover:opacity-80 transition flex items-center justify-center overflow-hidden cursor-pointer'>
                            <div className='w-6 h-6'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill='white'><g><path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path></g></svg>
                            </div>
                        </label>

                        <input type="file" id='coverUpload' className='sr-only' onChange={handleCoverChange} />
                    </div>

                </div>

                <div className='absolute top-1/2 translate-y-1/3 left-4'>
                    <div className='p-1 bg-white flex items-center justify-center rounded-full w-fit relative'>
                        <Avatar size='lg' isActiveOverlay avatarUrl={avatarPreviewURL} />

                        <div className='absolute'>
                            <label htmlFor='avatarUpload' className='w-11 h-11 rounded-full bg-black/50 hover:opacity-80 transition flex items-center justify-center overflow-hidden cursor-pointer'>
                                <div className='w-6 h-6'>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" fill='white'><g><path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path></g></svg>
                                </div>

                                <input type="file" id='avatarUpload' className='sr-only' onChange={handleAvatarChange} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
