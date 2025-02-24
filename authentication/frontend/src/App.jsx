import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from '../components/Login';
import Register from '../components/Register';
import Account from '../components/Account';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const tryToLogin = async () => {
      // if token exists, then try to login
      if (token) {
        const response = await axios.get(
          "http://localhost:3000/account",

          {
              headers: {
                  authorization: token
              }
          }
        );
      
        setUser(response.data);
        navigate("/account"); // automatically navigate to /account if logged in.
      };
    };

    tryToLogin();

  }, []);

  const logout = () => {
    setUser(null); // removes anything in "user" state
    window.localStorage.removeItem("token");
    navigate("/login"); // go right back to login page after logging out
  };

  return (
    <>
      {/* If user is logged in, they should not see the /login or /register links */}
      {user ? 
          (<button onClick={logout}>Logout</button>)
          :
          (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )
      }
      {/* If user is logged in, they should not see the /login or /register links */}


      {/* <div>
        <Link to="/login">Login</Link>
        <Link to="/Register">Register</Link>
      </div> */}


      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* passing user as prop here: */}
        <Route path="/account" element={<Account user={user} />} />
      
      </Routes>
    </>
  );
};

export default App;
