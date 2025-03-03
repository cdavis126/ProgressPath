import { FaHeart, FaEyeSlash, FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import { TbArrowsRandom } from "react-icons/tb";
import "./ideacard.css";
import { useIdeas } from "../../context/ideaContext";

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

const defaultCategory: Category = {
  _id: "default",
  name: "Misc",
  icon: "TbArrowsRandom",
  color: "#6c5ce7",
};

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
  isHidden: boolean;
}

interface IdeaCardProps {
  idea?: Idea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { toggleSaveIdea, toggleHideIdea } = useIdeas();

  if (!idea) {
    return <div className="idea-card">Loading...</div>;
  }

  const category = idea.category ?? defaultCategory;
  const categoryIcon = iconMap[category.icon] || <TbArrowsRandom />;

  return (
    <div className="idea-card">
      {/* Top Row: Hide and Save Buttons */}
      <div className="idea-card-header">
        <button className="hide-btn" onClick={() => toggleHideIdea(idea._id)}>
          <FaEyeSlash className="eye-icon" />
        </button>
        <button
          className={`save-btn ${idea.isSaved ? "saved" : ""}`}
          onClick={() => toggleSaveIdea(idea._id)}
        >
          <FaHeart className="heart-icon" />
        </button>
      </div>

      {/* Title */}
      <h4 className="idea-card-title">{idea.title}</h4>

      {/* Category Badge (Icon + Name inside a colored pill) */}
      <div className="category-badge" style={{ backgroundColor: category.color }}>
        <span className="category-icon">{categoryIcon}</span>
        <span className="category-name">{category.name}</span>
      </div>

      {/* Description */}
      <p className="idea-card-description">{idea.description}</p>
    </div>
  );
};

export default IdeaCard;

