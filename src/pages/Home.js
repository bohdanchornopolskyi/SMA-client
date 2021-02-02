import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { AuthContext } from '../contex/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div className='flex flex-col items-center w-5/6'>
            <h1 className='text-xl font-semibold m-1'>Recent posts</h1>
            {user && <PostForm />}
            {loading ? (
                <h1 className='text-lg font-light m-1'>Loading posts...</h1>
            ) : (
                data && data.getPosts.map((post) => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
};

export default Home;
