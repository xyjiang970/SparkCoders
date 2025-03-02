import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";


import { AppBar, Box, Toolbar, Typography, Button, IconButton, Card, Paper, useTheme, useMediaQuery, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';