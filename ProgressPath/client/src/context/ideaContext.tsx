import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, GET_IDEAS } from "../utils/queries";
import { TOGGLE_SAVE_IDEA, TOGGLE_HIDE_IDEA } from "../utils/mutations";

interface Idea {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    color: string;
  };
}

interface IdeaContextType {
  visibleIdeas: Idea[];
  savedIdeas: Idea[];
  hiddenIdeas: Idea[];
  selectedCategory: string | null;
  toggleSaveIdea: (ideaId: string) => Promise<void>;
  toggleHideIdea: (ideaId: string) => Promise<void>;
  handleCategoryChange: (categoryId: string | null) => void;
}

const IdeaContext = createContext<IdeaContextType | undefined>(undefined);

export const IdeaProvider = ({ children }: { children: ReactNode }) => {
  // Fetch user & ideas
  const { data: userData } = useQuery(GET_USER);
  const { data: ideasData } = useQuery(GET_IDEAS);

  const [toggleSaveIdeaMutation] = useMutation(TOGGLE_SAVE_IDEA);
  const [toggleHideIdeaMutation] = useMutation(TOGGLE_HIDE_IDEA);

  const [allIdeas, setAllIdeas] = useState<Idea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [hiddenIdeas, setHiddenIdeas] = useState<Idea[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (ideasData?.getIdeas) {
      setAllIdeas(ideasData.getIdeas);
    }
    if (userData?.getUser) {
      setSavedIdeas(userData.getUser.savedIdeas || []);
      setHiddenIdeas(userData.getUser.hiddenIdeas || []);
    }
  }, [ideasData, userData]);

  // Toggle Save Idea
  const toggleSaveIdea = async (ideaId: string) => {
    try {
      await toggleSaveIdeaMutation({ variables: { ideaId } });

      setSavedIdeas((prevSaved) =>
        prevSaved.some((idea) => idea._id === ideaId)
          ? prevSaved.filter((idea) => idea._id !== ideaId) // Remove if already saved
          : [...prevSaved, allIdeas.find((idea) => idea._id === ideaId)!] // Add if not saved
      );
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  // Toggle Hide Idea
  const toggleHideIdea = async (ideaId: string) => {
    try {
      await toggleHideIdeaMutation({ variables: { ideaId } });

      setHiddenIdeas((prevHidden) =>
        prevHidden.some((idea) => idea._id === ideaId)
          ? prevHidden.filter((idea) => idea._id !== ideaId) // Unhide if already hidden
          : [...prevHidden, allIdeas.find((idea) => idea._id === ideaId)!] // Hide if not hidden
      );
    } catch (error) {
      console.error("Error toggling hide:", error);
    }
  };

  // Category Filter
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const visibleIdeas = allIdeas.filter(
    (idea) =>
      !hiddenIdeas.some((hidden) => hidden._id === idea._id) &&
      (selectedCategory ? idea.category._id === selectedCategory : true)
  );

  return (
    <IdeaContext.Provider
      value={{
        visibleIdeas,
        savedIdeas,
        hiddenIdeas,
        selectedCategory,
        toggleSaveIdea,
        toggleHideIdea,
        handleCategoryChange,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};

export const useIdeas = (): IdeaContextType => {
  const context = useContext(IdeaContext);
  if (!context) {
    throw new Error("useIdeas must be used within an IdeaProvider");
  }
  return context;
};
