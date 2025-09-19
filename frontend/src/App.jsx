import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './context/ProtectedRoute';
import axios from "axios";
import { AuthContext } from './context/AuthContext';
import { Progress } from "@/components/ui/progress";
import { useContext } from 'react';
import Services from './pages/Services';

axios.defaults.withCredentials = true;

function AppContent() {
  const { isLoading } = useContext(AuthContext);
  if (isLoading) return <Progress value={33} />;

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-pass' element={<ForgotPass/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/user/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      } />


    </Routes>

      
    
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
