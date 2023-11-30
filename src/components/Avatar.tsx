import Image from 'next/image'
import React from 'react'

type AvatarProps = {
    size?: "sm" | "md" | "lg"
    isActiveOverlay?: boolean
    avatarUrl?: string | null
}

export default function Avatar({ size = "sm", isActiveOverlay, avatarUrl }: AvatarProps) {
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
        <div style={{width: getSize(), height: getSize()}} className={`relative rounded-full flex items-center justify-center overflow-hidden group ${isActiveOverlay ? "cursor-default" : "cursor-pointer"}`}>
            <Image src={avatarUrl ? avatarUrl : "/assets/images/img_avatar.png"} fill alt="user" className='rounded-full' />

            <div className={`absolute top-0 left-0 bottom-0 right-0 ${isActiveOverlay ? "bg-black/20" : "bg-black/10 opacity-0 group-hover:opacity-100 transition"}`}></div>
        </div>
    )
}
