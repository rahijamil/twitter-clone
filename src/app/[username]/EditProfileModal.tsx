import { Button } from '@/components'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext';
import EditProfileCover from './EditProfileCover';
import { supabase } from '@/config/supabase.config';
import { UserProfile } from '@/lib/types';

export interface ProfileCoverImage {
    avatar: File | null,
    cover: File | null
}

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
    const {
        userProfile
    } = useAuthContext();

    const [userData, setUserData] = useState<UserProfile | null>(userProfile);
    const [images, setImages] = useState<ProfileCoverImage>({
        avatar: null,
        cover: null
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData((prevUserData) => ({
            ...prevUserData as UserProfile,
            [ev.target.name]: ev.target.value,
        }))
    };

    const handleSaveProfile = async () => {
        if (userProfile?.user_uid && userData) {
            setLoading(true);

            const updatedUserData = {
                name: userData?.name,
                username: userData?.username,
                bio: userData?.bio,
                location: userData?.location,
                website: userData?.website,
                avatar_url: userData.avatar_url,
                cover_url: userData.cover_url,
            }

            if (images.avatar) {
                const { data, error } = await supabase.storage.from('profile_images').upload(`avatars/${userData?.user_uid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10)}_${images.avatar.name}`, images.avatar, {
                    upsert: true,
                });

                if (error) {
                    console.error(
                        { avatarUploadError: error }
                    );
                    setLoading(false);
                    return;
                } else if (data) {
                    const { data: { publicUrl } } = supabase.storage.from('profile_images').getPublicUrl(data.path);
                    updatedUserData['avatar_url'] = publicUrl;
                }
            }

            if (images.cover) {
                const { data, error } = await supabase.storage.from('profile_images').upload(`covers/${userData?.user_uid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10)}_${images.cover.name}`, images.cover, {
                    upsert: true,
                });

                if (error) {
                    console.error(
                        {
                            coverUploadError: error
                        }
                    );
                    setLoading(false);
                    return;
                } else if (data) {
                    const { data: { publicUrl } } = supabase.storage.from('profile_images').getPublicUrl(data.path);

                    updatedUserData['cover_url'] = publicUrl;
                }
            }

            const { error } = await supabase.from("profiles").update({
                ...updatedUserData
            }).eq("user_uid", userProfile.user_uid);

            if (error) {
                console.error({ profileUpdateError: error });
                setLoading(false);
                return;
            }

            setLoading(false);
            onClose();
        }
        else {
            console.log("User UID not found");
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/30 z-20 flex items-center justify-center' onClick={onClose}>
            <div className='bg-white w-11/12 max-w-[38rem] rounded-2xl' onClick={(ev) => ev.stopPropagation()}>
                {/* Modal Header */}
                <div className='flex items-center justify-between gap-8 p-2'>
                    <div className='flex items-center gap-8'>
                        <div className='w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition cursor-pointer' onClick={onClose}>
                            <div className='w-5 h-5'>
                                <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
                            </div>
                        </div>

                        <p className='font-bold text-xl'>Edit Profile</p>
                    </div>
                    <div className=''>
                        <Button disabled={loading} color='secondary' onClick={handleSaveProfile}>
                            {
                                loading ? "Saving..." : "Save"
                            }
                        </Button>
                    </div>
                </div>

                <div className='max-h-[75vh] overflow-y-auto'>
                    {/* Modal Profile Cover */}
                    <EditProfileCover setImages={setImages} />

                    {/* Modal Profile Info */}

                    <div className='p-4 pb-12 space-y-6'>
                        <div className='border-[1.5px] border-gray-200 rounded-md focus-within:border-primary overflow-hidden group transition'>
                            <label htmlFor="name" className='text-gray-500 text-xs group-focus-within:text-primary transition block px-2 pt-2'>Name</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                className='w-full border-none focus:outline-none px-2 pb-1'
                                value={userData?.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='border-[1.5px] border-gray-200 rounded-md focus-within:border-primary overflow-hidden group transition'>
                            <label htmlFor="bio" className='text-gray-500 text-xs group-focus-within:text-primary transition block px-2 pt-2'>Bio</label>
                            <textarea
                                id='bio'
                                name='bio'
                                className='w-full border-none focus:outline-none px-2 pb-1'
                                value={userData?.bio}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='border-[1.5px] border-gray-200 rounded-md focus-within:border-primary overflow-hidden group transition'>
                            <label htmlFor="location" className='text-gray-500 text-xs group-focus-within:text-primary transition block px-2 pt-2'>Location</label>
                            <input
                                type="text"
                                id='location'
                                name='location'
                                className='w-full border-none focus:outline-none px-2 pb-1'
                                value={userData?.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='border-[1.5px] border-gray-200 rounded-md focus-within:border-primary overflow-hidden group transition'>
                            <label htmlFor="website" className='text-gray-500 text-xs group-focus-within:text-primary transition block px-2 pt-2'>Website</label>
                            <input
                                type="url"
                                id='website'
                                name='website'
                                className='w-full border-none focus:outline-none px-2 pb-1'
                                value={userData?.website}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
