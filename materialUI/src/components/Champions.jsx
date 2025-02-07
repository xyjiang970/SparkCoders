import React, {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import { Paper, Typography, Chip } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Champions = ({searchTerm}) => {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        const fetchChampions = async () => {
            const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/champion.json');

            const data = await response.json();

            // only want the values here (champion names)
            // can throw all of the values inside an array by doing:
            // Object.values(data.data)
            setChampions(Object.values(data.data));
        };

        fetchChampions();
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            {champions.filter((champion) => {
                if (champion.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return true;
                }
                return false;
            }).map((champion) => {
                const imageURL = `https://ddragon.leagueoflegends.com/cdn/15.3.1/img/champion/${champion.image.full}`;

                return (
                    <Accordion disableGutters={true}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Avatar 
                            sx={{ width: 40, height: 40, margin: "0.5rem" }}
                            // key={champion.id} 
                            alt={champion.name} 
                            src={imageURL} 
                            />
                            <Typography variant="h6" style={{margin: "0 1rem"}}>{champion.name}</Typography>
                            {champion.tags.map(tag => {
                                return <Chip label={tag} style={{margin: "0 0.25rem"}} color="primary" />
                            })}
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>{champion.blurb}</AccordionDetails>
                    </Accordion>

                );

                return (
                    <Paper 
                    variant="outlined" 
                    key={champion.id} 
                    style={{margin: "0.5rem"}}>
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Avatar 
                            sx={{ width: 75, height: 75, margin: "0.5rem" }}
                            // key={champion.id} 
                            alt={champion.name} 
                            src={imageURL} 
                            />
                            <Typography variant="h3" style={{margin: "0 1rem"}}>{champion.name}</Typography>
                            {champion.tags.map(tag => {
                                return <Chip label={tag} style={{margin: "0 0.25rem"}} color="primary" />
                            })}
                        </div>
                        <Typography variant="subtitle1">{champion.blurb}</Typography>
                        </Paper>
                );
            })}
        </div>

        
    );
    
};


export default Champions;