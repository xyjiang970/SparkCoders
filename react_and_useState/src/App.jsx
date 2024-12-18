import './App.css'
import { useState } from 'react'

const Body = () => {
  //const [array, setArray] = useState([1,2,3]);
  const [array, setArray] = useState([]);

  const addNumber = () => {
    /*
    React state should be treated as immutable. Mutating the state directly, like with .push(), can lead to unpredictable behavior and bugs.
    
    .concat() does not modify state values.
    */
   setArray(array.concat(array.length+1));
  };

  return (
    <div>
      <button onClick={addNumber}>Add Number</button>
      <ul>
        {array.map((number, index) => {
          /*
          When you map, each element that you return should have a "key" value attached to it! This key should be unique to that element only. 
          */
          return <li key={index}>{number}</li>;
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const [num, setNum] = useState(0);
  // const array = [1,2,3];

  const decrement = () => {
    setNum(num - 1);
  };

  const increment = () => {
    setNum(num + 1);
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <h1>{num}</h1>

      <Body />
    </div>
  );

};

export default App
