import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { GoDot, GoDotFill } from 'react-icons/go';
import jsPDF from 'jspdf';
import { getPdfComponentContent } from './PdfComponent';
import './PropertyPage.css';

const PropertyPage = (props) => {
    const [property, setProperty] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState('');
    const [link, setLink] = useState('');
    const id = props.property._id
    
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useState(() => {
        fetch(`${BASE_URL}/property/${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data)
                setSlides(data.images);
                setLink(data.link);
                console.log(data.link);
            })
            .catch(error => console.error('Properties Fetch Error:', error))
    }, []);

    // console.log(props)

    const handleSlideChange = (newIndex) => {
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    const generatePDF = () => {
        const content = getPdfComponentContent(property);

        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.style.top = '-9999px';
        document.body.appendChild(tempElement);

        // html2canvas(tempElement, { useCORS: true }).then(canvas => {
        //     const imgData = canvas.toDataURL('image/jpeg');
        //     const pdf = new jsPDF();
        //     const imgProps = pdf.getImageProperties(imgData);
        //     const pdfWidth = pdf.internal.pageSize.getWidth();
        //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        //     pdf.save('report.pdf');

        //     document.body.removeChild(tempElement);
        // });

        var doc = new jsPDF("portrait", "pt", "a4");

        doc.html(content, {
            html2canvas: {
                quality: 1
            },
            callback: function (pdf) {
                pdf.save(`document.pdf`);
            },
            margin: [20, 20, 20, 20],
            autoPaging: 'text'
        });
    };

    /* ------ deprecated: Method of generating PDF on the backend server using PDFkit and downloading. ------ */
    // const handleDownloadBrochure = (property) => {
    //     const pdfDoc = generatePdfContent(property);
    //     if (!pdfDoc) {
    //         console.error('Failed to generate PDF.');
    //         return; // or handle the error in an appropriate way
    //     }
    //     const pdfBlob = new Blob([pdfDoc], { type: 'application/pdf' });
    //     console.log(pdfBlob)
    //     saveAs(pdfBlob, 'property_info.pdf');

    // };

    // const handleDownloadBrochure = async (data) => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/generate-pdf`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         if (response.ok) {
    //             const blob = await response.blob();
    //             const url = URL.createObjectURL(blob);

    //             // Create a link element
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.download = 'property_info.pdf';

    //             // Append the link to the body
    //             document.body.appendChild(link);

    //             // Trigger the download
    //             link.click();

    //             // Remove the link from the document
    //             document.body.removeChild(link);
    //             console.log('PDF request sent successfully!');
    //         } else {
    //             console.error('Error sending PDF request .');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    if (!property) {
        return <div>Data Loading...</div>
    }
    return (
        <>
            <Link className='back-button' to='/public/accommodation'>Back To Accommodations</Link>
            <div className='property-detail-page'>
                <h2 className='property-detail-title'>{property.title}</h2>
                <p className='property-detail-address'>{property.address}</p>

                <div className='property-detial-image-container'>
                    {slides && <div
                        style={{ backgroundImage: `url(${property.images[currentIndex].image_url})` }}
                        className='property-detail-image'>
                    </div>
                    }
                    {slides &&
                    <div
                        className='property-detial-image-left-arrow'
                        onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)}
                        size={30}
                    >
                        <BsChevronCompactLeft />
                    </div>
                    }
                    {slides &&
                    <div
                        className='property-detial-image-right-arrow'
                        onClick={() => handleSlideChange((currentIndex + 1) % slides.length)}
                        size={30}
                    >
                        <BsChevronCompactRight />
                    </div>
                    }

                    <div className='property-detial-image-nav'>
                        {slides && slides.length > 0 && slides.map((slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => { goToSlide(slideIndex) }}
                                className={`property-detial-image-slide`}
                            >
                                {slideIndex === currentIndex ? <GoDotFill /> : <GoDot />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='property-detail-button'>
                    <button onClick={generatePDF} type="button">Export PDF</button>
                    <div className='property-detail-book-btn'>
                        <a className='property-detail-book-link' target='_blank' href={link}>Book Now</a>
                    </div>
                </div>
                <div className='property-detail-facilities-container'>
                    <p className='property-detail-facilities'>Bed: {property.bed}, Toliet: {property.toliet}, Car Space: {property.carspace}</p>
                </div>
                <div className='property-detail-description-container'>
                    <pre className='property-detail-content'>{property.description}</pre>
                </div>
            </div>

        </>
    )
}

export default PropertyPage