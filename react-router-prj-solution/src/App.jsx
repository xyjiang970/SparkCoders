import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

const Color = () => {
  const { color } = useParams();

  return <h1 style={{ color }}>{color}</h1>
};

function App() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/green">green</Link>
        <Link to="/blue">blue</Link>
        <Link to="/yellow">yellow</Link>
        <Link to="/purple">purple</Link>
      </div> 
      <Routes>
        {/* parameterized route */}
        <Route path="/:color" element={<Color />} />
      </Routes>
    </>
  )
}

export default App;
