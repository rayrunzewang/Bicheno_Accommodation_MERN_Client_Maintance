import React, { useState, useEffect } from 'react'
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';
import './BlogEditDetail.css';
import './BlogCreate.css';

const BlogEditDetail = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [posts, setPosts] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });
  const postId = props.postId

  useEffect(() => {
    fetch(`${BASE_URL}/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    /* ------ Submit Form ------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      title: formData.title || posts.title,
      author: formData.author || posts.author,
      content: formData.content || posts.content,
    };

    try {
      const response = await fetch(`${BASE_URL}/posts/${posts._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formDataToSubmit),
      });
      console.log(formData);

      if (response.ok) {
        setIsSaved(true)
        setIsError(false); 
      } else {
        setIsError(true); 
        console.error('Failed to submit data');
      }
    } catch (error) {
      setIsError(true); 
      console.error('Error:', error);
    }
  };

  /* ------ delete blog post ------ */
  const deletePost = async (postId, prevPosts, setPosts) => {
    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!res.ok) {
        throw new Error('Delete post error');
      }
      setIsDeleted(true);
    } catch (error) {
      setIsError(true); 
      console.error('Delete post error:', error)
    }
  }

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {//change to a better UI confirm
        try {
            await deletePost(postId);
        } catch (error) {
            console.error(error)
        }
    }
};

  return (
    <div className='blog-edit-detail'>
      
      {/* ------ Blog Edit Form ------ */}
      <form className='blog-edit-detail-form' onSubmit={handleSubmit}>
        <div>
          <label className='required-input' htmlFor="title">title: </label>
        </div>
        <div>
          <textarea
            rows="2"
            cols="50"
            type="text"
            id='title'
            name='title'
            defaultValue={posts.title}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label className='required-input' htmlFor="author">author: </label>
        </div>
        <div>
          <textarea
            rows="2"
            cols="50"
            type="text"
            id='author'
            name='author'
            defaultValue={posts.author}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label className='required-input' htmlFor="content">content: </label>
        </div>
        <div>
          <textarea
            rows="10"
            cols="50"
            type="text"
            id='content'
            name='content'
            defaultValue={posts.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <Button label='Save' />
      </form>
      {isError && <p className='fail-message'>An error occurred, please try again latter</p>} 

      <Button onClick={() => handleDeletePost()} label='Delete' />

      {/* Prompt Messages */}
      {isSaved && <Message message='Data saved successfully'  />}
      {isDeleted && <Message message='Post deleted successfully'  />}
    </div>
  )
}

export default BlogEditDetail