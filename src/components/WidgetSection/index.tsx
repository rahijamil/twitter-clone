import React from 'react'
import SearchBar from './SearchBar'
import Trends from './Trends'
import WhoToFollow from './WhoToFollow'

export default function WidgetSection() {
  return (
    <div className='flex-[.325] min-h-screen space-y-4'>
      {/* SearchBar */}
      <SearchBar />

      <div className='px-8 space-y-4'>
        {/* Trends for you */}
        <Trends />
        {/* Who to follow */}
        <WhoToFollow />
      </div>
    </div>
  )
}
