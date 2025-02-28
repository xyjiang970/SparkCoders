import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Account = ( {user} ) => {
    const [gameName, setGameName] = useState("");
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const token = window.localStorage.getItem("token");

            // axios call to fetch all the games
            const { data } = await axios.get(
                "http://localhost:3000/games",

                {
                    headers: {
                        authorization: token // let backend know who is logged-in
                    }
                }
            );
            setGames(data);
        };
        
        fetchGames();

    }, []);

    // if statement to prevent user.username = null error:
    if (!user) {
        return <h1>You are not logged in!</h1>
    };
    
    const createGame = async (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem("token");

        const { data } = await axios.post(
            // first arg.
            "http://localhost:3000/games", 

            // second arg.
            {
                gameName // create new game where name is "gameName"
            },

            // third arg.
            {
                headers: {
                    authorization: token // let backend know who is logged-in
                }
            }
        );
        
        setGames(data);
        setGameName(""); // Clear input after submission
        //console.log(data);

    };

    return (
        <>
            <h1>You are logged in as: { user.username } </h1>

            <form onSubmit={createGame}>
                <input 
                placeholder='Game' 
                value={gameName} 
                onChange={(event) => setGameName(event.target.value)} />
                <button>Add a game!</button>
            </form>

            <ul>
                {games.map((game) => {
                    return (
                        <li key={game.id}> 
                            {game.name} 
                        </li>
                    );
                })
                }
            </ul>
        </>
    );
};



export default Account;