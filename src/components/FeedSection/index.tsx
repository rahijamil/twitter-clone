import React, { Suspense } from 'react'
import FeedHeader from './FeedHeader'
import TweetBox from './TweetBox'
import Tweets from './Tweets'
import { Tweet } from '@/lib/types'
import { supabase } from '@/config/supabase.config'

async function getTweets(): Promise<Tweet[]> {
  const { data, error } = await supabase.from('tweets').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export default async function FeedSection() {
  const tweets = await getTweets();

  return (
    <>
      {/* Feed Header */}
      <FeedHeader />

      {/* Tweet Box */}
      <TweetBox />

      {/* Tweets Feed */}
      <Suspense fallback={
        <div className='h-[70vh] flex justify-center py-10'>
          <div className='w-7 h-7 border-[3px] border-t-primary border-gray-100 border-solid rounded-full animate-spin'></div>
        </div>
      }>
        <Tweets tweets={tweets} />
      </Suspense>
    </>
  )
}
