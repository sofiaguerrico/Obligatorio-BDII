import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import HomePage from './Components/HomePage/HomePage';
import Profile from './Components/Profile/Profile';
import Prediction from './Components/Prediction/Prediction';
import Ranking from './Components/Ranking/Ranking';
import AdminHomePage from './Components/AdminHomePage/AdminHomePage';
import UserPrediction from './Components/UserPrediction/UserPrediction';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homePage" element={<HomePage />} />          
          <Route path="/profile" element={<Profile />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/userPrediction" element={<UserPrediction />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
