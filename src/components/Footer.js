import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faFacebook, faTwitter, faInstagram);

const Footer = () => {
    return (
        <footer className='flex items-center justify-center bg-gray-300 py-6 px-12 h-10'>
            <h1 className='font-mono font-semibold text-black md:mr-6 mr-3'>My socials</h1>
            <a
                className='fill-current text-black md:mr-6 mr-3'
                href='//www.instagram.com/shmodya/'
                target='_blank'
                rel='noreferrer'
            >
                <FontAwesomeIcon icon={faInstagram} size='2x'></FontAwesomeIcon>
            </a>
            <a
                className='fill-current text-black md:mr-6 mr-3'
                href='//twitter.com/chornopolskiy/'
                target='_blank'
                rel='noreferrer'
            >
                <FontAwesomeIcon icon={faTwitter} size='2x'></FontAwesomeIcon>
            </a>
            <a
                className='fill-current text-black md:mr-6 mr-3'
                href='//github.com/bohdanchornopolskyi/'
                target='_blank'
                rel='noreferrer'
            >
                <FontAwesomeIcon icon={faGithub} size='2x'></FontAwesomeIcon>
            </a>
            <a
                className='fill-current text-black md:mr-6 mr-3'
                href='//www.facebook.com/bogdan.chornopolskiy/'
                target='_blank'
                rel='noreferrer'
            >
                <FontAwesomeIcon icon={faFacebook} size='2x'></FontAwesomeIcon>
            </a>
        </footer>
    );
};

export default Footer;
