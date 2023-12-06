import React from 'react';

type ButtonProps = {
    children: React.ReactNode
    color?: "primary" | "secondary"
    size?: "sm" | "lg"
    variant?: "regular" | "outline"
    onClick?: () => void
    disabled?: boolean
    type?: "button" | "submit"
}

export default function Button({
    children,
    color = "primary",
    size = "sm",
    variant = "regular",
    onClick,
    disabled = false,
    type = "button" }: ButtonProps) {
    return (
        <div onClick={onClick} className={`relative ${size == "sm" ? "rounded-full" : "rounded-3xl"} overflow-hidden group cursor-pointer`}>
            {
                variant == "regular"
                    ? <button type={type} disabled={disabled} className={`${color == "primary" ? "bg-primary" : color == "secondary" && "bg-black"} text-white font-bold disabled:opacity-50 ${size == "sm" ? "py-[6px] text-sm px-4 rounded-3xl" : size == "lg" && "w-full py-3 px-8 rounded-full"}`}>
                        {
                            children
                        }
                    </button>
                    : <button type={type} disabled={disabled} className={`font-bold border border-gray-200 disabled:opacity-50 ${size == "sm" ? "py-[6px] text-sm px-4 rounded-3xl" : size == "lg" && "w-full py-3 px-8 rounded-full"}`}>
                        {
                            children
                        }
                    </button>
            }

            {
                !disabled && (
                    <div className='absolute top-0 left-0 bottom-0 right-0 bg-black/5 opacity-0 group-hover:opacity-100 transition'></div>
                )
            }
        </div>
    )
}
