import { Container, Button } from "react-bootstrap";
import { useIdeas } from "../../context/ideaContext";
import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";

const iconMap: Record<string, JSX.Element> = {
  TbArrowsRandom: <TbArrowsRandom style={{ fontSize: "1.3rem" }} />,
  FaBrain: <FaBrain style={{ fontSize: "1.3rem" }} />,
  FaPaintBrush: <FaPaintBrush style={{ fontSize: "1.3rem" }} />,
  GiInnerSelf: <GiInnerSelf style={{ fontSize: "1.3rem" }} />,
  GiKnifeFork: <GiKnifeFork style={{ fontSize: "1.3rem" }} />,
  FaBookReader: <FaBookReader style={{ fontSize: "1.3rem" }} />,
  FaDumbbell: <FaDumbbell style={{ fontSize: "1.3rem" }} />,
  FaTasks: <FaTasks style={{ fontSize: "1.3rem" }} />,
};

const FilterBar = () => {
  const { categories, handleCategoryChange, selectedCategory } = useIdeas();

  return (
    <Container 
      fluid 
      className="d-flex flex-column align-items-center my-3" 
      style={{ maxWidth: "700px" }}
    >
      {/* Filter Buttons */}
      <div 
        style={{ 
          display: "flex", 
          flexWrap: "nowrap", 
          gap: "15px",
          marginTop: "30px", 
          marginBottom: "10px" 
        }}
      >
        {categories.length === 0 ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => {
            const isSelected = selectedCategory === category._id;

            return (
              <div 
                key={category._id} 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center" 
                }}
              >
                <button
                  className={`filter-btn ${isSelected ? "active" : ""}`}
                  onClick={() => handleCategoryChange(category._id)}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: category.color,
                    color: "black",
                    border: isSelected ? "2px solid black" : "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: "3px",
                    boxShadow: isSelected ? "0px 0px 8px rgba(0, 0, 0, 0.5)" : "none",
                    transform: isSelected ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {iconMap[category.icon] || <TbArrowsRandom />}
                </button>
                <div 
                  className="category-name" 
                  style={{ 
                    fontSize: "1rem", 
                    fontWeight: "bold", 
                    color: "black", 
                    textAlign: "center" 
                  }}
                >
                  {category.name}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Reset Button */}
      {selectedCategory && (
        <Button 
        size="sm" 
        onClick={() => handleCategoryChange(null)}
        style={{
          backgroundColor: "#6c5ce7",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background 0.2s ease-in-out",
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#ff4f4f"} 
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff6b6b"}
      >
        Reset Filter
      </Button>
      
      )}
    </Container>
  );
};

export default FilterBar;