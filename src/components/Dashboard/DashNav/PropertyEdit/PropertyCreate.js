import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';
import './PropertyCreate.css';

function PropertiesEdit() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  /* ------ selectedFiles is used to store the files selected by the user. ------ */
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [bed, setBed] = useState('');
  const [toliet, setToliet] = useState('');
  const [carspace, setCarSpace] = useState('');
  const [message, setMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusMessage, setUploadStatusMessage] = useState('');

  /*------------ deprecated:handleFileChange for Upload Button  ------------
   const handleFileChange = (e) => {
     const files = Array.from(e.target.files);
     setSelectedFiles([...selectedFiles, ...files]);
     previewFiles(files);
   };*/

  /*  ------ The handleDrop function is used to handle drag-and-drop events. ------
  When a user drops a file, this function is triggered to add the selected file(s) to selectedFiles 
  and call the previewFiles function to preview them in the preview area below the drop zone.  */

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]); //Merge selected files and newly drop files
    previewFiles(files); //preview
  };


  /* ------The function previewFiles is used to preview files in the preview area. ------
  It takes a file array as a parameter, 
  reads the file content using FileReader, 
  and adds the preview URL to imagePreviews.*/

  const previewFiles = (files) => {
    const previews = [];
    
    function readFile(index) {
        if (index >= files.length) {
            setImagePreviews([...imagePreviews, ...previews]);
            return;
        }

        const file = files[index];
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewURL = e.target.result;
            previews.push(previewURL);
            readFile(index + 1);
        };
        reader.readAsDataURL(file);
    }

    readFile(0);
};

  /* This handleDelete function is used to update selectedFiles and imagePreviews after clicking to delete a specific image. */
  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  /* Set the data type of the dragged data to text and set the value to the current index or identifier of the dragged element, enabling identification of the dragged element at the drop target when the dragging starts.*/

  const handleImageDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  /* ------ The handleImageDrop function is used to handle image drag-and-drop events in the image preview area.
 It takes the event object and target index as parameters and is used to insert dragged images. */

  const handleImageDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain'); //The main purpose of this line of code is to retrieve the value of the dragged data from the drag-and-drop operation. This value is the index or identifier previously set using e.dataTransfer.setData('text/plain', index).
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    const [draggedFile] = updatedFiles.splice(draggedIndex, 1);
    const [draggedPreview] = updatedPreviews.splice(draggedIndex, 1);

    updatedFiles.splice(targetIndex, 0, draggedFile);
    updatedPreviews.splice(targetIndex, 0, draggedPreview);

    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  /* ------ The function handleUpload is used to handle upload events. ------
   It creates a FormData object and adds selected files, title, address, description, 
   and other information to the FormData. 
   Then, it utilizes axios to send a POST request to upload the data. */

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true); 
    setUploadStatusMessage('Uploading..., please do not refresh'); 
    const formData = new FormData();
    // const imageFiles = [];

    selectedFiles.forEach((file) => {
      console.log(file)
      formData.append('file', file);
      // imageFiles.push({
      //   image_name: file.name,
      //   image_url: URL.createObjectURL(file),
      // });
    });

    // console.log(imageFiles)

    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('bed', bed);
    formData.append('toliet', toliet);
    formData.append('carspace', carspace);
    // formData.append('images', JSON.stringify(imageFiles));

    axios
      .post(`${BASE_URL}/property`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        credentials: 'include',
      })
      .then((response) => {
        setIsUploading(false); 

        if (response.status === 200 || response.status === 201) {
          
          setSelectedFiles([]);
          setTitle('');
          setAddress('');
          setDescription('');
          setLink('');
          setBed('');
          setToliet('');
          setCarSpace('');
          setImagePreviews([]);
          setMessage('Upload successfully');
          setUploadStatusMessage('Upload successfully'); // 上传成功时设置提示消息
          setIsSaved(true);
          setIsError(false);
        } else {
          setIsSaved(false);
          setIsError(true);
          setIsUploading(false); 
          setUploadStatusMessage('Upload failed, please try again later'); // 上传失败时设置提示消息
          console.error('Error: Request was not successful. Status code:', response.status);
        }
      })
      .catch((error) => {
        setIsUploading(false); 
        setIsError(true);
        setUploadStatusMessage('Upload failed, please try again later'); // 上传失败时设置提示消息
        console.error('Error: Request failed:', error);
      });
  };

  return (
    <div className='property-create-container'>
      <form className='property-create-form' onSubmit={handleUpload}>
        <p>/*Create a new property or select an existing one to edit from the left.</p>
        <h1>New Property Launch</h1>
        <div>
          <input className='property-title-input' type="text" placeholder="Title (required*)" value={title} required onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='property-create-facilities'>

          <label className='required-input' htmlFor="property-create-bed">bed</label>
          <input className='property-create-bed' type="number" id='property-create-bed' min="1" value={bed} required onChange={(e) => setBed(e.target.value)} />

          <label className='required-input' htmlFor="property-create-toliet">toliet</label>
          <input className='property-create-toliet' type="number" id='property-create-toliet' min="0" value={toliet} required onChange={(e) => setToliet(e.target.value)} />

          <label className='required-input' htmlFor="property-create-carspace">car space</label>
          <input className='property-create-carspace' type="number" id='property-create-carspace' min="0" value={carspace} required onChange={(e) => setCarSpace(e.target.value)} />
        </div>
        <input className='property-address-input' type="text" placeholder="Address (required*)" value={address} name="address" id="address" required onChange={(e) => setAddress(e.target.value)}></input>
        <textarea className='property-link' placeholder="Booking Link (required*)" value={link} name="link" id="link" cols="30" rows="1" required onChange={(e) => setLink(e.target.value)}></textarea>
        <textarea className='property-description' placeholder="Description (required*)" value={description} name="description" id="description" cols="30" rows="20" required onChange={(e) => setDescription(e.target.value)}></textarea>

        {/* ------------ Upload Button *deprecated ------------ */}

        {/* <div>
          <label htmlFor="property-cover-image-upload">choose cover Image</label>
          <input type="file" name='property-images-upload' id='property-cover-image-upload' multiple onChange={handleFileChange} />
        </div>
        <div></div>
        <label htmlFor="property-other-images-upload">choose other Images</label>
        <input type="file" name='property-images-upload' id='property-other-images-upload' multiple onChange={handleFileChange} /> */}

        <div className='images-upload-area'
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className='placeholder-text'>Drop images here</p>
        </div>
        <p className='images-selected-area-description'>Sort the images below before uploading, with the cover image placed at the first position.</p>
        <div className='images-selected-area'>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className='image-div'
              draggable
              onDragStart={(e) => handleImageDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleImageDrop(e, index)}
            >
              <img className='images-selected-image' src={imagePreviews[index]} alt={file.name} />
              <button type='button' className='images-selected-image-delete'
                onClick={() => handleDelete(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        {isUploading && <p className='success-message'>{uploadStatusMessage}</p> }
        {isError && !isUploading && <p className='fail-message'>{uploadStatusMessage}</p> }
        <Button label='Upload' />
      </form>
      {isSaved && <Message message={'Updated successfully, click Ok to reload the page'} />}
    </div>
  );
}

export default PropertiesEdit;
