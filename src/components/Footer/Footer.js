import React, { useEffect, useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Routes, } from 'react-router-dom';


const Footer = () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [contact, setContact] = useState({});

    useEffect(() => {
        GetContact();
    }, [])

    const GetContact = () => {
        fetch(`${BASE_URL}/contact`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setContact(data))
            .catch(err => console.error('Error', err))
    }

    function formatPhoneNumber(number) {
        const trimmedNumber = number.replace(/^0+/, '');
        const formatedNumber = '61' + trimmedNumber;
        return formatedNumber;
    }

    return (
        <>
            <footer>
                <div className='footer-container'>
                    <div className='column'>
                        <address>
                            <h4>Contact</h4>
                            <p>Phone: <a href='tel:{formatPhoneNumber(contact.phoneNumber)}'>{contact.phoneNumber}</a></p>
                            <p>Phone: <a href='tel:{formatPhoneNumber(contact.alternativePhoneNumber)}'>{contact.alternativePhoneNumber}</a></p>
                            <p>Email: {contact.email}</p>
                            <p>Address: {contact.address}</p>
                        </address>
                    </div>
                    <div className='column'>
                        <h4>Follow us</h4>
                        <p><a href={contact.facebookURL}>Facebook</a></p>
                        <p> <a href={contact.instagramURL}>Instagram</a></p>
                    </div>
                    <div className='column'>
                        <h4>Team</h4>
                        <p>
                            <Link to='/private'>Staff Login</Link>
                        </p>
                    </div>
                </div>
                <p className='baysidetechstudio'>&copy; Copyright 2023 <a target='_blank' href='https://www.baysidetechstudio.com'>Bayside Tech Studio</a>. All Rights Reserved.</p>

            </footer>
            <div>
                <Routes>
                    {/* <Route path='/private' element={<Navigate to='/private' />} /> */}
                </Routes>
            </div>
        </>

    )
}

export default Footer