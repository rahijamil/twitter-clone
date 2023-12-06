"use client";
import Link from 'next/link'
import React from 'react'
import { sidebarItems } from './sidebarItems'
import { usePathname } from 'next/navigation'
import { Avatar, Button } from '..';
import { useAuthContext } from '@/contexts/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const {
    userProfile
} = useAuthContext();

  // const handleLogout = async ()  => {
  //   await supabase.auth.signOut();
  // }

  return (
    <div className='flex-[.2] border-r border-gray-200 h-screen flex flex-col sticky top-0'>
      <div className='flex-1'>
        <div className='pl-2'>
          <Link href="/" className='w-12 h-12 rounded-full hover:bg-gray-200 transition flex items-center justify-center'>
            <div className='w-8 h-8'>
              <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>
          </Link>
        </div>

        <nav>
          <ul>
            {
              sidebarItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.pathName == "/profile" ? userProfile?.username || "/profile" : item.pathName} className='group block'>

                    <div className={`inline-flex items-center gap-4 group-hover:bg-gray-200 transition rounded-[30px] p-4 py-3 text-lg ${pathname == item.pathName ? "font-bold" : "font-medium"}`}>
                      <div className='w-6 h-6'>
                        {item.icon(pathname == item.pathName)}
                      </div>
                      {item.name}
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>

        <div className='pr-8 pt-4'>
          <Button size='lg'>Post</Button>
        </div>
      </div>


      <div className='flex items-center gap-2 hover:bg-gray-100 transition rounded-full p-3 mb-4 mr-8 cursor-pointer'>
        <Avatar />

        <div className='flex items-center justify-between gap-4 flex-1'>
          <div className='text-sm'>
            <p className='font-bold'>Display Name</p>
            <p className='text-gray-500'>@username</p>
          </div>
          <div>
            <div className='w-5 h-5'>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill='currentColor'><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
