import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BlogPostContext from '../contexts/BlogPostsContext';

const Homepage = () => {
  const {blogPosts} = useContext(BlogPostContext);

  // const blogPosts = contextValue.blogPosts;
  // const {blogPosts} contextValue; // same as line above

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }}>
      {blogPosts.map((post) => (
        <div key={post.name}> 
          <Link to={`/${post.id}`}>{post.name}</Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Homepage;