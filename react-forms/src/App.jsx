import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

/* COMPONENT #1 */
/*
Must use "props" in order to get "todoListItems" variable from the App() function!
*/
//const TodoListItems = (props) => {
  // shorthand 1:
  //const todoListItems = props.todoListItems;

  // shorthand 2:
  //const { todoListItems } = props;

  // shorthand 3: can destructure right in the argument like so:
// const TodoListItems = ({ todoListItems }) => {

//   return (
//     <ul>
//       {/* must use line directly below if not using shorthand! */}
//       {/* {props.todoListItems.map((todo, index) => ( */}

//       {todoListItems.map((todo, index) => (
//          <li key={index}>{todo}</li>
//       ))}
//     </ul>
//   );
// };

// import from relative path
import TodoListItems from './TodoListItems';


/* COMPONENT #2 */
function App() {
  /* Array State */
  const [todoListItems, setTodoListItems] = useState([
    "chicken", 
    "beef"
  ]);

  const [inputValue, setInputValue] = useState("");
  /*
  Make it so that whenever the user types into this input field, we set
  setInputVale() with whatever the user typed.
  */
  const onInputValueChange = (event) => {
    //console.log(event.target.value);
    setInputValue(event.target.value);
    //console.log(inputValue);
  };

  const createItem = () => {
    // Check if the input is empty
    if (inputValue.trim() === "") {
      alert("Please enter an item!");  // Optional: Show an alert if input is empty
      return;  // Don't do anything if the input is empty
    };

    //console.log(inputValue);
    /* 
    Instead of directly modifying the react array (never want to do this), you can duplicate the array and modify the duplicated array instead.

    The spread operator "[...todoListItems]" duplicates everything that's inside the array and takes it out of the array - that is why we need a "[]" to put everything back in.
    */
   const duplicatedTodoListItems = [...todoListItems, inputValue];

   setTodoListItems(duplicatedTodoListItems);
   setInputValue(""); // clear the input field.
  };

   // Handle key press (Enter)
   const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createItem();
    }
  };

  return (
    <>
      {/* "onChange" is the eventListener here. */}
      <input value={inputValue} onChange={onInputValueChange} onKeyDown={handleKeyDown} />
      <button onClick={createItem}>Create</button>

      {/* must pass the prop "todoListItems={todoListItems}" here as well! */}
      <TodoListItems todoListItems={todoListItems}/>

      {/* <ul>
        {todoListItems.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul> */}

    </>
  );
};

export default App;
