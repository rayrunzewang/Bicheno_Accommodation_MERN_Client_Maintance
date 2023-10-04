import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';
import './PropertyEditDetail.css';

const PropertyEditDetail = (props) => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [property, setProperty] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [failMessage, setFailMessage] = useState(false);

    // 在您的代码文件中定义 getFileFromUrl 函数
function getFileFromUrl(url, filename, mimeType) {
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => new File([blob], filename, { type: mimeType }));
  }
  
  // 然后在您的 useEffect 中使用它，如下所示：
  
  useEffect(() => {
      axios.get(`${BASE_URL}/property/${props.property}`, { credentials: 'include' })
          .then(response => {
              if (response.data) {
                  setProperty(response.data); // 直接设置 property
                  const imageUrls = response.data.images.map(image => image.image_url);
                  
                  // 创建文件对象并存储在 selectedFiles 中
                  const filePromises = imageUrls.map((url, index) => {
                      return getFileFromUrl(url, `image${index}.jpg`, 'image/jpeg');
                  });
  
                  Promise.all(filePromises)
                      .then(files => {
                          setSelectedFiles(files);
                          setImagePreviews([...imageUrls]);
                          console.log(imageUrls);
                      })
                      .catch(error => console.error('Error creating files:', error));
              } else {
                  console.error('Invalid response data:', response.data);
              }
          })
          .catch(error => console.error(error));
  }, [props.property]);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles([...selectedFiles, ...files]);

        previewFiles(files);
    }

    const previewFiles = (files) => {
        const previews = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewURL = e.target.result;
                console.log(e.target.result);
                previews.push(previewURL);
                if (previews.length === files.length) {
                    setImagePreviews([...imagePreviews, ...previews]);
                }
            };
            reader.readAsDataURL(file);
        });
    }



    const handleImageDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleImageDrop = (e, targetIndex) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain');

        const updatedFiles = [...selectedFiles];
        const updatedPreviews = [...imagePreviews];

        const [draggedFile] = updatedFiles.splice(draggedIndex, 1);
        const [draggedPreview] = updatedPreviews.splice(draggedIndex, 1);

        updatedFiles.splice(targetIndex, 0, draggedFile);
        updatedPreviews.splice(targetIndex, 0, draggedPreview);

        setSelectedFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
    };

    const handleDelete = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);
        console.log(successMessage, failMessage)
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('file', file);
        });

        formData.append('title', property.title);
        formData.append('address', property.address);
        formData.append('bed', property.bed);
        formData.append('toliet', property.toliet);
        formData.append('carspace', property.carspace);
        formData.append('description', property.description);
        formData.append('link', property.link);

        axios
            .put(`${BASE_URL}/property/${props.property}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log('Property updated secessfully:', response.data);
                setSuccessMessage(true);
                setFailMessage(false);
            })
            .catch((error) => {
                console.error('Failed to update property:', error);
                setSuccessMessage(false)
                setFailMessage(true);
            });
    };

    const deleteProperty = async (propertyId) => {
        try {
            const res = await fetch(`${BASE_URL}/property/${propertyId}`, {
                method: 'DELETE',
                credential: 'include'
            })
            if (res.ok) {
                setSuccessMessage(true)
                setFailMessage(false);
            } else {
                setSuccessMessage(false)
                setFailMessage(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteProperty = async () => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            /* ------TODO: change to a better UI confirm ------ */
            try {
                await deleteProperty(props.property);
            } catch (error) {
                console.error(error)
            }
        }
    };

    if (!property) {
        return null;
    }

    return (

        <div className='property-edit-container'>
            <form className='property-edit-form' onSubmit={handleUpdate}>
                <h1>Property Update</h1>
                <div>
                    <div>
                        <input className='property-edit-title' id='property-edit-title' type="text" placeholder='Title (required*)' value={property.title} required onChange={(e) => setProperty({ ...property, title: e.target.value })} />
                    </div>
                    <div className='property-edit-facilities'>
                        <label className='required-input' htmlFor="property-edit-bed">bed</label>
                        <input className='property-edit-bed' id='property-edit-bed' type='number' min='0' value={property.bed} required onChange={(e) => setProperty({ ...property, bed: e.target.value })} />
                        <label className='required-input' htmlFor="property-edit-toliet">toliet</label>
                        <input className='property-edit-toliet' id='property-edit-toliet' type='number' min='0' value={property.toliet} required onChange={(e) => setProperty({ ...property, toliet: e.target.value })} />
                        <label className='required-input' htmlFor="property-edit-carspace">car space</label>
                        <input className='property-edit-carspace' id='property-edit-carspace' type='number' min='0' value={property.carspace} required onChange={(e) => setProperty({ ...property, carspace: e.target.value })} />
                    </div>
                    <div>
                        <input className='property-edit-address' id='property-edit-address' type="text" placeholder='Address (required*)' value={property.address} required onChange={(e) => setProperty({ ...property, address: e.target.value })} />
                    </div>
                    <div>
                        <textarea className='property-edit-link' id='property-edit-link' type="text" placeholder='Booking Link (required*)' value={property.link} cols="30" rows="10" required onChange={(e) => setProperty({ ...property, link: e.target.value })} />
                    </div>
                    <div>
                        <textarea className='property-edit-description' id='property-edit-description' type="text" placeholder='Description (required*)' value={property.description} cols="30" rows="10" required onChange={(e) => setProperty({ ...property, description: e.target.value })} />
                    </div>

                    <div className='images-edit-upload-area'
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <p className='placeholder-text'>Drop images here</p>
                    </div>
                    <p className='images-edit-selected-area-description'>
                        Sort the images below before uplodaing, with the cover image placed at the first position.</p>
                    <div className='images-edit-selected-area'>
                        <div className='images-edit-selected-area'>
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className='image-edit-div'
                                draggable
                                onDragStart={(e) => handleImageDragStart(e, index)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleImageDrop(e, index)}
                            >
                                <img className='images-edit-selected-image' src={imagePreviews[index]} alt={file.name} />
                                <button type='button' className='images-edit-selected-image-delete' onClick={() => handleDelete(index)} >
                                    &times;
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <Button label='Save' />
            </form>
            <Button onClick={handleDeleteProperty} label='Delete' />
            {successMessage && <Message message={'Updated successfully, click Ok to reload the page'} />}
            {failMessage && <Message message={'Updated failed, an error occurred'} />}
        </div>
    )
};

export default PropertyEditDetail;