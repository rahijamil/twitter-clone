export type UserProfile = {
    id?: string,
    user_uid: string;
    email: string,
    username: string
    avatar_url: string;
    cover_url: string;
    name: string;
    bio: string;
    location: string;
    website: string;
    created_at: string;
}

export type Tweet = {
    id?: number;
    profile_id: string;
    content: string;
    media_urls?: string[]; // Array of URLs for attached media (images, videos, etc.)
    created_at?: string;
    likes: number;
    retweets: number;
    replies: number;
    // You can add more fields as needed, such as geolocation, hashtags, etc.
};
