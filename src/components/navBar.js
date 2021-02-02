import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../contex/auth';

const NavBar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navBar = user ? (
        <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-200'>
            <div className='container px-4 mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
                    <Link
                        className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black'
                        to='/'
                    >
                        Social Media App
                    </Link>
                    <button
                        className='text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
                        type='button'
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <svg
                            className='fill-current h-4 w-4'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <title>Menu</title>
                            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                        </svg>
                    </button>
                </div>
                <div
                    className={
                        'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')
                    }
                    id='example-navbar-danger'
                >
                    <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
                        <li className='nav-item'>
                            <NavLink
                                exact={true}
                                className='px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-black hover:opacity-75'
                                to='/'
                                activeClassName='text-gray-600'
                            >
                                <span className='ml-2'>Home</span>
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                className='px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-black hover:opacity-75'
                                to={`/user/${user.username}`}
                                activeClassName='text-gray-600'
                            >
                                <span className='ml-2'>{user.username}</span>
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <button
                                className='px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-black hover:opacity-75'
                                onClick={logout}
                                activeClassName='text-gray-600'
                            >
                                <span className='ml-2'>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    ) : (
        <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-200'>
            <div className='container px-4 mx-4 flex flex-wrap items-center justify-between'>
                <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
                    <Link
                        className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black'
                        to='/'
                    >
                        Social Media App
                    </Link>
                    <button
                        className='text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
                        type='button'
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <svg
                            className='fill-current h-4 w-4'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <title>Menu</title>
                            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                        </svg>
                    </button>
                </div>
                <div
                    className={
                        'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')
                    }
                    id='example-navbar-danger'
                >
                    <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
                        <li className='nav-item'>
                            <NavLink
                                exact={true}
                                className='px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-black hover:opacity-75'
                                to='/'
                                activeClassName='text-gray-600'
                            >
                                <span className='ml-2'>Home</span>
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                className='px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-black hover:opacity-75'
                                to='/register'
                                activeClassName='text-gray-600'
                            >
                                <span className='ml-2'>Register</span>
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                className='px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-black hover:opacity-75'
                                to='/login'
                                activeClassName='text-gray-600'
                            >
                                <span className='ml-2'>Login</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

    return navBar;
};

export default NavBar;
