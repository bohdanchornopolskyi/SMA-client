import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from '../util/hooks';
import { AuthContext } from '../contex/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faGoogle);

const Register = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function registerUser() {
        if (loading) {
            console.log('Loading..');
        }
        addUser();
    }

    return (
        <div className='container mx-auto px-4 h-full mt-4'>
            <div className='flex content-center items-center justify-center h-full'>
                <div className='w-full lg:w-4/12 px-4'>
                    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0'>
                        <div className='rounded-t mb-0 px-6 py-6'>
                            <div className='text-center mb-3'>
                                <h6 className='text-gray-600 text-sm font-bold'>Sign up with</h6>
                            </div>
                            <div className='btn-wrapper text-center'>
                                <button
                                    className='bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs'
                                    type='button'
                                    style={{ transition: 'all .15s ease' }}
                                    onClick={() => alert("Sorry, i'm working on it...")}
                                >
                                    Github
                                    <FontAwesomeIcon className='ml-1' icon={faGithub} size='1x' />
                                </button>
                                <button
                                    className='bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs'
                                    type='button'
                                    style={{ transition: 'all .15s ease' }}
                                    onClick={() => alert("Sorry, i'm working on it...")}
                                >
                                    Google
                                    <FontAwesomeIcon className='ml-1' icon={faGoogle} size='1x' />
                                </button>
                            </div>
                            <hr className='mt-6 border-b-1 border-gray-400' />
                        </div>
                        <div className='flex-auto px-4 lg:px-10 py-4     pt-0'>
                            {/* <div className='text-gray-500 text-center mb-3 font-bold'>
                                <small>Or sign up with credentials</small>
                            </div> */}
                            <form onSubmit={onSubmit}>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className={`block uppercase text-xs font-bold mb-2 ${
                                            errors.username ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                        htmlFor='grid-password'
                                    >
                                        Username
                                    </label>
                                    <input
                                        className={`border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ${
                                            errors.username ? 'border-red-500' : ''
                                        }`}
                                        style={{ transition: 'all .15s ease' }}
                                        label='Username'
                                        placeholder='Username..'
                                        name='username'
                                        type='text'
                                        value={values.username}
                                        onChange={onChange}
                                        autocompletes='new-password'
                                    />
                                    <div className='mt-2 text-red-600'>{errors.username}</div>
                                </div>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className={`block uppercase text-xs font-bold mb-2 ${
                                            errors.email ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                        htmlFor='grid-password'
                                    >
                                        Email
                                    </label>
                                    <input
                                        className={`border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ${
                                            errors.email ? 'border-red-500' : ''
                                        }`}
                                        style={{ transition: 'all .15s ease' }}
                                        label='Email'
                                        placeholder='Email..'
                                        name='email'
                                        type='email'
                                        value={values.email}
                                        onChange={onChange}
                                        autocompletes='new-password'
                                    />
                                    <div className='mt-2 text-red-600'>{errors.email}</div>
                                </div>

                                <div className='relative w-full mb-3'>
                                    <label
                                        className={`block uppercase text-xs font-bold mb-2 ${
                                            errors.password ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                        htmlFor='grid-password'
                                    >
                                        Password
                                    </label>
                                    <input
                                        className={`border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ${
                                            errors.password ? 'border-red-500' : ''
                                        }`}
                                        style={{ transition: 'all .15s ease' }}
                                        label='Password'
                                        placeholder='Password..'
                                        name='password'
                                        type='password'
                                        value={values.password}
                                        onChange={onChange}
                                        autocompletes='new-password'
                                    />
                                    <div className='mt-2 text-red-600'>{errors.password}</div>
                                </div>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className={`block uppercase text-xs font-bold mb-2 ${
                                            errors.confirmPassword
                                                ? 'text-red-500'
                                                : 'text-gray-700'
                                        }`}
                                        htmlFor='grid-password'
                                    >
                                        Password Confirmation
                                    </label>
                                    <input
                                        className={`border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ${
                                            errors.confirmPassword ? 'border-red-500' : ''
                                        }`}
                                        style={{ transition: 'all .15s ease' }}
                                        label='Confirm Password'
                                        placeholder='Confirm Password..'
                                        name='confirmPassword'
                                        type='password'
                                        value={values.confirmPassword}
                                        onChange={onChange}
                                        autocompletes='new-password'
                                    />
                                    <div className='mt-2 text-red-600'>
                                        {errors.confirmPassword}
                                    </div>
                                </div>

                                <div className='text-center mt-6'>
                                    <button
                                        className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 w-full'
                                        type='submit'
                                        style={{ transition: 'all .15s ease' }}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Register;
