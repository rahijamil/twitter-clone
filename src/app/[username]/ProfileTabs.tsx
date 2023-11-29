import Link from 'next/link'
import React from 'react'

export default function ProfileTabs() {
  return (
    <div className='border-b border-gray-200'>
      <ul className='flex items-center flex-1'>
        <li className='flex-1'>
          <Link href="/" className='hover:bg-gray-200 transition p-4 block text-center font-semibold text-gray-600 text-sm'>
            Posts
          </Link>
        </li>
        <li className='flex-1'>
          <Link href="/following" className='hover:bg-gray-200 transition p-4 block text-center font-semibold text-gray-600 text-sm'>
            Replies
          </Link>
        </li>
        <li className='flex-1'>
          <Link href="/following" className='hover:bg-gray-200 transition p-4 block text-center font-semibold text-gray-600 text-sm'>
            Highlights
          </Link>
        </li>
        <li className='flex-1'>
          <Link href="/following" className='hover:bg-gray-200 transition p-4 block text-center font-semibold text-gray-600 text-sm'>
            Media
          </Link>
        </li>
        <li className='flex-1'>
          <Link href="/following" className='hover:bg-gray-200 transition p-4 block text-center font-semibold text-gray-600 text-sm'>
            Likes
          </Link>
        </li>
      </ul>
    </div>
  )
}
