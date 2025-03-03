import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, GET_IDEAS } from "../utils/queries";
import { SAVE_IDEA, HIDE_IDEA } from "../utils/mutations";

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
  selectedCategory: string | null;
  handleSaveIdea: (ideaId: string) => Promise<void>;
  handleHideIdea: (ideaId: string) => Promise<void>;
  handleCategoryChange: (categoryId: string | null) => void;
}

const IdeaContext = createContext<IdeaContextType | undefined>(undefined);

export const IdeaProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, refetch: refetchUser } = useQuery(GET_USER);
  const { data: ideasData } = useQuery(GET_IDEAS);

  const [saveIdea] = useMutation(SAVE_IDEA, { onCompleted: refetchUser });
  const [hideIdea] = useMutation(HIDE_IDEA, { onCompleted: refetchUser });

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

  const handleSaveIdea = async (ideaId: string) => {
    try {
      await saveIdea({ variables: { ideaId } });
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  const handleHideIdea = async (ideaId: string) => {
    try {
      await hideIdea({ variables: { ideaId } });
    } catch (error) {
      console.error("Error removing idea:", error);
    }
  };

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
        selectedCategory,
        handleSaveIdea,
        handleHideIdea: handleHideIdea,
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
