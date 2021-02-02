import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.scss';
import moment from 'moment';

import { AuthContext } from '../contex/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faComments } from '@fortawesome/free-regular-svg-icons';

library.add(faHeart, faComments);

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className='flex flex-col rounded bg-white shadow-md sm:w-2/4 w-3/4 mx-auto m-4 mr-4 ml-4'>
            <h1 className='font-medium p-2 pb-0'>{username}</h1>
            <small className='p-2 pt-0'>
                <Link to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Link>
            </small>
            <div className='p-2'>{body}</div>
            <div className='flex'>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Link to={`/post/${id}`} className='rounded shadow w-1/5 m-2 text-center'>
                    <button className='btn'>
                        <FontAwesomeIcon
                            className='mr-1'
                            icon={faComments}
                            size='1x'
                        ></FontAwesomeIcon>
                        {commentCount}
                    </button>
                </Link>
                {user && user.username === username && <DeleteButton entity='post' postId={id} />}
            </div>
        </div>
    );
};

export default PostCard;
