import React, { useState, useEffect } from 'react';
import AuthService from './AuthService';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AuthService.getAccessToken();
      axios.get('http://localhost:8280/api/users/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
