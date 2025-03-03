import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER, UPDATE_PASSWORD, DELETE_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

// User Type
interface User {
  _id: string;
  username: string;
  email: string;
}

// Context Type
interface UserContextType {
  user: User | null;
  updateUser: (username: string, email: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteUser: () => Promise<void>;
  refreshUser: () => void;
  loading: boolean;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserContext Provider
const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  // Fetch user data if authenticated
  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
    skip: !authUser,
  });

  // Mutations
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [updatePasswordMutation] = useMutation(UPDATE_PASSWORD);
  const [deleteUserMutation] = useMutation(DELETE_USER);

  // Update user
  const updateUser = async (username: string, email: string) => {
    try {
      await updateUserMutation({ variables: { username, email } });
      refetch();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Update password
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await updatePasswordMutation({ variables: { currentPassword, newPassword } });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await deleteUserMutation();
      logout();
      navigate("/register");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: data?.getUser || authUser,
        updateUser,
        updatePassword,
        deleteUser,
        refreshUser: refetch,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const User = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;