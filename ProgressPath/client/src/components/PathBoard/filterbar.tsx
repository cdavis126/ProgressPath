import { Container } from "react-bootstrap";
import { useIdeas } from "../../context/ideaContext";
import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";

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

const FilterBar = () => {
  const { categories, handleCategoryChange, selectedCategory } = useIdeas();

  return (
    <Container fluid className="d-flex flex-column align-items-center my-3" style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexWrap: "nowrap", gap: "10px" }}>
        {categories.length === 0 ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <div key={category._id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button
                className={`filter-btn ${selectedCategory === category._id ? "active" : ""}`}
                onClick={() => handleCategoryChange(category._id)}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: category.color,
                  color: "white",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  marginBottom: "3px",
                }}
              >
                {iconMap[category.icon] || <TbArrowsRandom />}
              </button>
              <div className="category-name" style={{ fontSize: "0.7rem", fontWeight: "bold", textAlign: "center" }}>
                {category.name}
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default FilterBar;














