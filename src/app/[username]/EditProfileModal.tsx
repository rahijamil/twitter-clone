import { Button } from '@/components'
import React from 'react'
import ProfileCover from './ProfileCover'

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/30 z-20 flex items-center justify-center' onClick={onClose}>
            <div className='bg-white w-11/12 max-w-xl rounded-2xl' onClick={(ev) => ev.stopPropagation()}>
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
                        <Button color='secondary'>Save</Button>
                    </div>
                </div>

                {/* Modal Profile Cover */}
                <ProfileCover />
            </div>
        </div>
    )
}
