import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)

  /*
  Make it so that whenever the user types into this input field, we set
  setInputVale() with whatever the user typed.
  */
  const onInputValueChange = (event) => {
    //console.log(event.target.value);
    setInputValue(event.target.value);
    //console.log(inputValue);
  };

  const search = async () => {
    console.time("section");

    setLoading(true); // start the loading screen
    setErrorMessage(false); // Reset error message state before a new search
    setPokemonData(null); // Clear any previous Pokémon data

    // Check if the input is empty
    if (inputValue.trim() === "") {
      alert("Please enter an item!");  // Optional: Show an alert if input is empty
      setLoading(false); // Stop loading in case of empty input
      return;  // Don't do anything if the input is empty
    };

    /* 
    If you are trying to use template literals (introduced in ES6), you need to use backticks (``) instead of double quotes. Template literals allow you to embed variables and expressions directly within strings, making them easier to read and write.
    */

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
      const data = await response.json();

      /*
      await - the above two lines of code will run, but if it breaks (bad status codes like 404, 400, etc), the bottom three will not run!
      */
      setPokemonData(data);
      setLoading(false); // finished loading!
      setInputValue(""); // clear the input field.
    } catch (error) {
      setLoading(false); // Stop loading in case of an error
      setErrorMessage(true);
    };
    console.timeEnd("section");
  };

  // Handle key press (Enter)
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <input 
        value = {inputValue} 
        onChange = {onInputValueChange}
        onKeyDown = {handleKeyDown}
        placeholder = "Enter Pokémon name"
      />
      <button onClick={search}>Search</button>

      {loading ? <h1>Loading...</h1> : null}
      {errorMessage ? <h1>ERROR! Pokemon not found.</h1> : null}

      {pokemonData ? (
        <>
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.sprites.front_default} />
        </>
      ): null}

    </>
  );
};

export default App;
