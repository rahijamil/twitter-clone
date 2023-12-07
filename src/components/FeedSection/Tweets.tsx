import React from 'react'
import Tweet from './Tweet'
import { Tweet as TweetTypes } from '@/lib/types'

export default function Tweets({ tweets }: { tweets: TweetTypes[] }) {
    return (
        <div>
            {
                tweets.map((item) => (
                    <Tweet key={item.id} tweet={item} />
                ))
            }
        </div>
    )
}
