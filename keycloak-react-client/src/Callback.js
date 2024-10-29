import React, { useEffect } from 'react';
import AuthService from './AuthService';

const Callback = () => {
  useEffect(() => {
    AuthService.handleCallback()
      .then(() => {
        window.location = '/dashboard';  // Điều hướng đến trang Dashboard sau khi login thành công
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return <div>Loading...</div>;
};

export default Callback;
