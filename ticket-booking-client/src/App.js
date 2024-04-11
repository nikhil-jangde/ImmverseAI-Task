import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AvailableTickets from './pages/AvailableTickets';
import Auth from './components/Auth';
import axios from 'axios';
import BookTickets from './pages/BookTickets';
import MyTickets from './pages/MyTickets';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyTokenAndGetUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return null; 
        }

        const response = await axios.get('http://localhost:5000/auth/verifyToken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userInfo = response.data;
        setUser(userInfo);
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verifyTokenAndGetUserInfo();
  }, []);


  return (
    <div>
    {user ? <NavBar user={user} /> : <Auth />}
      <Routes>
        <Route path="/" element={user ? <AvailableTickets user={user} /> : <Auth />} />
        <Route path="/book" element={user ? <BookTickets user={user} /> : <Auth />} />
        <Route path="/MyTickets" element={user ? <MyTickets user={user} /> : <Auth />} />
      </Routes>
    </div>
  );
}

export default App;
