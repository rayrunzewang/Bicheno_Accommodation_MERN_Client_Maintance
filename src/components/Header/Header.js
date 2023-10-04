import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from '../../pages/Home.js';
import Blog from '../../pages/Blog';
import Accommodation from '../../pages/Accommodation';
import logo from '../../assets/logo.jpg';
import logoBackground from '../../assets/logo-background.jpg';
import PropertyPage from '../../pages/PropertyPage/PropertyPage';
import BlogDetailPage from '../../pages/BlogDetailPage/BlogDetailPage';
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import './Header.css'

const Header = () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [posts, setPosts] = useState([]);
    const [properties, setProperties] = useState([]);
    const [scrolling, setScrolling] = useState(false);
    const [isNavVisible, setNavVisibility] = useState(false);
    const toggleNavVisibility = () => {
        setNavVisibility(!isNavVisible);
    };

    const handleScroll = () => {
        const scrollTop = window.scrollY;

        if (scrollTop > 100) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useState(() => {
        fetch(`${BASE_URL}/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Blog Posts Fetch Error:', error))
    }, []);

    useState(() => {
        fetch(`${BASE_URL}/property`)
            .then(res => res.json())
            .then(data => setProperties(data.properties))
            .catch(error => console.error('Properties Fetch Error:', error))
    }, []);
    
    return (
        <div>
            {/* header */}
            <header className={`page-header ${scrolling ? 'scrolling' : ''}`} >
                <div className='logo-container'>
                    <img className='nav-logo' src={logo} alt='Bicheno Accommodation Business Logo' />
                </div>
                {/* nav */}
                <nav>
                    <ul className='user-container'>
                        <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
                        <li><NavLink className='nav-link' to='/public/blog'>Blog</NavLink></li>
                        <li><NavLink className='nav-link' to='/public/accommodation'>Accommodation</NavLink></li>
                        <li><a
                            className='nav-link'
                            href='https://bookings8.rmscloud.com/Search/Index/f1e238f9670c6dcf/1/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >Booking</a></li>
                    </ul>
                </nav>
            </header>

            {/* ------ Phone Screen Image Background ------ */}
            <div className='image-background-phone-screen'>
                <img className='home-background-image' src={logoBackground} alt="logoBackground" />
            </div>

            {/* ------ phone screen nav and toggle ------ */}
            <div className='nav-phone-screen-container'>
                <div className={isNavVisible ? 'nav-phone-screen' : 'nav-phone-screen hidden'}>
                    <ul>
                        <li><NavLink className='phone-screen-link' onClick={toggleNavVisibility} to='/'>Home</NavLink></li>
                        <li><NavLink className='phone-screen-link' onClick={toggleNavVisibility} to='/public/blog'>Blog</NavLink></li>
                        <li><NavLink className='phone-screen-link' onClick={toggleNavVisibility} to='/public/accommodation'>Accommodation</NavLink></li>
                        <li><a
                            onClick={toggleNavVisibility}
                            className='phone-screen-link'
                            href='https://bookings8.rmscloud.com/Search/Index/f1e238f9670c6dcf/1/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >Booking</a></li>
                    </ul>
                </div>
            </div>
            <div className='menu-phone-screen'>
                <div className='menu-toggle-button' onClick={toggleNavVisibility}>{isNavVisible ? <IoClose /> : <FiMenu />} </div>
            </div>

            {/* route */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/blog/*' element={<Blog />} />
                <Route path='/accommodation' element={<Accommodation />} />
                {posts.map(post => {
                    return <Route key={post._id} path={`/${post._id}`} element={<BlogDetailPage postId={post._id} />} />
                })}
                {Array.isArray(properties) && properties.length > 0 && properties.map(property => (
                    <Route key={property._id} path={`/${property._id}`} element={<PropertyPage property={property} />} />
                ))}
            </Routes>
        </div>
    );
};

export default Header;