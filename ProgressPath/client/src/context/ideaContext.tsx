import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_IDEAS } from "../utils/queries";
import { SAVE_IDEA, REMOVE_IDEA } from "../utils/mutations";
import { useUser } from "../context/userContext";
import { getSavedIdeaIds, saveIdeaIds } from "../utils/localStorage";

// Category Interface
interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
}

// Idea Interface
export interface Idea {
  _id: string;
  title: string;
  description: string;
  category: Category;
  isSaved: boolean;
}

// Idea Context Interface
interface IdeaContextType {
  visibleIdeas: Idea[];
  savedIdeas: Idea[];
  selectedCategory: string | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  handleCategoryChange: (categoryId: string | null) => void;
  saveIdea: (idea: Idea) => Promise<void>;
  removeIdea: (ideaId: string) => Promise<void>;
}

// Create Context
const IdeaContext = createContext<IdeaContextType | undefined>(undefined);

export const IdeaProvider = ({ children }: { children: ReactNode }) => {
  const { user, refreshUser } = useUser();
  const { data: ideasData, loading, error } = useQuery<{ getIdeas?: Idea[] }>(GET_IDEAS);

  const [visibleIdeas, setVisibleIdeas] = useState<Idea[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [localSavedIdeas, setLocalSavedIdeas] = useState<string[]>(getSavedIdeaIds());

  const [saveIdeaMutation] = useMutation(SAVE_IDEA, {
    update(cache, { data }) {
      const newIdea = data?.saveIdea;
      if (!newIdea) return;

      cache.modify({
        fields: {
          savedIdeas(existingSavedIdeas = []) {
            return [...existingSavedIdeas, newIdea];
          },
        },
      });
    },
  });

  const [removeIdeaMutation] = useMutation(REMOVE_IDEA, {
    update(cache, { data }) {
      const removedIdea = data?.removeIdea;
      if (!removedIdea) return;

      cache.modify({
        fields: {
          savedIdeas() {
            return removedIdea.savedIdeas;
          },
        },
      });
    },
  });

  // Visible ideas
  useEffect(() => {
    if (ideasData?.getIdeas) {
      console.log("Fetched ideas:", ideasData.getIdeas);
      setVisibleIdeas(ideasData.getIdeas);
    }
  }, [ideasData]);

  // Sync saved ideas
  useEffect(() => {
    if (user?.savedIdeas) {
      setLocalSavedIdeas(user.savedIdeas.map((idea) => idea._id));
    }
  }, [user]);

  const categories: Category[] = Array.from(
    new Map(
      (ideasData?.getIdeas || []).filter((idea) => idea.category).map((idea) => [idea.category._id, idea.category])
    ).values()
  ) || [];

  const savedIdeas: Idea[] = (user?.savedIdeas || []).map((idea) => ({
    ...idea,
    category:
      typeof idea.category === "string"
        ? categories.find((category) => category._id === idea.category) || {
            _id: idea.category,
            name: "Unknown",
            icon: "",
            color: "",
          }
        : idea.category,
    isSaved: true,
  }));

  // Save Idea Function
  const saveIdea = async (idea: Idea) => {
    try {
      const formattedIdea = {
        _id: idea._id,
        title: idea.title,
        description: idea.description,
        category: idea.category
          ? {
              _id: idea.category._id,
              name: idea.category.name,
              icon: idea.category.icon,
              color: idea.category.color,
            }
          : null,
      };

      console.log("Formatted Idea before mutation:", formattedIdea);
      await saveIdeaMutation({ variables: { ideaData: formattedIdea } });
      console.log("Saved idea:", formattedIdea);
      setLocalSavedIdeas([...localSavedIdeas, idea._id]);
      saveIdeaIds([...localSavedIdeas, idea._id]);
      refreshUser();
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

    // Remove Idea Function
    const removeIdea = async (ideaId: string) => {
      try {
        const { data } = await removeIdeaMutation({ variables: { ideaId } });

        if (data?.removeIdea?.savedIdeas) {
          console.log("Updated savedIdeas from server:", data.removeIdea.savedIdeas);
          setLocalSavedIdeas(data.removeIdea.savedIdeas);
        }
      } catch (error) {
        console.error("Error removing idea:", error);
      }
    };

    const handleCategoryChange = (categoryId: string | null) => {
      setSelectedCategory(categoryId);
    };

  return (
    <IdeaContext.Provider
      value={{
        visibleIdeas,
        savedIdeas,
        categories,
        selectedCategory,
        loading,
        error: error ? error.message : null,
        handleCategoryChange,
        saveIdea,
        removeIdea,
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