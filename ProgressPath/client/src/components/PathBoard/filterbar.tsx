import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import { Container, Row, Col } from "react-bootstrap";

const FilterBar = () => {
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
    <Container fluid className="d-flex justify-content-center my-5">
      <Row
        className="justify-content-center"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: "30px",
          justifyContent: 'center',
        }}
      >
        {categories.map((category, index) => (
          <Col
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0",
              width: 'auto',
              flexShrink: 0,
            }}
          >
            <button
              className="filter-btn"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                fontSize: "1.5rem",
                background: buttonColors[index % buttonColors.length],
                color: "white",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
                cursor: "pointer",
                marginBottom: "5px",
              }}
            >
              {category.icon}
            </button>
            <div
              className="category-name"
              style={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1.2",
                marginTop: "4px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category.name}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FilterBar;








