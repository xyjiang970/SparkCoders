import { useState, useEffect } from 'react';
import './App.css';

const PokemonAbility = (props) => {
  const [abilityData, setAbilityData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(props.ability.ability.url);
      const data = await response.json();
      setAbilityData(data);
    };
    fetchData();
  }, []);

  if (!abilityData) {
    return <h1>Loading...</h1>
  };

  const effectObject = abilityData.effect_entries.find((ability) => {
    return ability.language.name === "en";
  });
  //console.log(effect);

  return (
    <div>
      <h4>{props.ability.ability.name}</h4>
      <p>{effectObject.short_effect}</p>
    </div>
  );
};

/* 
Custom pokemon list item component 
This component does noto have access to the pokemon's name!
We will need to pass in the pokemon's name - this is where "props" come in.
*/
const PokemonListItem = (props) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // You can make another fetch call to pokemon.url! (to get sprites, move set, etc)
  // putting the key here does not work! 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(props.pokemon.url);
      const data = await response.json();
      setPokemonData(data);
    };
    fetchData(); // can use same variable name "fetchData" again b.c. they are in different scopes! 
  }, []);

  const showAbilities = () => {
    setIsVisible(!isVisible); // toggle
  };

  // null.sprites will always crash your app (null. anything really)
  //console.log(pokemonData);
  if (!pokemonData) {
    return <p>Loading...</p>
  };

  /* JavaScript version below, for React version, we use "useState" */  
  // const isVisible = true;
  // condition ? if do this : else do this
  // isVisible ? console.log(1) : console.log(2);
  
  //console.log(pokemonData.abilities);

  return (
    <div style={{border: "1px solid lightseagreen", margin: "2rem 0"}}>
      <li onClick={showAbilities}>
        <p>{props.pokemon.name}</p>
        <img src={pokemonData.sprites.front_default}  />
      </li>
      {isVisible ? (
        <div>
        <h4>Skills</h4>
          {pokemonData.abilities.map((ability, index) => {
            return <PokemonAbility key={index} ability={ability} />;
          })}
        </div>
      ) : null} {/* null to not render anything */}
    </div>
  );
};

function App() { // this is a component
  // Render the list of pokemon, we need a variable to keep track of what we are rendering.
  const [pokemon, setPokemon] = useState([]);
/*
Goal is to fetch from https://pokeapi.co/api/v2/pokemon?limit=10&offset=0 and render each item on the screen.

Never make components async - always use fetch in useEffect.
*/
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
      const data = await response.json();
      /*
      We want to take each of these pokemon and render their names on the screen.

      We want to make it so that the state becomes whatever is fetched.
      */
     setPokemon(data.results);
    };
    fetchData();
  }, []);
  return (
    
    <ol style={{listStyleType: "none"}}>
      {/* .map() array method creates a new array by applying a given function to each element of an existing array. */}
      {pokemon.map((pokemon) => {
        // key must go here! 
        return <PokemonListItem key={pokemon.name} pokemon={pokemon} />;
        //return <li key={pokemon.name}>{pokemon.name}</li>;
      })}
    </ol>
  );
};

export default App;
