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
import Fixture from './Components/Fixture/Fixture';
import ErrorComponent from './Components/ErrorComponent/ErrorComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homePage" element={<ErrorComponent element={HomePage} />} />          
          <Route path="/profile" element={<ErrorComponent element={Profile} />} />
          <Route path="/prediction" element={<ErrorComponent element={Prediction} />} />
          <Route path="/ranking" element={<ErrorComponent element={Ranking} />} />
          <Route path="/admin" element={<ErrorComponent element={AdminHomePage} />} />
          <Route path="/userPrediction" element={<ErrorComponent element={UserPrediction} />} />
          <Route path="/fixture" element={<ErrorComponent element={Fixture} />} />
          <Route path="*" element={<div>404 Not Found</div>} />           
        </Routes>
      </Router>
    </div>
  );
}

export default App;
