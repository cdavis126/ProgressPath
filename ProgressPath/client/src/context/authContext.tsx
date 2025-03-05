import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { ADD_USER, LOGIN_USER, LOGOUT_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";

// User Interface
interface User {
  _id: string;
  username: string;
  email: string;
}

// AuthContext Interface
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const apolloClient = useApolloClient();
  const [token, setToken] = useState<string | null>(Auth.getToken());
  const [user, setUser] = useState<User | null>(Auth.getProfile());
  const [loading, setLoading] = useState(true);

  const [signupUserMutation] = useMutation(ADD_USER);
  const [loginUserMutation] = useMutation(LOGIN_USER);
  const [logoutUserMutation] = useMutation(LOGOUT_USER);

  const fetchUser = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await apolloClient.query({ query: GET_USER, fetchPolicy: "network-only" });

      if (data?.getUser) {
        setUser({
          _id: data.getUser._id,
          username: data.getUser.username,
          email: data.getUser.email,
        });
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);

      if (error instanceof Error && (error.message.includes("User not found") || error.message.includes("Unauthorized"))) {
        Auth.logout();
        setToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setUser(Auth.getProfile());
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const signup = async (username: string, email: string, password: string) => {
    try {
      const { data } = await signupUserMutation({ variables: { username, email, password } });

      if (data?.addUser?.token) {
        Auth.login(data.addUser.token);
        setToken(data.addUser.token);
        await fetchUser();
        apolloClient.resetStore();
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Failed to signup.");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUserMutation({ variables: { email, password } });

      if (data?.loginUser?.token) {
        Auth.login(data.loginUser.token);
        setToken(data.loginUser.token);
        await fetchUser();
        apolloClient.clearStore();
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials.");
    }
  };

  const logout = async () => {
    try {
      await logoutUserMutation();
    } catch (error) {
      console.error("Logout error:", error);
    }
    Auth.logout();
    setToken(null);
    setUser(null);
    apolloClient.clearStore();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, refreshUser: fetchUser }}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};







