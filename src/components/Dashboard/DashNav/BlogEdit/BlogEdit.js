import React, { useState, useEffect } from 'react'
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import BlogEditDetail from './BlogEditDetail';
import BlogCreate from './BlogCreate';
import './BlogEdit.css';

const BlogEdit = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  {/* ------ fetching Post List ------ */}
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('An error occurred while retrieving the list of blog articles.:', error));
  }, [setPosts]);

  return (
    <div className='blog-edit-area'>
      <div className='blog-edit-container'>
        
        {/* ------ Blog Post List ------ */}

        <div className='blog-edit-article-list'>
          <h2>Article List</h2>
          <ul>
            {posts.map(post => (
              <li className='blog-edit-post' key={post._id}>
                <NavLink className='blog-edit-post-title' to={`/private/dashboard/blogedit/blogeditdetail/${post._id}`}>{post.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Link className='blog-edit-create-button' to='/private/dashboard/blogedit/'>Create New Post</Link>
      </div>

              {/* ------ Blog Edit Page Component ------ */}
      <Routes>
        <Route path={`/`} element={<BlogCreate />} />
        {posts.map(post => {
          return <Route
            key={post._id}
            path={`/blogeditdetail/${post._id}`}
            element={<BlogEditDetail postId={post._id} />} // Pass postId as a prop
          />
        })}
      </Routes>
    </div>
  )
}

export default BlogEdit