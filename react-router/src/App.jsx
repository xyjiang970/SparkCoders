import { useState, useEffect } from 'react';
import './App.css';

/*
React specializes in Single Page Applications (SPA). Whenever you change the URL, the homepage does not reload. It simply changes the underlying HTML.
*/

/*
<Routes> and <Route> are components. All your <Route> components have to be under <Routes>!
*/
import { Routes, Route, Link, useParams } from "react-router-dom";

const Homepage = () => {
  return <h1> This is the homepage! </h1>;
};

const AboutMe = () => {
  return <h1> This is the about me page. </h1>;
};

// const Video = () => {
//   /* 
//   useParams is a hook!
//   */
//   // manually setting videoID:
//   //const params = { videoID: "red" };
  
//   const params = useParams(); 
  
//   //const videoID = params.videoID;
//   // same as below:
//   const { videoID } = params;

//   // /console.log(params.VideoID);

//   return <h1> {params.videoID} </h1>
// };

const Video = () => {
  const { videoID } = useParams();
  return <h1> {videoID} </h1>
};

function App() {
  return (
    <>
    {/* Not good practice to just use <a> tags in React. Use Link instead (imported from "react-router-dom")! Link is faster (loading the page) compared to <a> tags. */}
    {/* <a href='/'>Homepage</a>
    <a href='/aboutme'>About Me</a> */}

    <Link to="/">Homepage</Link>
    <Link to="/aboutme">About Me</Link>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/watch/:videoID" element={<Video />} />
        {/* 
        Can also do this:
        <Route path="/watch/:VideoID/:userID" element={<Video />} />
        */}
      </Routes>
    </>
  );
}

export default App;
