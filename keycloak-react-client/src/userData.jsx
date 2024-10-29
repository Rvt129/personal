import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');

      try {
        const response = await axios.get('http://localhost:8080/api/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError('Lấy dữ liệu người dùng không thành công.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          <p>Tên: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default UserData;
