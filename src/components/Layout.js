import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/layout.scss';

import { AuthProvider } from '../contex/auth';
import AuthRoute from '../util/AuthRoute';

import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SinglePost from '../pages/SinglePost';
import UserProfile from '../pages/UserProfile';

const Layout = ({ pageTitle }) => {
    return (
        <AuthProvider>
            <div className='min-h-screen flex flex-col'>
                <title>Bohdan Chornopolskyi: {pageTitle}</title>
                <NavBar />
                <main className='flex flex-col items-center flex-grow bg-gray-100'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <AuthRoute exact path='/login' component={Login} />
                        <AuthRoute exact path='/register' component={Register} />
                        <Route exact path='/post/:postId' component={SinglePost} />
                        <Route exact path='/user/:username' component={UserProfile} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default Layout;
