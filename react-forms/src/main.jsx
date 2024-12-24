import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* Need to import BrowserRouter first */
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
<BrowserRouter >
  <App />
</BrowserRouter>);
