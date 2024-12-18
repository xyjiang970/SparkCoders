import './App.css'
import { useState } from 'react';

/*
JSX and React.

JSX allows you to combine HTML, CSS, and JS all in one file 
(and sometimes within the same line).

React is an abstraction (something that takes away all the complicated logic) 
on the DOM.

React simplifies addEventListener, querySelector, createElement, etc

App is a component - components in React have to be functions (can use function or const).
*/
//function App() {

const Navbar = () => {
// For components, make sure the first letter is capitalized (i.e. App vs app).
  return (
    <ul className="navbar">
      <li>Homepage</li>
      <li>About Me</li>
      <li>Login</li>
    </ul>
  );
};

const Body = () => {
/* 
Using standard DOM manipulation we would:
1. querySelector the h1
2. add event listener on the h1
3. h1.style.color = "blue";
*/

// anything within  {} is javascript
// React disallows you to render objects and functions (need to return if function) on the screen.
  const num = "asdkfjhwssd d"

  const someFunction = () => {
    return "hello";
  };

  /*
  React state is a variable.
  If you update the state, it automatically re-renders.
  */
  // "color" is how you get the value of the variable.
  // "setColor" is how you set the value.
  const [colorOfH1, setColorOfH1] = useState("red");

  const h1Style = {
    color: colorOfH1,
  };

  // alternative to addEventListener
  const clickedOnH1 = () => {
    // toggles between blue and red
    if (colorOfH1 === "red") {
      setColorOfH1("blue");
    } else {
      setColorOfH1("red");
    }; 
  };

  return (
    // making the h1 clickable here
    // toggle between blue and red
    <div>
      {/* inline styles using JSX */}
      {/* <h1 style={{color: "blue"}}>Here is my website</h1> */}
      <h1 style={h1Style} onClick={clickedOnH1}>Here is my website</h1>
      <p>Random Text Goes in Here</p>
      <h3>{num}</h3>
      <h3>{someFunction()}</h3>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
    </div>
  );
};

const App = () => {
  return (
    // You can only return one element at a time (unless you use div or empty element).
    <div> 
      {/* navbar component */}
      <Navbar />
      {/* body component */}
      <Body />

    </div>
  );
  
};
  

export default App;
