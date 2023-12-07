import React, { Suspense } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileCover from './ProfileCover';
import ProfileInfo from './ProfileInfo';
import ProfileTabs from './ProfileTabs';
import Tweets from '@/components/FeedSection/Tweets';
import { supabase } from '@/config/supabase.config';
import { Tweet, UserProfile } from '@/lib/types';
import { notFound } from 'next/navigation';

async function getTweets(username: string): Promise<Tweet[]> {
    const { data, error } = await supabase.from('tweets').select('*').order('created_at', { ascending: false }).eq('profile_metadata->>username', username);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

async function getProfile(username: string): Promise<UserProfile | null> {
    const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

async function getTweetCount(userProfile: UserProfile | null) {
    if (userProfile) {
        const { data, error } = await supabase.from('tweets').select('id', { count: 'exact' }).eq('profile_id', userProfile?.id);

        if (error) {
            console.error(error);
            return;
        }

        return data.length;

    }
}

export default async function ProfilePage({ params: { username } }: { params: { username: string } }) {
    const userProfile = await getProfile(username);

    if(!userProfile){
        notFound();
    }
    
    
    const tweets = await getTweets(username);
    const tweetCount = await getTweetCount(userProfile);

    return (
        <div>
            {/* Profile Header */}
            <ProfileHeader userProfile={userProfile} tweetCount={tweetCount || 0} />

            {/* Profile Cover and Avatar Image */}
            <ProfileCover userProfile={userProfile} />

            {/* Profile info: username, bio, followers, following, location, etc. */}
            <ProfileInfo userProfile={userProfile} />

            {/* Profile Tabs: Posts, Replies, Likes, etc */}
            <ProfileTabs />

            {/* Tweets */}
            <Suspense fallback={
                <div className='h-[70vh] flex justify-center py-10'>
                    <div className='w-7 h-7 border-[3px] border-t-primary border-gray-100 border-solid rounded-full animate-spin'></div>
                </div>
            }>
                <Tweets tweets={tweets} />
            </Suspense>
        </div>
    );
}
