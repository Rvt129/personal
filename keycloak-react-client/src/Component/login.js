import axios from 'axios';

// Function to login and get token from Keycloak
async function loginToKeycloak(username, password) {
  try {
    const response = await axios.post('http://localhost:8180/realms/bankDeveloper/protocol/openid-connect/token', 
      new URLSearchParams({
        grant_type: 'password',        // Grant type
        client_id: 'expense-management',  // Client ID trong Keycloak
        client_secret: '{client-secret}', // Client secret nếu cần
        username: username,            // Username truyền vào
        password: password,            // Password truyền vào
        scope: 'openid',               // Scope là 'openid'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Định dạng body
        }
      }
    );

    // Lưu trữ access token
    const token = response.data.access_token;
    console.log("Token: ", token);

    // Lưu token vào localStorage hoặc state
    localStorage.setItem('access_token', token);

    return token;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
}
async function callProtectedApi() {
  const token = localStorage.getItem('access_token');  // Lấy token từ localStorage

  try {
    const response = await axios.get('http://localhost:8080/api/protected-endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`  // Gửi token trong header
      }
    });
    console.log("API Response: ", response.data);
  } catch (error) {
    console.error("API call failed", error);
  }
}

// Gọi hàm để đăng nhập và thực hiện các hành động khác
loginToKeycloak('your-username', 'your-password').then(token => {
  if (token) {
    callProtectedApi();
  }
});

