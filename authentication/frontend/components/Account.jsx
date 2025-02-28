import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Account = ( {user} ) => {
    // if statement to prevent user.username = null error:
    if (!user) {
        return <h1>You are not logged in!</h1>
    };

    return (
        <>
            <h1>You are logged in as: {user.username} </h1>
        </>
    );
};



export default Account;