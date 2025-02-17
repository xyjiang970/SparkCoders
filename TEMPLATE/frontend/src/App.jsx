import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

import { Routes, Route, Link, useSearchParams } from "react-router-dom";

const Homepage = () => {
  return <h1>Homepage</h1>;
};

const Login = () => {
  return <a href="http://localhost:3000/githublogin">Login through GitHub</a>;
};

const Profile = ({ user }) => {
  return (
    <div>
      <img src={user.avatar_url} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
};

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // if there's token in searchParams, take it as your token
    // if not, take localStorage's token
    // if not, your token is just undefined
    const token = searchParams.get("token") || localStorage.getItem("token");

    searchParams.delete("token");
    setSearchParams(searchParams);

    const getUser = async () => {
      if (!token) {
        return;
      }

      // i have the token here
      window.localStorage.setItem("token", token);

      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    };

    getUser();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Homepage</Link>
        {user ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {user && (
          <button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
            }}
          >
            Log out
          </button>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        {user ? (
          <Route path="/profile" element={<Profile user={user} />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default App;
