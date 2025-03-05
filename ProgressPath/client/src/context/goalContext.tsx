import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from "../utils/mutations";

interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: "To Do" | "Active" | "Complete";
}

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

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, refetch } = useQuery(GET_USER, { fetchPolicy: "network-only" });
  const [createGoalMutation] = useMutation(CREATE_GOAL);
  const [updateGoalMutation] = useMutation(UPDATE_GOAL);
  const [deleteGoalMutation] = useMutation(DELETE_GOAL);

  const [goal, setGoal] = useState<Goal | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "create">("create");

  const goals: Goal[] = data?.getUser?.goals ?? [];

  useEffect(() => {
    console.log("User data from GET_USER query:", data?.getUser);
    console.log("All Goals:", goals);
  }, [data]);

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

  const createGoal = async (title: string, description: string, category: string, status: string) => {
    try {
      console.log("Creating Goal:", { title, description, category, status });

      const { data } = await createGoalMutation({
        variables: { title, description, category, status },
      });

      console.log("Goal Created Successfully:", data.createGoal);

      await refetch();
    } catch (error: any) {
      console.error("Error Creating Goal:", error.message);
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      console.log("Updating Goal:", { id, updates });

      const { data } = await updateGoalMutation({
        variables: { id, ...updates },
      });

      console.log("Goal Updated:", data.updateGoal);

      await refetch();
    } catch (error: any) {
      console.error("Error Updating Goal:", error.message);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      console.log("Deleting Goal with ID:", id);

      const { data } = await deleteGoalMutation({ variables: { id } });

      console.log("Goal Deleted:", data.deleteGoal);

      await refetch();
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
        refetchGoals: refetch,
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
