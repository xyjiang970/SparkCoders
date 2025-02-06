import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import CreateBlogPost from './components/CreateBlogPost';
import BlogPostContext from './contexts/BlogPostsContext';

const SingleBlogPost = () => {
  const {blogPosts} = useContext(BlogPostContext);

  const {BlogPostID} = useParams();
  const specificBlogPost = blogPosts.find((post) => String(post.id) === BlogPostID);

  // if you cannot find specific blog post, return a not found screen.
  if (!specificBlogPost) {
    return <h1>NOT FOUND!</h1>
  };

  return (
    <div>
      <h1>{specificBlogPost.name}</h1>
      <p>{specificBlogPost.body}</p>
    </div>
  )
};

function App() {
  // source of truth for all blog posts
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      name: 'dummyBlogPost',
      body: 'dummy blog post body created for testing purposes.'
    },
    {
      id: 2,
      name: 'dummyBlogPost2',
      body: 'dummy blog post body created for testing purposes 2.'
    }
  ]);

  const contextValue = {
    // blogPosts: blogPosts,
    // if key and value are the same, just pass in the key:
    blogPosts,
    setBlogPosts
  };
  
  return (
    <BlogPostContext.Provider value={contextValue}>
      {/* all components now have access to "blogPosts". */}
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />

          <Route path='/:BlogPostID' element={<SingleBlogPost />}/>

          <Route path='/write' element={<CreateBlogPost />} />
        </Routes>
      </>
    </BlogPostContext.Provider>
  );
};

export default App;
