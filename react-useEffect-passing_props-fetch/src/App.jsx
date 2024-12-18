import { useState, useEffect } from "react";
import "./App.css";

function App () {
/*
React hook is a type of function in react (hook calls must be above return statements).
1. has to start with "use".
2. has to be used in the component body.
3. cannot conditionally call hooks.
*/
    // useState takes in one arg. which is the initial value
    const [count, setCount] = useState(0);

    // null is a purposeful "absence" of data
    const [joke, setJoke] = useState(null);

    const [catpic, setCatpic] = useState(null);

    // making a new component that renders the <p>{joke.value}</p>
    const Joke = (props) => {
        console.log(props);
        return <p>{props.funnyJoke}</p>
    };

    /* 
    useEffect takes in two args:
    1. a callback function (a function that you DO NOT call - you pass this function into another function).
    2. an empty array
    */ 

    // this will only run ONCE whenever your component mounts.
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://api.chucknorris.io/jokes/random");
            const response2 = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1")
            const data = await response.json();
            const data2 = await response2.json();

            setJoke(data);
            setCatpic(data2[0].url);

        };
        getData();

    // only states should go in the array.
    // whenever that state updates, the callback is executed again.
    // putting "count" in the array updates the 'joke' and 'catpic'.
    }, [count]);


    if (!joke) {
        return <h1>LOADING</h1>;
    };

    if (!catpic) {
        return <h1>LOADING</h1>;
    };

    return(
        <>
            {/* funnyJoke is the prop, joke.value is the value */}
            {/* <p>{joke.value}</p> */}
            <Joke funnyJoke={joke.value} count={count}/>
            
            {/*
            whenever you call "setCount()", everything within the component body runs again.
            */}
            <button onClick={() => setCount((count) => count+1)}>
                Count is {count}
            </button>

            <div>
                <img src={catpic} alt="Random cat" style={{ height: '400px' }}/>
            </div>
        </>
    );
};

export default App;