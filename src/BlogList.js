import React, { useState, useEffect } from 'react';
import './BlogList.css'; // Import your CSS file

const BlogList = () => {
  const [blogPosts, SetBlogpost] = useState([]);
  const [currentPage, SetCurrentpage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/blogpost/all/users?page=${currentPage}&limit=7`, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU1MDg5NTI5OGMwYTk0M2NhYTZiMzdjIiwidXNlcm5hbWUiOiJlbGxpZSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzAwMjkzOTIxLCJleHAiOjE3MDA1NDIzMjF9.7fMaQVar22JNirg7ZkytYD0J-E52NzhqwQPAmPL-yXQ`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        SetBlogpost(data);
      } catch (error) {
        console.error('error fetching blog data:', error.message);
      }
    };

    fetchData();
  }, [currentPage]); 

  return (
    <>
      <div className="blog-list-header">
        <h1>Blog Posts</h1>
      </div>
      <div className="blog-list-container">
        <div className="blog-list">
          {blogPosts.map((post) => (
            <div key={post._id} className="blog-post">
              <h2>{post.title}</h2>
              <p>Author: {post.owner}</p>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => SetCurrentpage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button onClick={() => SetCurrentpage((prevPage) => prevPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogList;

