import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';

import { AuthContext } from '../contex/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments } from '@fortawesome/free-regular-svg-icons';

library.add(faComments);

const SinglePost = (props) => {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { loading, data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment,
        },
    });

    function deleteButtonCallback() {
        props.history.push('/');
    }
    let postMarkup;
    if (loading) {
        postMarkup = <p>Loading post..</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = data.getPost;

        postMarkup = (
            <div className='flex flex-col items-center w-full h-full'>
                <div className='rounded bg-white shadow-md sm:w-2/4 w-3/4 mx-auto m-4 mr-4 ml-4'>
                    <h1 className='font-medium p-2 pb-0'>{username}</h1>
                    <small className='p-2 pt-0'>{moment(createdAt).fromNow(true)}</small>
                    <div className='p-2'>{body}</div>
                    <div className='flex'>
                        <LikeButton user={user} post={{ id, likes, likeCount }} />
                        <p className='rounded shadow w-1/5 m-2 text-center'>
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={faComments}
                                size='1x'
                            ></FontAwesomeIcon>
                            {commentCount}
                        </p>
                        {user && user.username === username && (
                            <DeleteButton
                                entity='post'
                                postId={id}
                                callback={deleteButtonCallback}
                            />
                        )}
                    </div>
                </div>
                {user && (
                    <form
                        className='shadow-lg rounded-lg bg-gray-300 sm:w-2/4 w-3/4 mx-auto p-4 m-4'
                        onSubmit={submitComment}
                    >
                        <label
                            className={`block uppercase text-xs font-bold mb-2 text-gray-700 `}
                            htmlFor='grid-password'
                        >
                            Create a new comment
                        </label>
                        <input
                            className={`border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full`}
                            style={{ transition: 'all .15s ease' }}
                            label='Body of a comment'
                            placeholder='Body of a comment'
                            name='comment'
                            type='text'
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            ref={commentInputRef}
                        />
                        <div className='text-center mt-6'>
                            <button
                                className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 w-full'
                                type='submit'
                                style={{ transition: 'all .15s ease' }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
                {comments.length > 0 && <p className='font-medium'>Comments...</p>}
                {comments.map((comment) => (
                    <div
                        className='flex flex-col rounded bg-white shadow-md sm:w-2/4 w-3/4 mx-auto m-4 mr-4 ml-4'
                        key={comment.id}
                    >
                        <h1 className='font-medium p-2 pb-0'>{comment.username}</h1>
                        <small className='p-2 pt-0'>
                            {moment(comment.createdAt).fromNow(true)}
                        </small>
                        <div className='p-2'>{comment.body}</div>
                        {user && user.username === comment.username && (
                            <DeleteButton entity='comment' postId={id} commentId={comment.id} />
                        )}
                    </div>
                ))}
            </div>
        );
    }
    return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: String!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;
