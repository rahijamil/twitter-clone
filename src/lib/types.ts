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

export type PollOption = {
    id: string;
    text: string;
}

export type Tweet = {
    id?: number;
    profile_id: string;
    content: string;
    media: {
        images: string[],
        gif: string | null,
    };
    poll: {
        options: PollOption[];
        duration: number; // in seconds
        votes: Record<string, string>; // Map user_id to selected option;
        allow_multiple_selections?: boolean;
    } | null;
    likes: number;
    retweets: number;
    replies: number;
    created_at?: string;
    profile_metadata: {
        name: string;
        username: string;
        avatar_url: string;
    }
    // You can add more fields as needed, such as geolocation, hashtags, etc.
};
