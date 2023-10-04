import React from 'react';
import { renderToString } from 'react-dom/server';
import logoImage from '../../assets/logo.jpg'
import './PdfComponent.css'

const PdfComponent = (props) => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const property = props.property;
    return (
        <div className='pdf-page'>
                <h1 className='pdf-page-header'>Bicheno Accommodation</h1>
                <h2 className='pdf-page-title'>{property.title}</h2>
                <p className='pdf-page-address'>{property.address}</p>
                <p className='pdf-page-facilities'>Bed:{property.bed}, Toliet:{property.tolie}, Car Space:{property.carspace}</p>
                
                {!Array.isArray(property.images) || property.images.length === 0 ? (
                    <p>No accommodations available.</p>
                ) : (
                    <div className='pdf-image-container'>
                        {property.images.map((image, index) => (
                            <div className='image-item-container' key={index}>
                                <img
                                    src={`${image.image_url}`}
                                    alt={`${image.image_name}`}
                                    className='image-item'
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className='pdf-main'>

                    <div className='pdf-page-logo-container'>
                        <img className='pdf-page-logo-image' src={logoImage} alt="bicheno accommodation logo" />
                    </div>
                    <div className='pdf-page-contact-detail'>
                        <h3 className='pdf-page-contact-detail-title'>Bicheno Accommodation</h3>
                        <p>Email: accommodation@bicheno.com.au</p>
                        <p>Contact: 03 6375 1400</p>
                        <p>Address: 73b Burgess St, Bicheno TAS 7215</p>
                    </div>
                    {/* TODO: fetching business email, address, contact */}

                </div>
                <pre className='pdf-page-description'>{property.description}</pre>
                <p className='pdf-page-disclaimer'><strong>Disclaimer:</strong> All information contained therein is gathered from relevant third parties sources. We cannot guarantee or give any warranty about the information provided. Interested parties must rely solely on their own enquiries.</p>
        </div>
    );
};

// Export a function to get the HTML content as a string
export const getPdfComponentContent = (property) => {
    return renderToString(<PdfComponent property={property} />);
};
