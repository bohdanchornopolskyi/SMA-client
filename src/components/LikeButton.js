import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart, solidHeart);

const LikeButton = ({ post: { id, likes, likeCount }, user }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    const likeButton = user ? (
        liked ? (
            <button onClick={likePost} className='btn rounded shadow w-1/5 m-2 ml-2'>
                <FontAwesomeIcon className='mr-1' icon={solidHeart} size='1x'></FontAwesomeIcon>
                {likeCount}
            </button>
        ) : (
            <button onClick={likePost} className='btn rounded shadow w-1/5 m-2 ml-2'>
                <FontAwesomeIcon className='mr-1' icon={faHeart} size='1x'></FontAwesomeIcon>
                {likeCount}
            </button>
        )
    ) : (
        <Link className='rounded shadow w-1/5 m-2 ml-2 text-center' to='/login'>
            <button className='btn'>
                <FontAwesomeIcon className='mr-1' icon={faHeart} size='1x'></FontAwesomeIcon>
                {likeCount}
            </button>
        </Link>
    );

    return likeButton;
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;
