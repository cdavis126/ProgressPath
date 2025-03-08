const STORAGE_KEY = "saved_ideas";

// Get saved idea IDs from localStorage
export const getSavedIdeaIds = (): string[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

// Save idea IDs to localStorage
export const saveIdeaIds = (ideaIdArray: string[]) => {
  if (ideaIdArray.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideaIdArray));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

// Remove a specific idea from localStorage
export const removeIdeaId = (ideaId: string) => {
  const savedIdeaIds = getSavedIdeaIds();
  const updatedIdeaIds = savedIdeaIds.filter((id) => id !== ideaId);
  saveIdeaIds(updatedIdeaIds);
  return true;
};
