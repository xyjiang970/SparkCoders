import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = ({blogPosts}) => {
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