import { Card, Typography, useTheme, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import React, { useState, useEffect } from "react";

const Homepage = () => {
    const [rankings, setRankings] = useState([]);

    const theme = useTheme();
    // if isXs === true, we are in the xs size!
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchRankings = async () => {
            const response = await fetch("https://stannie-maplestory-character-search.onrender.com/overall-rankings");

            const data = await response.json();

            setRankings(data.ranks);
        };

        fetchRankings();
    }, []);

    // get top 3 rankings
    const topThree = rankings.slice(0, 3);

    // rest of characters
    // take 3 until end items
    const theRestofTheCharacters = rankings.slice(3);

    if (rankings.length && !isXs) {
        // swapping 0th element and 1st element
        // we want rank 1 in the center!
        [topThree[0], topThree[1]] = [topThree[1], topThree[0]];
    }

    return (
        <Grid container>
            {topThree.map(character => {
                return (
                <Grid size={{xs:12, sm:4}} key={character.rank}>
                    <Card 
                    variant="outlined" 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "1rem"
                    }}
                    >
                        <Typography variant="h4">{character.characterName}</Typography>
                        <Typography variant="h6" style={{
                            fontFamily: `"Comic Neue", serif`,
                            fontWeight: 700
                        }}>{character.level}</Typography>
                        <img src={character.characterImgURL} />
                        <Typography variant="body1">{character.jobName}</Typography>
                    </Card>
                </Grid>
                );
            })}
            <Grid container flexDirection="column" size={12} alignItems="center" marginTop={3}>
                {theRestofTheCharacters.map(character => (
                    <Grid size={5} key={character.rank}>
                    <Card 
                    variant="outlined" 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "1rem"
                    }}
                    >
                        <Typography variant="h4">{character.characterName}</Typography>
                        <Typography variant="h6" style={{
                            fontFamily: `"Comic Neue", serif`,
                            fontWeight: 700
                        }}>{character.level}</Typography>
                        <img src={character.characterImgURL} />
                        <Typography variant="body1">{character.jobName}</Typography>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Grid>
    )
};


export default Homepage;