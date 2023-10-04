import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import DashNav from './DashNav/DashNav';
import ContactEdit from './DashNav/ContactEdit/ContactEdit';
import AccountEdit from './DashNav/AccountEdit/AccountEdit.js';
import HomepageEdit from './DashNav/HomepageEdit/HomepageEdit';
import BlogEdit from './DashNav/BlogEdit/BlogEdit';
import PropertyEdit from './DashNav/PropertyEdit/PropertyEdit';
import './Dashboard.css';

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);

    // ------ Clear login status ------
    localStorage.removeItem('loginStatus');

    // ------ Navigate back to the login page ------
    navigate('/private/login');
    fetch(BASE_URL + '/logout', { method: 'POST', credentials: 'include' })
      .then(response => {
        if (response.ok) {
          console.log('Logout Successfully');
        } else {
          console.error('Logout failed');
        }

      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <>
      <div className='dashboard'>
        <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
        <DashNav />
      </div>

      <div>
        <Routes>
          <Route path='/contactedit' element={<ContactEdit />} ></Route>
          <Route path='/accountedit' element={<AccountEdit />} ></Route>
          <Route path='/homepageedit' element={<HomepageEdit />} ></Route>
          <Route path='/blogedit/*' element={<BlogEdit />} ></Route>
          <Route path='/propertyedit/*' element={<PropertyEdit />} ></Route>
        </Routes>
      </div>
    </>
  )
}

export default Dashboard