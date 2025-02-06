import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Link to="/">Homepage</Link>
        <Link to="/write">Write</Link>
      </div>
    );
  };

export default Navbar;