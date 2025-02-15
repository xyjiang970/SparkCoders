import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await fetch("http://localhost:3000/pokemon");
        // const data = await response.json();

        const { data } = await axios.get("http://localhost:3000/pokemon");

        setPokemon(data); // show list of pokemon from backend

      } catch (error) {
        console.log(error);
      }
    };

    getData();

  }, []);

  // Using FETCH:
  // const deletePokemon = async (pokemon) => {
  //   // console.log(pokemon);

  //   // make a DELETE call to local:3000/pokemon/${pokemon.id}
  //   try {
  //     const response = await fetch(`http://localhost:3000/pokemon/${pokemon.id}`, 
  //     {
  //       method: "DELETE"
  //     }
  //   );
  //     const data = await response.json();

  //     setPokemon(data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Using axios:
  const deletePokemon = async (pokemon) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/pokemon/${pokemon.id}`);

      setPokemon(data); // disappear on screen when deleting
    
    } catch (error) {
      console.log(error);
    }
  };
  // END of DELETE

  const createPokemon = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/pokemon/", {
        name,
        weight,
        height,
        gender,
        evolution
      });
      //console.log(data);
      // setPokemon([...TAKE ALL PREV. POKEMON, ADD TO END])
      setPokemon([...pokemon, data]) // appear on screen when adding
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [evolution, setEvolution] = useState(0);

  return (
    <>
      <div>
        <input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
        <input placeholder="Weight" type="number" value={weight} onChange={(event) => setWeight(event.target.value)}/>
        <input placeholder="Height" type="number" value={height} onChange={(event) => setHeight(event.target.value)}/>
        <select value={gender} onChange={(event) => setGender(event.target.value)}>
          <option>MALE</option>
          <option>FEMALE</option>
        </select>
        <input placeholder="Evolution" value={evolution} onChange={(event) => setEvolution(event.target.value)}/>
        <button onClick={createPokemon}>Create Pokemon</button>
      </div>
      <ul>
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.name}<button onClick={() => deletePokemon(pokemon)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
