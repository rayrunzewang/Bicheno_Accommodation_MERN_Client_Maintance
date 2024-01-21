import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Blog.css';

function Blog() {
    // const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // const [posts, setPosts] = useState([]);

    // useState(() => {
    //     fetch(`${BASE_URL}/posts`)
    //         .then(res => res.json())
    //         .then(data => setPosts(data))
    //         .catch(error => console.error('Blog Posts Fetch Error:', error))
    // }, []);

    return (
        <div className='blog-page'>
            {/* <h2 className='blog-page-title'>Article List</h2>
            <div className='blog-page-container'>
                <ul>

                    {!Array.isArray(posts) || posts.length === 0 ? (
                        <p>Loading...</p>
                    ) : (posts.map(post => (
                        <Link className='' to={`/public/${post._id}`} >
                            <li className='blog-page-post-card' key={post._id}>
                                <p className='blog-page-post-title'> {post.title}</p>
                                <p className='blog-page-post-author' >Author:{post.author}</p>
                            </li>
                        </Link>
                    )))}
                </ul>
            </div> */}
            <iframe
                title="Embedded Content"
                width="80%"
                style={{ height: '800px', display: 'block', margin: '90px auto 10px' }}
                src="https://baysidetechstudio.com/bichenoaccommodationavailability/"
                frameborder="0"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default Blog;