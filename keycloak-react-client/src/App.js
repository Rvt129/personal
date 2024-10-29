import React from 'react';
import Login from './Component/login';
import Register from './Component/Register';
import Dashboard from './Dashboard';
import Management from './Component/Management';
import Transactions from './Component/Transactions';

import Home from './Component/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/management" element={<Management />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}


export default App;
