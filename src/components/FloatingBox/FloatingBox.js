import React, { useEffect, useState } from 'react';
import './FloatingBox.css';

const FloatingBox = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [contact, setContact] = useState({});

  useEffect(() => {
    GetContact();
  }, [])

  const GetContact = () => {
    fetch(`${BASE_URL}/contact`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setContact(data))
        .catch(err => console.error('Error: ', err),)
  }
  
  return (
    <div className='floating-box'>
      <div className='floating-box-contact'>
        <p className='floating-box-contact-title'>Call Now</p>
        <a className='floating-box-phone' href={`tel:${(contact.phoneNumber)}`}>{contact.phoneNumber}</a>
        {/* <a className='floating-box-phone' href={`tel:${(contact.alternativePhoneNumber)}`}>{contact.alternativePhoneNumber}</a> */}
      </div>
      <div className='floating-box-book'>
        <a className='floating-box-book-btn' target='_blank' href='https://freycinetholidayhouses.com.au/availabilities/'>Book Now</a>
      </div>
    </div>
  );
}

export default FloatingBox;