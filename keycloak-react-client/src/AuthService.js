import { UserManager } from "oidc-client";

const config = {
  authority: "http://localhost:8180/realms/bankDeveloper",
  client_id: "expense-client",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile",
  post_logout_redirect_uri: "http://localhost:3000/",
};

class AuthService {
  constructor() {
    this.userManager = new UserManager(config);
  }

  login() {
    return this.userManager.signinRedirect();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }

  getUser() {
    return this.userManager.getUser();
  }

  async getAccessToken() {
    const user = await this.getUser();
    return user ? user.access_token : null;
  }

  handleCallback() {
    return this.userManager.signinRedirectCallback();
  }
}

export default new AuthService();
