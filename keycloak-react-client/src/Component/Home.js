// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Personal Expense Manager</h1>
      <p>Track your expenses and manage your finances easily.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" style={{ marginRight: '10px' }}>
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
