import Image from 'next/image'
import React from 'react'

type AvatarProps = {
    size?: "sm" | "md" | "lg"
}

export default function Avatar({ size = "sm" }: AvatarProps) {
    const getSize = (): number => {
        switch (size) {
            case "sm":
                return 40
            case "md":
                return 48
            case "lg":
                return 128
            default:
                return 40
        }
    }

    return (
        <div style={{width: getSize(), height: getSize()}} className={`cursor-pointer relative rounded-full flex items-center justify-center overflow-hidden group`}>
            <Image src="/assets/images/img_avatar.png" fill alt="user" className='rounded-full' />

            <div className='absolute top-0 left-0 bottom-0 right-0 bg-black/10 opacity-0 group-hover:opacity-100 transition'></div>
        </div>
    )
}
