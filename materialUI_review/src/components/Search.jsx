import React, { useState } from "react";
import { TextField, InputAdornment, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [character, setCharacter] = useState(null); // hold characters

    const handleSearch = async () => {
        if (!searchTerm.trim()) return; // Avoid empty searches
        
        try {
            const response = await fetch(`https://stannie-maplestory-character-search.onrender.com/character-search/${searchTerm}`);

            const data = await response.json();

            setCharacter(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        };
    };

    console.log(character);

    return (
        <>
           
            <div style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                marginTop: "2rem"
            }}>
                <TextField 
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
                label="IGN: " 
                style={{width:"100%"}}
                slotProps={{
                    input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    },
                }}/>

                <Button onClick={handleSearch} variant="contained" color="secondary">Search</Button>
            </div>
            {/* 
            character && (...) ensures that the Typography component is only rendered if character is not null or undefined.

            If character is truthy, it renders whatever is inside the parentheses.

            If character is falsy (e.g., null, undefined, false, 0, ""), nothing is rendered. 
            */}
            {character && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Typography>{character.ranks[0].characterName}</Typography>
                    <img src={character.ranks[0].characterImgURL} />
                    <Typography>{character.ranks[0].level}</Typography>
                    <Typography>{character.ranks[0].jobName}</Typography>
                </div>
            )}
        </>
    )
}

export default Search;