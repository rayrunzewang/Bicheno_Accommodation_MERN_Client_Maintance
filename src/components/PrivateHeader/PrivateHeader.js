import React from 'react'
import './PrivateHeader.css'
import { Link } from 'react-router-dom'

const PrivateHeader = () => {
    return (
            <header className='private-header'>
                 <div>
                    <h1 className='private-header-title'>Bicheno Accommodation Property Management System</h1>
                </div>
                <div className='private-header-home-link-container'>
                    <Link className='private-header-home-link' to='/'>Back to HomePage</Link>
                </div>
               
            </header>

    )
}

export default PrivateHeader