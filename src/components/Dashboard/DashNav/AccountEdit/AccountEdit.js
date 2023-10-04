import React, { useState } from 'react'
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';
import './AccountEdit.css'

const AccountEdit = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const username = 'username';
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);

    // Check if newPassword and confirmNewPassword match
    const passwordsMatch = newPassword === confirmPassword;
    setPasswordMatch(passwordsMatch);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmedPassword = e.target.value;
    setConfirmPassword(confirmedPassword);

    // Check if newPassword and confirmNewPassword match
    const passwordsMatch = newPassword === confirmedPassword;
    setPasswordMatch(passwordsMatch);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const passwordsMatch = newPassword === confirmPassword;
    setPasswordMatch(passwordsMatch);

    if (!passwordsMatch) {
      alert('New password and confirm password do not match.');
      return; // Stop further execution if passwords don't match
    }

    try {      
      const response = await fetch(`${BASE_URL}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setSuccessMessage(true)
      } else {
        const errorData = await response.json();
        alert(`Password change failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Password change failed:', error);
      alert('Password change failed');
    }

    // Clear input fields after submission
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className='account-edit-container'>
      <form className='account-edit-form' onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="account-edit-username">username</label>
          <input type="text" className='account-edit-username' id='account-edit-username' value='username' readOnly />
        </div>
        <div>
          <label className='required-input' htmlFor="account-edit-old-password">Current Password</label>
          <input type="password" className='account-edit-old-password' id='account-edit-old-password' required onChange={e => setOldPassword(e.target.value)} autoComplete="off" />
        </div>
        <div>
          <label className='required-input' htmlFor="account-edit-new-password">New Password</label>
          <input type="password" className='account-edit-new-password' id='account-edit-new-password' required onChange={handleNewPasswordChange} />
        </div>
        <div>
          <label className='required-input' htmlFor="account-edit-new-password">Confirm New Password</label>
          <input
            type="password"
            className={`account-edit-confirm-password `}
            id='account-edit-confirm-password'
            required onChange={handleConfirmPasswordChange} />
          <span className={`password-match-indicator ${passwordMatch ? 'match-text' : 'no-match-text'}`}>
            {confirmPassword === '' ? '' : (passwordMatch ? 'Passwords match' : 'Passwords do not match')}
          </span>
        </div>

        <Button label='Confirm' />
      </form>
      {successMessage && <Message message={'Password has been successfully changed.'}/>}

    </div>
  )
}

export default AccountEdit