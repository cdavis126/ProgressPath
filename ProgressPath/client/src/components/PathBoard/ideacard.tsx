import { FaHeart, FaTrash, FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import "./ideacard.css";

const categories = [
  { name: "Mindset", icon: <FaBrain />, color: "#d6f6dd" },
  { name: "Creativity", icon: <FaPaintBrush />, color: "#dac4f7" },
  { name: "Well-Being", icon: <GiInnerSelf />, color: "#f4989c" },
  { name: "Nutrition", icon: <GiKnifeFork />, color: "#ebd2b4" },
  { name: "Growth", icon: <FaBookReader />, color: "#acecf7" },
  { name: "Fitness", icon: <FaDumbbell />, color: "#ffcc00" },
  { name: "Productivity", icon: <FaTasks />, color: "#ff5f6d" },
];

interface IdeaCardProps {
  title: string;
  description: string;
  categoryName: string;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ title, description, categoryName }) => {
  const category = categories.find((cat) => cat.name === categoryName) || categories[0];

  return (
    <div className="idea-card">
      {/* Top Section (Category Icon + Name & Save Button) */}
      <div className="idea-card-header">
        <div className="idea-category">
          <div className="category-icon" style={{ backgroundColor: category.color }}>
            {category.icon}
          </div>
          <span className="category-name">{category.name}</span>
        </div>
        <button className="save-btn">
          <FaHeart className="heart-icon" />
        </button>
      </div>

      {/* Title & Description */}
      <h3 className="idea-card-title">{title}</h3>
      <p className="idea-card-description">{description}</p>

      {/* Bottom Section (Trash Icon) */}
      <div className="idea-card-footer">
        <button className="delete-btn">
          <FaTrash />Delete
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;



