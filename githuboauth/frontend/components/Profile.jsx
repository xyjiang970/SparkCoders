import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";

// make sure "user" is passed in as prop here!
const Profile = ({user}) => {

    return (
        <div>
            <h1>Profile</h1>
            <img src={user.avatar_url} />
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
        </div>
    )
};


export default Profile;