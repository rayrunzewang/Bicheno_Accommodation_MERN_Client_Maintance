import React, { useEffect, useState } from 'react';
import videoBg from '../assets/homepage-video.mp4';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { GoDot, GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [contact, setContact] = useState({});
    const [properties, setProperties] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState(false);
    const [failMessage, setFailMessage] = useState(false);
    const [formSending, setFormSending] = useState(false);

    useEffect(() => {
        getContact();
        getProperties();
    }, [])

    useEffect(() => {
        if (properties.length > 0) {
            setSlides(properties);
            console.log(properties[0].images[0].image_url);
        }
    }, [properties]);

    useEffect(() => {
        if (slides.length > 0) {
            console.log(slides[0]);
        }
    }, [slides]);

    /* ------ Fetch contact information ------ */
    const getContact = () => {
        fetch(`${BASE_URL}/contact`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setContact(data))
            .catch(err => console.error('Error', err))
    }

    /* ------ Fetch properties information ------ */
    const getProperties = () => {
        fetch(`${BASE_URL}/property`, { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                setProperties(data.properties); // Update to access 'properties' field in response
            })
            .catch((error) => console.error('Properties Fetch Error:', error));
    };

    /* ------ Handle carousel slide change ------ */
    const handleSlideChange = (newIndex) => {
        setCurrentIndex(newIndex);
    };

    /* ------ Go to a specific slide ------ */
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    /* ------ Handle form input changes ------ */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    /* ------ Handle form submission ------ */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSending(true);
        console.log(formData);
        sendEmail(formData);
    };

    /* ------ Send email using data from the form ------ */
    const sendEmail = async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Email sent successfully!');
                setSuccessMessage(true);
                setFailMessage(false);
                setFormSending(false);
            } else {
                console.error('Error sending email.');
                setSuccessMessage(false)
                setFailMessage(true);
                setFormSending(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* ------ Video Background ------ */}
            <div className='home-video-container'>
                <video autoPlay loop muted playsinline className='home-video' >
                    <source src={videoBg} type='video/mp4' />
                </video>
            </div>

            {/* ------ Social Media Icons ------ */}
            <div className='home-social-media' >
                <a
                    target='_blank'
                    href={contact.facebookURL}>
                    <FacebookIcon style={{ fontSize: '50px' }} className='home-my-facebook-icon' />
                </a>
                <a
                    target='_blank'
                    href={contact.instagramURL}>
                    <InstagramIcon style={{ fontSize: '50px' }} className='home-my-instagram-icon' />
                </a>

            </div>

            {/* ------ Scroll Down Button  ------ */}
            <div>
                <a href='#scroll' className='home-scroll-down'>
                    <div className='home-scroll-down-button'>
                        <p className='home-scroll-down-detail' >
                            Scroll
                        </p>
                        <p className='home-scroll-down-detail' >
                            Down
                        </p>
                        <div className='home-scroll-down-arrow'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </a>
            </div>

            {/* ------ Banner  ------ */}
            <div className='banner'>
                <h1 className='banner-title'>
                    <em>
                        <span className='banner-bicheno'>BICHENO</span>
                        <span className='banner-accommodation'>ACCOMMODATION</span>
                    </em>
                </h1>
            </div>

            {/* ------ carousell and welcome ------ */}
            <div className='home-main' id='scroll'>
                <div className='home-carousel-container'>
                    <h2 className='home-carousel-title'>Our Accommodation</h2>

                    {slides && slides.length > 0 ? (
                    <div className='home-carousel-image-container'>
                        {slides && slides.length > 0 &&
                            <Link className='home-carousel-image-link' to={`/public/${slides[currentIndex]._id}`} >
                                <div
                                    style={{ backgroundImage: `url(${slides[currentIndex].images[0].image_url})` }}
                                    className='home-carousel-image'>
                                </div>
                            </Link>
                        }

                        {slides && slides.length > 0 && <div className='home-carousel-image-left-arrow' onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)}
                            size={30}>
                            <BsChevronCompactLeft />
                        </div>}
                        {slides && slides.length > 0 && <div className='home-carousel-image-right-arrow' onClick={() => handleSlideChange((currentIndex + 1) % slides.length)}
                            size={30}>
                            <BsChevronCompactRight />
                        </div>}
                        {console.log(slides)}

                        <div className='home-carousel-image-nav'>
                            {slides && slides.length > 0 && slides.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    onClick={() => { goToSlide(slideIndex) }}
                                    className={`home-carousel-slide`}
                                >
                                    {slideIndex === currentIndex ? <GoDotFill /> : <GoDot />}
                                </div>
                            ))}
                        </div>

                        <div className='home-carousel-description'>
                            {slides && slides.length > 0 ? (
                                <div>
                                    <Link className='home-carousel-image-link' to={`/public/${slides[currentIndex]._id}`} >
                                        <p className='home-carousel-description-title'>{slides[currentIndex].title}</p>
                                    </Link>
                                    <div className='home-carousel-description-text'>
                                        <HotelOutlinedIcon />
                                        <p>{slides[currentIndex].bed}</p>
                                        <WcRoundedIcon />
                                        <p>{slides[currentIndex].toliet}</p>
                                        <DirectionsCarOutlinedIcon />
                                        <p>{slides[currentIndex].carspace}</p>
                                    </div>
                                </div>
                            )
                                : (<p className='home-carousel-loading'>Loading...</p>)}
                        </div>
                    </div>
                    )
                    : (<p className='home-carousel-loading'>Loading...</p>)}
                </div>
                <div className='home-welcome-container'>
                    <h2 className='home-welcome-title'> Welcome to Bicheno</h2>
                    <div className='home-welcome'>
                        <p>Bicheno is a family seaside holiday town with lots to see and do, good accommodation, excellent fishing and close to wildlife.</p>
                        <br />
                        <p>There are many cafes and restaurants with diverse cultural styles in the surrounding area that offer breakfast, brunch, lunch, and dinner. Additionally, there are opportunities to enjoy oysters and local wine with a fantastic view of the sea.</p>
                    </div>
                </div>
            </div>

            {/* ------ contact form ------ */}
            <div className='home-contact-form-container'>
                <h2 className='home-contact-form-title'>Enquiry Form</h2>
                <form className='home-contact-form' onSubmit={handleSubmit}>
                    <label className='required-input' htmlFor="home-contact-form-name">Name:</label>
                    <input type="text" id="home-contact-form-name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="home-contact-form-mobile" name="mobile" placeholder='optional' value={formData.mobile} onChange={handleChange} />

                    <label className='required-input' htmlFor="email">Email:</label>
                    <input type="email" id="home-contact-form-email" name="email" value={formData.email} onChange={handleChange} required />

                    <label className='required-input' htmlFor="message">Message:</label>
                    <textarea
                        id="home-contact-form-message"
                        name="message"
                        value={formData.message}
                        rows={10}
                        onChange={handleChange}
                        required />
                    {failMessage && <p className='fail-message'>Failed sending enquiry, an error occurred</p>}
                    {formSending && <p>Sending your form, please wait a moment...</p>}
                    <Button
                        label='Send Enquiry'
                        onClick={() => {
                            setFailMessage(false);
                        }}
                    />
                </form>
                {successMessage && <Message message={'Email send successfully, click Ok to reload the page'} />}
            </div>
        </div >
    )
}

export default Home;