import React from "react";
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
const TodoListItems = ({ todoListItems }) => {

return (
    <ul>
        {/* must use line directly below if not using shorthand! */}
        {/* {props.todoListItems.map((todo, index) => ( */}

        {todoListItems.map((todo, index) => (
            <li key={index}>{todo}</li>
        ))}
    </ul>
    );
};

// must export!
export default TodoListItems;