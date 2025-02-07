import { useState, useEffect } from 'react';

const GetPokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0', { signal });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPokemon(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
            console.error("Error fetching Pokémon:", err);
            setError("Failed to fetch Pokémon. Please try again.");
          }
      }
    };
  
    fetchPokemon();
  
    return () => {
      controller.abort(); // Cancels the request when the component unmounts
    };
  }, []);

  return (
    <>
      {error ? <p>{error}</p> : 
        <ul>
          {pokemon.map((singlePokemon) => (
            <li key={singlePokemon.name}>{singlePokemon.name}</li>
          ))}
        </ul>
      }
    </>
  );
};

export default GetPokemonList;
