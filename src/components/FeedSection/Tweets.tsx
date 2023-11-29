import React from 'react'
import Tweet from './Tweet'

export default function Tweets({tweets}: {tweets: number[]}) {
    return (
        <div>
            {
                tweets.map((item) => (
                    <Tweet key={item} />
                ))
            }
        </div>
    )
}
