import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useParams, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ( { setUser } ) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const login = async (event) => {
        event.preventDefault(); // prevents refreshing and adding "?" at end of URL

        // Make axios call to backend (POST)
        // in order to register a new account under this username and password.

        /*
        Recall:
        - PUT: replaces entire resource with the provided data (useful when you want to completely update all details of a resource).

        - PATCH: updates only specific parts of an existing resource (used when you only need to modify a few attributes of a resource).

        - POST: creates a new resource on the server.
        */
        try {
            const {data} = await axios.post(
                // URL to POST
                "http://localhost:3000/login", 

                // data to pass in
                {
                    username,
                    password
                }
            );
            //console.log(data);

            // if (data.message == "No User Found. Create Account Instead!") 
            // {
            //     setError(data.message);
            //     return;
            // }

            window.localStorage.setItem("token", data);

            const response = await axios.get(
                "http://localhost:3000/account",

                {
                    headers: {
                        authorization: data
                    }
                }
            );
            //console.log(response.data);

            // Update user state in App.jsx
            setUser(response.data);
            // Redirect user to /account after successful registration and login
            navigate("/account");

        // need to send (401) in order to hit this catch block!
        } catch (error) {
            //console.error("Login failed:", error.response.data);
            setError(error.response.data.message);
        }

    };

    return (
        <>
            <h1>Login</h1>

            {error && <h5>{error}</h5>}

            <form onSubmit={login}>
                <input placeholder='Username' value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                />
                <input placeholder='Password' value={password} 
                    type='password'
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <button>Login</button>
            </form>
        </>
    );
};

export default Login;