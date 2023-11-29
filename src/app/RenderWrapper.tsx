"use client";
import Sidebar from '@/components/Sidebar'
import WidgetSection from '@/components/WidgetSection'
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'

export default function RenderWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isRender = !['/login', '/register'].includes(pathname);

    return (
        <>
            {
                isRender
                    ? <div className='wrapper flex'>
                        <Sidebar />
                        <div className='flex-[.475] border-r border-gray-200'>
                            {children}
                        </div>
                        <WidgetSection />
                    </div>
                    : <>{children}</>
            }
        </>
    )
}
