import React from 'react'
import Header from '../Header/Header';
import FloatingBox from '../FloatingBox/FloatingBox';
import Footer from '../Footer/Footer';

const PublicLayout = () => {
    return (
        <div className='PublicLayout'>
            <Header />
            <FloatingBox />
            <Footer />
        </div>)
}

export default PublicLayout