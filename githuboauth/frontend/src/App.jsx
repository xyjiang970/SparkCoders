import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import Homepage from '../components/Homepage';
import Login from '../components/Login';
import Profile from '../components/Profile';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  //console.log(searchParams.get("token"));

  const [user, setUser] = useState(null);

  useEffect(() => {
    // if there's token in searchParams, take it as your token
    // if not, take localStorage token
    // if not, your token is just undefined
    const token = searchParams.get("token") || localStorage.getItem("token") ;
    
    searchParams.delete("token");
    setSearchParams(searchParams);

    const getUser = async () => {
      if (!token) {
        return
      };

      // inspect elem > application > storage > local storage
      // stay logged in even if page refreshes
      window.localStorage.setItem("token", token);

      const response = await axios.get(
          "https://api.github.com/user", 

          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );

      //console.log(response.data);
      setUser(response.data);
    };

    getUser();
  }, [searchParams]); // Add searchParams as dependency to re-trigger effect when they change

  //console.log(user);
  
  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>

        <Link to="/">Homepage</Link>

        {/* 
        If user is already logged in, link should be to /profile.
        If not logged in, go to /login.
        */}
        {user ? 
        (<Link to="/profile">Profile</Link>) : 
          ( <Link to="/login">Login</Link>)
        }

        {user && <button onClick={() => {
          setUser(null)

          // removes token from L.S to stay logged out
          localStorage.removeItem("token"); 
          }}>Log Out</button>}
        
      </div>

      <Routes>
        <Route path='/' element={<Homepage />} />

        {/* 
        If user is logged in, show /profile.
        If user is not logged in, go /login.        
        */}
        {/* {user ? 
        // make sure user is passed in as prop here in /profile
        (<Route path='/profile' element={<Profile user={user} />} />) : 
          (<Route path='/login' element={<Login />} />)
        } */}
        {/* Render Login or Profile route based on user state */}
        <Route 
          path='/login' 
          element={user ? <Navigate to="/profile" /> : <Login />} />

        <Route 
          path='/profile' 
          element={user ? <Profile user={user} /> : <Navigate to="/login" />} />

        {/* <Route path='/profile' element={<Profile user={user} />} /> */}

      </Routes>
    </>
  );
};

export default App;
