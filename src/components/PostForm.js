import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const PostForm = () => {
    const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getPosts: {
                        newData,
                    },
                },
            });
            values.body = '';
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <form
            className='shadow-lg rounded-lg bg-gray-300 sm:w-2/4 w-3/4 mx-auto p-4 m-4'
            onSubmit={onSubmit}
        >
            <label
                className={`block uppercase text-xs font-bold mb-2 text-gray-700 ${
                    error ? 'text-red-500' : ''
                }`}
                htmlFor='grid-password'
            >
                Create a new post
            </label>
            <textarea
                className={`border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ${
                    error ? 'border-red-500' : ''
                }`}
                style={{ transition: 'all .15s ease' }}
                label='Body of a post'
                placeholder='Body of a post'
                name='body'
                type='text'
                value={values.body}
                onChange={onChange}
            />
            {error && <div className='mt-2 text-red-600'>{error.graphQLErrors[0].message}</div>}
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
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
