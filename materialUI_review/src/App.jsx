import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Search from './components/Search';

function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        <Route path="/SparkCoders/materialUI_review/dist/" element={<Homepage />} />
        <Route path="/SparkCoders/materialUI_review/dist/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
