import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from "../utils/mutations";
import { useUser } from "./userContext";

// Goal Interface
interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: "To Do" | "Active" | "Complete";
}

// Context Interface
interface GoalsContextType {
  goals: Goal[];
  filteredGoals: Goal[];
  goal: Goal | null;
  setGoal: (goal: Goal | null) => void;
  loading: boolean;
  modalMode: "edit" | "create";
  setModalMode: (mode: "edit" | "create") => void;
  isModalOpen: boolean;
  openCreateModal: () => void;
  openEditModal: (goal: Goal) => void;
  closeModal: () => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  handleInput: (field: keyof Goal) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  createGoal: (title: string, description: string, category: string, status: string) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  refetchGoals: () => void;
}

// Create Context
const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const { user, refreshUser, loading } = useUser();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "create">("create");

  const [createGoalMutation] = useMutation(CREATE_GOAL);
  const [updateGoalMutation] = useMutation(UPDATE_GOAL);
  const [deleteGoalMutation] = useMutation(DELETE_GOAL);

  const goals: Goal[] = user?.goals ?? [];

  if (loading) return <p>Loading Goals...</p>;

  // Modals
  const openCreateModal = () => {
    setGoal(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setGoal(goal);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGoal(null);
    setModalMode("create");
  };

  // Create Goal
  const createGoal = async (title: string, description: string, category: string, status: string) => {
    try {
      console.log("Creating Goal:", { title, description, category, status });

      const { data } = await createGoalMutation({ variables: { title, description, category, status } });

      if (!data?.createGoal) throw new Error("Goal creation failed!");

      console.log("Goal Created Successfully:", data.createGoal);
      await refreshUser();
    } catch (error: any) {
      console.error("Error Creating Goal:", error.message);
    }
  };

  // Update Goal
  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      console.log("Updating Goal:", { id, updates });

      const { data } = await updateGoalMutation({ variables: { id, ...updates } });

      if (!data?.updateGoal) throw new Error("Goal update failed!");

      console.log("Goal Updated Successfully:", data.updateGoal);
      await refreshUser();
    } catch (error: any) {
      console.error("Error Updating Goal:", error.message);
    }
  };

  // Delete Goal
  const deleteGoal = async (id: string) => {
    try {
      console.log("Deleting Goal with ID:", id);

      const { data } = await deleteGoalMutation({ variables: { id } });

      if (!data?.deleteGoal) throw new Error("Goal deletion failed!");

      console.log("Goal Deleted Successfully:", data.deleteGoal);
      await refreshUser();
    } catch (error: any) {
      console.error("Error Deleting Goal:", error.message);
    }
  };

  const handleInput =
    (field: keyof Goal) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setGoal((prev) => (prev ? { ...prev, [field]: e.target.value } : prev));
    };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        filteredGoals: goals.filter((goal) => !filterStatus || goal.status === filterStatus),
        goal,
        setGoal,
        loading,
        modalMode,
        setModalMode,
        isModalOpen,
        openCreateModal,
        openEditModal,
        closeModal,
        filterStatus,
        setFilterStatus,
        handleInput,
        createGoal,
        updateGoal,
        deleteGoal,
        refetchGoals: refreshUser,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};