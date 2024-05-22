import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import HomePage from './Components/HomePage/HomePage';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
