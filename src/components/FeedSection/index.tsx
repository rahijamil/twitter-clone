import React from 'react'
import FeedHeader from './FeedHeader'
import TweetBox from './TweetBox'
import Tweet from './Tweet'
import Tweets from './Tweets'

export default function FeedSection() {

  const tweets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {/* Feed Header */}
      <FeedHeader />

      {/* Tweet Box */}
      <TweetBox />

      {/* Tweets Feed */}
      <Tweets tweets={tweets} />
    </>
  )
}
