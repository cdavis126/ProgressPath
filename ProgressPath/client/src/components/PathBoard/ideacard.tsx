import { useState } from "react";
import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader} from "react-icons/fa";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import { TbArrowsRandom } from "react-icons/tb";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "./ideacard.css";
import { useIdeas } from "../../context/ideaContext";

interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
}

interface Idea {
  _id: string;
  title: string;
  description: string;
  category?: Category | null;
  isSaved: boolean;
}

interface IdeaCardProps {
  idea: Idea;
}

// Icon Mapping
const iconMap: Record<string, JSX.Element> = {
  TbArrowsRandom: <TbArrowsRandom />,
  FaBrain: <FaBrain />,
  FaPaintBrush: <FaPaintBrush />,
  GiInnerSelf: <GiInnerSelf />,
  GiKnifeFork: <GiKnifeFork />,
  FaBookReader: <FaBookReader />,
  FaDumbbell: <FaDumbbell />,
  FaTasks: <FaTasks />,
};

// Default Category
const defaultCategory: Category = {
  _id: "default",
  name: "Misc",
  icon: "TbArrowsRandom",
  color: "#6c5ce7",
};

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { saveIdea, removeIdea } = useIdeas();
  const [isSaved, setIsSaved] = useState(idea.isSaved);

  if (!idea || !idea._id) {
    return <div className="idea-card">Loading...</div>;
  }

  const category = idea.category ?? defaultCategory;
  const categoryIcon = iconMap[category.icon] || <TbArrowsRandom />;

  // Handle Save/Remove Click
  const handleSaveClick = async () => {
    if (!idea) {
      console.error("Error: Tried to save an undefined idea");
      return;
    }
  
    const formattedIdea = {
      ...idea,
      category:
        typeof idea.category === "string"
          ? { _id: idea.category, name: "", icon: "", color: "" }
          : defaultCategory,
    };
  
    if (isSaved) {
      await removeIdea(idea._id); // Wait for removal
    } else {
      await saveIdea(formattedIdea); // Wait for save
    }
  
    // Only update state after successful API response
    setIsSaved(!isSaved);
  };
  

  return (
    <div className="idea-card">
      {/* First Row: Category Badge & Save Button */}
      <div className="idea-card-header">
        {/* Category Badge */}
        <div
          className="category-badge"
          style={{ backgroundColor: category.color }}
        >
          <span className="category-icon">{categoryIcon}</span>
          <span className="category-name">{category.name}</span>
        </div>

        {/* Save/Remove Button */}
        <button
          onClick={handleSaveClick}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {isSaved ? <HeartFill color="red" size={20} /> : <Heart color="black" size={20} />}
        </button>
      </div>

      {/* Title */}
      <h4 className="idea-card-title">{idea.title}</h4>

      {/* Description */}
      <p className="idea-card-description">{idea.description}</p>
    </div>
  );
};

export default IdeaCard;
