import React, { useState, useEffect } from 'react'
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import PropertyEditDetail from './PropertyEditDetail';
import PropertyCreate from './PropertyCreate';
import './PropertyEdit.css';

const PropertyEdit = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/property`)
      .then(res => res.json())
      .then(data => setProperties(data.properties))
      .catch(error => console.error('error:', error));
  }, [setProperties]);

  return (
    <div>
      <div className='property-edit-area'>
        <div className='property-edit-list-container'>
          <div className='property-edit-property-list'>
            <h2>Property List</h2>
            <ul>

              {/* ------ Prevent errors when the array is empty. ------ */}
              {Array.isArray(properties) && properties.length > 0 ? (
                properties.map(property => (
                  <li className='property-edit-post' key={property._id}>
                    <NavLink className='property-edit-property-title' to={`/private/dashboard/Propertyedit/propertyeditdetail/${property._id}`}>{property.title}</NavLink>
                  </li>
                ))
              ) : (
                <p>No Accommodation Available</p>
              )}
            </ul>
          </div>
          <Link className='property-edit-create-button' to='/private/dashboard/propertyedit/'>Create New Post</Link>

        </div>
        <Routes>
          <Route path={`/`} element={<PropertyCreate />} />

          {/* ------ Prevent errors when the array is empty. ------ */}
          {Array.isArray(properties) && properties.length > 0 && properties.map(property => (
            <Route
              key={property._id}
              path={`/propertyeditdetail/${property._id}`}
              element={<PropertyEditDetail property={property._id} />}
            />
          ))}
        </Routes>
      </div>

    </div>
  )
}

export default PropertyEdit