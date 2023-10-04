import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PrivateHeader from '../PrivateHeader/PrivateHeader'
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import { useUser } from '../../UserContext';

const PrivateLayout = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${BASE_URL}/check-session`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        console.log('检查session返回data', data)
        console.log('检查session返回data.user', data.user)

        if (data.user) {
          const currentPath = window.location.pathname;
          if (currentPath.startsWith('/private/dashboard')) {
            navigate(currentPath);
          } else {
            navigate('/private/dashboard');
          }
        } else {
          navigate('/private/login');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className='PrivateLayout'>
      <PrivateHeader />
      <div className='private-container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/' element={user ? <Navigate to='/dashboard' /> : <Navigate to='/private/login' />} />
        </Routes>
      </div>
    </div>)
}

export default PrivateLayout