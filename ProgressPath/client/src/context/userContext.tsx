import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { UPDATE_USER, UPDATE_PASSWORD, DELETE_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: "To Do" | "Active" | "Complete";
}

interface User {
  _id: string;
  username: string;
  email: string;
  goals: Goal[];
}

interface UserContextType {
  user: User | null;
  updateUser: (username: string, email: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteUser: () => Promise<void>;
  refreshUser: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const { user: authUser, logout } = useAuth();

  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
    skip: !authUser?._id,
  });

  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [updatePasswordMutation] = useMutation(UPDATE_PASSWORD);
  const [deleteUserMutation] = useMutation(DELETE_USER);

  const user = data?.getUser || authUser || null;

  const updateUser = async (username: string, email: string) => {
    try {
      await updateUserMutation({ variables: { username, email } });
      await refetch();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await updatePasswordMutation({ variables: { currentPassword, newPassword } });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await deleteUserMutation();
      await apolloClient.clearStore();
      logout();
      navigate("/register");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updatePassword, deleteUser, refreshUser: refetch, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;