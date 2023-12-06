"use client";
import { Avatar, Button } from '@/components'
import Image from 'next/image'
import React from 'react'
import EditProfileModal from './EditProfileModal';
import { useAuthContext } from '@/contexts/AuthContext';

export default function ProfileCover() {
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const {
    userProfile
} = useAuthContext();

  return (
    <>
      <div className='pb-20'>
        <div className='relative'>
          <div className='relative aspect-[3/1] bg-gray-100'>
            {
              userProfile?.cover_url && (
                <Image src={userProfile.cover_url} alt="cover" fill />
              )
            }
          </div>

          <div className='absolute top-1/2 translate-y-1/3 left-4'>
            <div className='p-1 bg-white flex items-center justify-center rounded-full w-fit'>
              <Avatar size='lg' avatarUrl={userProfile?.avatar_url} />
            </div>
          </div>

          <div className='absolute top-[calc(100%_+_12px)] right-4'>
            <Button variant='outline' onClick={() => setShowEditProfile(true)}>Edit profile</Button>
          </div>
        </div>
      </div>

      {
        showEditProfile && (
          <EditProfileModal onClose={() => setShowEditProfile(false)} />
        )
      }
    </>
  )
}
