import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const SingleGame = () => {
    const { gameID } = useParams();
    const [game, setGame] = useState(null);
    const [teamName, setTeamName] = useState("RED"); // holds team name
    const [championName, setChampionName] = useState("");

    // moved out of useEffect in order to use
    // fetchData() again to update screen
    // when RED/ BLUE team is added after clicking "Create" button
    const fetchData = async () => {
        const { data } = await axios.get(`http://localhost:3000/games/${gameID}`);
        setGame(data);
    };

    useEffect(() => {
        fetchData();
    }, [gameID]); // Add gameID as a dependency

    // Conditional rendering to prevent access to `game.name` when game is null
    if (!game) {
        return (
            <div>
                <Link to="/"><button>Back</button></Link>
                <p>Loading game details...</p>
            </div>
        );
    }

    const onSubmit = async (event) => {
        /*
        Whenever you submit a form, a "refresh" happens and it navigates
        you to your exact URL, but with a "?" added to the end. To prevent
        this default behavior, use:
        */
        event.preventDefault();

        await axios.post("http://localhost:3000/teams", {
            name: teamName,
            gameID
        });
        
        fetchData(); // used again here to update screen with newly created teams
    };

    const createChampion = async (event, teamID) => {
        event.preventDefault();

        await axios.post("http://localhost:3000/champions", {
            name: championName,
            role: "TOP",
            gameID,
            teamID
        });

        fetchData();
    };

    return (
        <div>
            <Link to="/"><button>Back</button></Link>
            <h1>{game.name}</h1>

            <form onSubmit={onSubmit}>
                <select value={teamName} onChange={(event) => setTeamName(event.target.value)}>
                    <option>RED</option>
                    <option>BLUE</option>
                </select>

                <button>Create</button>
            </form>
            
            <ul>
                {game.teams.map((team) => {
                    return (
                        <li key={team.id}>{team.name}

                            <form onSubmit={(event) => createChampion(event, team.id)}>
                                <input value={championName} onChange={(event) => setChampionName(event.target.value)} />
                                <button>Create Champion</button>
                            </form>

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
        </div>
    );
};



export default SingleGame;