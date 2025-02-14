import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

/* 
"cors" does not allow you to fetch from different domains by default! 
need to npm i cors on the backend! 
*/ 

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch ("http://localhost:3000/pokemons");
      const data = await response.json();

      console.log(data);
      
      setPokemonData(data);
    };

    getData();

  }, []);

  return (
    <ul>
      {pokemonData.map((pokemon, index) => (
        <li key={index}>{pokemon}</li>
      ))}
    </ul>
  );
};

export default App;
