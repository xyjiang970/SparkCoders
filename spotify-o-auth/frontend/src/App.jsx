import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

// https://developer.spotify.com/documentation/web-api

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(null);
  const [songName, setSongName] = useState("");
  const [searchedSong, setSearchedSong] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [devices, setDevices] = useState({ devices: [] });
  const [playbackError, setPlaybackError] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [playbackState, setPlaybackState] = useState("stopped"); // "playing", "paused", "stopped"

  useEffect(() => {
    // get access token from URL or local storage
    const accessToken = searchParams.get("access_token") || window.localStorage.getItem("access_token");
    //console.log(searchParams.get("access_token"));

    if (accessToken) {
      window.localStorage.setItem("access_token", accessToken);
      setSearchParams({});
    };
    //console.log(accessToken);

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me", 
          
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setUser(data);
        
        // Separate try-catch for devices to handle failure independently
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/me/player/devices`,
          
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
          //console.log(response.data);
          setDevices(response.data);
          
          // Get current playback state
          try {
            const playbackResponse = await axios.get(
              "https://api.spotify.com/v1/me/player",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );
            
            if (playbackResponse.data && playbackResponse.data.item) {
              setCurrentlyPlaying(playbackResponse.data.item);
              setPlaybackState(playbackResponse.data.is_playing ? "playing" : "paused");
            }
          } catch (playbackError) {
            console.log("No active playback or error fetching playback state");
            setPlaybackState("stopped");
          }
          
        } catch (deviceError) {
          console.error("Error fetching devices:", deviceError);
          setDevices({ devices: [] });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    if (accessToken) {
      fetchUserData();
    }

  }, []);

  const handleLogout = () => {
    // Remove access token from local storage
    window.localStorage.removeItem("access_token");
    // Reset user state to trigger re-render and show login link
    setUser(null);
  };

  if (!user) {
    return (
      <Link to="http://localhost:3000/spotify-login">Login through Spotify</Link>
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${songName}&type=track`,

      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }
      }
    );

    setSearchedSong(data);
    setSongName("");
  };

  const playSong = async (track) => {
    try {
      setPlaybackError("");
      
      // Check if devices are available
      if (!devices.devices || devices.devices.length === 0) {
        setPlaybackError("No active Spotify devices found. Please open Spotify on a device.");
        return;
      }
      
      const deviceID = devices.devices[0].id;
      
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
        {
          uris: [`spotify:track:${track.id}`]
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setCurrentlyPlaying(track);
      setPlaybackState("playing");
    } catch (error) {
      console.error("Error playing track:", error);
      setPlaybackError("Unable to play track. Make sure Spotify is open and you have Spotify Premium.");
    }
  };
  
  const pausePlayback = async () => {
    try {
      setPlaybackError("");
      
      if (!devices.devices || devices.devices.length === 0) {
        setPlaybackError("No active Spotify devices found. Please open Spotify on a device.");
        return;
      }
      
      await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setPlaybackState("paused");
    } catch (error) {
      console.error("Error pausing playback:", error);
      setPlaybackError("Unable to pause playback. Make sure Spotify is open and you have Spotify Premium.");
    }
  };
  
  const resumePlayback = async () => {
    try {
      setPlaybackError("");
      
      if (!devices.devices || devices.devices.length === 0) {
        setPlaybackError("No active Spotify devices found. Please open Spotify on a device.");
        return;
      }
      
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setPlaybackState("playing");
    } catch (error) {
      console.error("Error resuming playback:", error);
      setPlaybackError("Unable to resume playback. Make sure Spotify is open and you have Spotify Premium.");
    }
  };
  
  const stopPlayback = async () => {
    try {
      setPlaybackError("");
      
      if (!devices.devices || devices.devices.length === 0) {
        setPlaybackError("No active Spotify devices found. Please open Spotify on a device.");
        return;
      }
      
      // First pause the track
      await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      // Then seek to position 0
      await axios.put(
        "https://api.spotify.com/v1/me/player/seek?position_ms=0",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setPlaybackState("stopped");
    } catch (error) {
      console.error("Error stopping playback:", error);
      setPlaybackError("Unable to stop playback. Make sure Spotify is open and you have Spotify Premium.");
    }
  };

  const buttonStyle = {
    backgroundColor: isHovering ? 'Red' : 'Orange', 
    color: 'white', 
    padding: '8px 16px', 
    borderRadius: '20px', 
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isHovering ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    transform: isHovering ? 'translateY(-2px)' : 'translateY(0)',
    fontWeight: isHovering ? 'bold' : 'normal'
  };
  
  const playbackControlStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: '15px 0',
      padding: '15px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    trackInfo: {
      flex: 1
    },
    controls: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: 'bold'
    },
    playButton: {
      backgroundColor: '#1DB954',
      color: 'white'
    },
    pauseButton: {
      backgroundColor: '#FFA500',
      color: 'white'
    },
    stopButton: {
      backgroundColor: '#FF0000',
      color: 'white'
    }
  };

  return (
    <>
      <h1>{user.display_name}</h1>
      {/* <img src={user.images[0].url} />  */}

      <button 
        onClick={handleLogout}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={buttonStyle}
      >
        {isHovering ? 'Logout 👋' : 'Logout'}
      </button>

      <form onSubmit={onSubmit}>
        <input 
          value={songName} 
          onChange={(event) => setSongName(event.target.value)}
        />
        <button>Search</button>
      </form>

      {playbackError && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {playbackError}
        </div>
      )}

      {!devices.devices || devices.devices.length === 0 ? (
        <div style={{ backgroundColor: '#fff4e5', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
          ⚠️ No Spotify devices found. Please open Spotify on at least one device to enable playback.
        </div>
      ) : (
        <div style={{ backgroundColor: '#e5fff4', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
          ✅ Connected to {devices.devices[0].name}
        </div>
      )}
      
      {/* Playback Control Panel */}
      {currentlyPlaying && (
        <div style={playbackControlStyles.container}>
          <div style={playbackControlStyles.trackInfo}>
            <h3 style={{ margin: '0 0 5px 0' }}>{currentlyPlaying.name}</h3>
            <p style={{ margin: '0', color: '#666' }}>
              {currentlyPlaying.artists && currentlyPlaying.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
          <div style={playbackControlStyles.controls}>
            {playbackState === "paused" ? (
              <button 
                onClick={resumePlayback} 
                style={{...playbackControlStyles.button, ...playbackControlStyles.playButton}}
                disabled={!devices.devices || devices.devices.length === 0}
              >
                ▶ Play
              </button>
            ) : (
              <button 
                onClick={pausePlayback} 
                style={{...playbackControlStyles.button, ...playbackControlStyles.pauseButton}}
                disabled={!devices.devices || devices.devices.length === 0 || playbackState === "stopped"}
              >
                ⏸ Pause
              </button>
            )}
            <button 
              onClick={stopPlayback} 
              style={{...playbackControlStyles.button, ...playbackControlStyles.stopButton}}
              disabled={!devices.devices || devices.devices.length === 0 || playbackState === "stopped"}
            >
              ⏹ Stop
            </button>
          </div>
        </div>
      )}

      <ul>
        {/* if searchedSong exists, then do */}
        {searchedSong && searchedSong.tracks.items.map(track => {
          return (
            <li key={track.id} style={{ 
              padding: '10px', 
              margin: '10px 0', 
              borderRadius: '5px',
              backgroundColor: currentlyPlaying && currentlyPlaying.id === track.id ? '#e5f7ff' : 'transparent',
              border: currentlyPlaying && currentlyPlaying.id === track.id ? '1px solid #cce5ff' : '1px solid #eee'
            }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{track.name}</h3>
              <h4 style={{ margin: '0 0 10px 0', fontWeight: 'normal', color: '#666' }}>{track.artists[0].name}</h4>
              <button 
                onClick={() => playSong(track)}
                disabled={!devices.devices || devices.devices.length === 0}
                style={{
                  backgroundColor: '#1DB954',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '5px'
                }}
              >
                ▶ Play
              </button>
            </li>
          )
        })}
      </ul>
    </>
  );
};

export default App;