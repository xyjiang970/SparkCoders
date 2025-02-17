import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const Games = () => {
    // 1. a state to hold all the games
    const [games, setGames] = useState([]);

    // 2. a useEffect to help get the games
    useEffect(() => {
        const fetchGames = async () => {
            const { data } = await axios.get("http://localhost:3000/games");
            //console.log(data);
            setGames(data);
        };

        fetchGames();
    }, []);

    return (
        <ul>
            {games.map((game) => {
                return (
                    <li key={game.id}>
                        <Link to={`/game/${game.id}`}>
                            {game.name}
                        </Link>
                        <ul>
                            {game.teams.map((team) => {
                                return (
                                    <li key={team.id}>
                                        <span style={{
                                            color: team.name.toLowerCase()
                                        }}>
                                            {team.name}
                                        </span>
                                        <ul>
                                            {team.champions.map((champion) => {
                                                /* 
                                                champion.id as key does not work 
                                                here because we took it out in 
                                                Games.js on the backend! (hid it). 
                                                */
                                                return <li key={champion.name}>{champion.name}</li>;
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </ul>
    )
};


export default Games;