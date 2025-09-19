import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider  from "../src/context/AuthContext.jsx"
import axios from "axios";
import { Toaster } from 'react-hot-toast';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <>
      <Toaster position="bottom-right" />
      <App />
    </>
  </AuthProvider>,
)
