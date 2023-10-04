import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layout/PublicLayout';
import PrivateLayout from './components/Layout/PrivateLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />} />
      <Route path='/public/*' element={<PublicLayout />} />
      <Route path='/private/*' element={<PrivateLayout />} />
    </Routes>
  );
}

export default App;