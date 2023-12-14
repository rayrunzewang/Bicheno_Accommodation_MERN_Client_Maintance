import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';
import './ContactEdit.css'

const ContactEdit = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [contact, setContact] = useState({
    phoneNumber: '',
    alternativePhoneNumber: '',
    email: '',
    address: '',
    facebookURL: '',
    instagramURL: '',
  });
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    alternativePhoneNumber: '',
    email: '',
    address: '',
    facebookURL: '',
    instagramURL: '',
  });
  const [isSaved, setIsSaved] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    GetContact();
  }, [])

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const GetContact = () => {
    fetch(`${BASE_URL}/contact`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error('Error: ', err),)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email || contact.email)) {
      setEmailError('Invalid email format');
      return;
    }

    const formDataToSubmit = {
      phoneNumber: formData.phoneNumber || contact.phoneNumber,
      alternativePhoneNumber: formData.alternativePhoneNumber || contact.alternativePhoneNumber,
      email: formData.email || contact.email,
      address: formData.address || contact.address,
      facebookURL: formData.facebookURL || contact.facebookURL,
      instagramURL: formData.instagramURL || contact.instagramURL,
    };

    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formDataToSubmit),
      });

      if (response.ok) {
        setIsSaved(true);
        setIsError(false);
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      setIsError(true);//try test contactEdit
      console.error('Error:', error);
    }
  };

  return (
    <div className='contact-edit'>

      {/* ------ Contact Edit Form ------ */}
      <form className='contact-edit-container' onSubmit={handleSubmit}>
        <div>
          <label  className='required-input' htmlFor='phoneNumber'>Phone Number 1:</label>
        </div>
        <div>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            defaultValue={contact.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label  className='required-input' htmlFor='alternativePhoneNumber'>Phone Number 2:</label>
        </div>
        <div>
          <input
            type='text'
            id='alternativePhoneNumber'
            name='alternativePhoneNumber'
            defaultValue={contact.alternativePhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label  className='required-input' htmlFor='address'>Address:</label>
        </div>
        <div>
          <input
            type='text'
            id='address'
            name='address'
            defaultValue={contact.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label  className='required-input' htmlFor='email'>Email:</label>
        </div>
        <div>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label  className='required-input' htmlFor='facebookURL'>FacebookURL:</label>
        </div>
        <div>
          <input
            type='text'
            id='facebookURL'
            name='facebookURL'
            defaultValue={contact.facebookURL}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label  className='required-input' htmlFor='instagramURL'>InstagramURL:</label>
        </div>
        <div>
          <input
            type='text'
            id='instagramURL'
            name='instagramURL'
            defaultValue={contact.instagramURL}
            onChange={handleChange}
            required
          />
        </div>
        {emailError && <p className="fail-message">{emailError}</p>}
        {isError && <p className='fail-message'> An Error happened</p> }
        <Button type='submit' label='Save' />
        {isSaved && <Message message='Data saved successfully' />}
      </form>
    </div>

  )
}

export default ContactEdit