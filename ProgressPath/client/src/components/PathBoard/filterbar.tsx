import { useState } from "react";
import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import { Container } from "react-bootstrap";

const FilterBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilterBar = () => {
    setIsExpanded(!isExpanded);
  };

  const categories = [
    { name: "Any", icon: <TbArrowsRandom /> },
    { name: "Mindset", icon: <FaBrain /> },
    { name: "Creativity", icon: <FaPaintBrush /> },
    { name: "Well-Being", icon: <GiInnerSelf /> },
    { name: "Nutrition", icon: <GiKnifeFork /> },
    { name: "Growth", icon: <FaBookReader /> },
    { name: "Fitness", icon: <FaDumbbell /> },
    { name: "Productivity", icon: <FaTasks /> },
  ];

  const buttonColors = [
    "#d6f6dd", "#dac4f7", "#f4989c", "#ebd2b4", "#acecf7", "#ffcc00", "#ff5f6d", "#6c5ce7"
  ];

  return (
    <Container fluid className="d-flex flex-column align-items-end my-3" style={{ maxWidth: "500px" }}>
      {/* Toggle Button - Styled as <p> */}
      <p 
        onClick={toggleFilterBar} 
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          color: "#333",
          marginBottom: "5px",
          userSelect: "none",
        }}
      >
        {isExpanded ? "Hide" : "Show"} 
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </p>

      {/* Filter Buttons - Expands Left While Staying Right-Aligned */}
      <div 
        style={{
          display: "flex",
          flexWrap: "nowrap", // 🛠 Prevents filters from wrapping into two rows
          justifyContent: "flex-end",
          gap: "10px",
          width: isExpanded ? "100%" : "0px", // 🛠 Expands left
          overflow: "hidden",
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? "translateY(0px)" : "translateY(-10px)",
          transition: "opacity 0.3s ease, transform 0.3s ease, width 0.3s ease",
          pointerEvents: isExpanded ? "auto" : "none",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "auto",
              flexShrink: 0,
            }}
          >
            <button
              className="filter-btn"
              style={{
                width: "35px", 
                height: "35px",
                borderRadius: "50%",
                fontSize: "1rem",
                background: buttonColors[index % buttonColors.length],
                color: "white",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
                cursor: "pointer",
                marginBottom: "3px",
              }}
            >
              {category.icon}
            </button>
            <div
              className="category-name"
              style={{
                fontSize: "0.7rem",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1.1",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FilterBar;










