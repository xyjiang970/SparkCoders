import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Champions from "./components/Champions";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Champions searchTerm={searchTerm} />
    </div>
  );
};

export default App;
