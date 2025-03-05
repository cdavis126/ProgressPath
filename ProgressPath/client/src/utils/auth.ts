import { type JwtPayload, jwtDecode } from "jwt-decode";

interface ExtendedJwt extends JwtPayload {
  data: {
    username: string;
    email: string;
    _id: string;
  };
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<ExtendedJwt>(token);
      console.log("Decoded Token:", decoded);
      return decoded.data;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    if (!token) return false;

    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded?.exp) return false;
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error("Token expiration check failed:", err);
      return true;
    }
  }

  getToken(): string | null {
    try {
      const token = localStorage.getItem("token");
      return token && token !== "undefined" && token !== "null" ? token : null;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  }

  private handleAuth(idToken: string, redirectPath: string = "/dashboard") {
    if (!idToken) {
      console.error("No token provided for authentication.");
      return;
    }

    localStorage.setItem("token", idToken);

    try {
      const decoded = jwtDecode<ExtendedJwt>(idToken);
      console.log("Decoded Token:", decoded);

      const userId = decoded?.data?._id ?? null;
      if (userId) {
        localStorage.setItem("userId", userId);
      } else {
        console.error("User ID not found in token!");
      }
    } catch (error) {
      console.error("Invalid token received:", error);
    }

    window.location.assign(redirectPath);
  }

  login(idToken: string) {
    console.log("Logging in user...");
    this.handleAuth(idToken, "/dashboard");
  }

  signup(idToken: string) {
    console.log("Signing up user...");
    this.handleAuth(idToken, "/dashboard");
  }

  logout(redirectPath: string = "/") {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log("User logged out.");
    window.location.assign(redirectPath);
  }
}

export default new AuthService();


