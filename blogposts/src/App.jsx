import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import CreateBlogPost from './components/CreateBlogPost';

const SingleBlogPost = ({blogPosts}) => {
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
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage blogPosts={blogPosts} />} />

        <Route path='/:BlogPostID' element={<SingleBlogPost blogPosts={blogPosts} />}/>

        <Route path='/write' element={<CreateBlogPost setBlogPosts={setBlogPosts} blogPosts={blogPosts} />} />
      </Routes>
    </>
  );
};

export default App;
