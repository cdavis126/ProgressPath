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
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded?.exp ? decoded.exp < Date.now() / 1000 : false;
    } catch (err) {
      console.error("Token expiration check failed:", err);
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem("token") || "";
  }

  login(idToken: string) {
    localStorage.setItem("token", idToken);

    try {
      const decoded = jwtDecode<ExtendedJwt>(idToken);
      console.log("Decoded Token on Login:", decoded);
    
      const userId = decoded?.data?._id ?? "MISSING_USER_ID";
      console.log("Extracted User ID:", userId);
    
      if (userId !== "MISSING_USER_ID") {
        localStorage.setItem("userId", userId);
      } else {
        console.error("User ID not found in token!");
      }
    } catch (error) {
      console.error("Invalid token on login:", error);
    }    

    window.location.assign("/home");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.assign("/");
  }
}

export default new AuthService();
