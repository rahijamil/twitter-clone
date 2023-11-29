import React from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileCover from './ProfileCover'
import ProfileInfo from './ProfileInfo'
import ProfileTabs from './ProfileTabs'
import Tweets from '@/components/FeedSection/Tweets'

export default function ProfilePage({ params: { username } }: { params: { username: string } }) {
    const tweets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div>
            {/* Profile Header */}
            <ProfileHeader />

            {/* Profile Cover and Avatar Image */}
            <ProfileCover />

            {/* Profile info: username, bio, followers, following, location, etc. */}
            <ProfileInfo />

            {/* Profile Tabs: Posts, Replies, Likes, etc */}
            <ProfileTabs />

            {/* Tweets */}
            <Tweets tweets={tweets} />
        </div>
    )
}
