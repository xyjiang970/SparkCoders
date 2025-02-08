import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';


import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
        style={{
            background: `linear-gradient(to right,#833ab4,#fd1d1d,#fcb045)`
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/SparkCoders/materialUI_review/dist/" style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                fontFamily: `"Comic Neue", serif`,
                fontWeight: 600
            }}>
                <img style={{
                    marginRight: 8
                }}
                width="35px" 
                alt="maple_leaf_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/1/1d/A_Maple_Icon_Like_MapleStory%2CMay_2022.png" />

                Maplestory Rankings
            </Link>
          </Typography>
            <Link to="/SparkCoders/materialUI_review/dist/search">
                <IconButton color="inherit">
                    <SearchIcon style={{ fontSize:30 }} />
                </IconButton>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

