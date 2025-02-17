import { useState, useEffect, useContext } from "react";
import "./App.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

import Games from "../components/Games";
import SingleGame from "../components/SingleGame";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/game/:gameID" element={<SingleGame />} />
      </Routes>
    </>
  );
}

export default App;
