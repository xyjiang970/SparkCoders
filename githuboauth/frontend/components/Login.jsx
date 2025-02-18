import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
        

    return (
        <>
            <h1>Login</h1>
            {/* <button>
                <a href="http://localhost:3000/githublogin">Login Through GitHub</a>
            </button> */}
            <a href="http://localhost:3000/githublogin">Login Through GitHub</a>
        </>
    )
};


export default Login;