import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useGoals } from "../context/goalContext";
import GoalModal from "../components/DashBoard/GoalModal";
import GoalCalendar from "../components/DashBoard/GoalCalendar";
import GoalCard from "../components/DashBoard/GoalCard";
import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import "../assets/Styles/Dashboard.css";
import Carousel from "../components/Carousel";

// Category Styles & Options
const categoryStyles = {
  misc: { color: "#d6f6dd", textColor: "#000", icon: <TbArrowsRandom />, label: "Misc." },
  mindset: { color: "#dac4f7", textColor: "#000", icon: <FaBrain />, label: "Mindset" },
  creativity: { color: "#f4989c", textColor: "#FFF", icon: <FaPaintBrush />, label: "Creativity" },
  wellbeing: { color: "#ebd2b4", textColor: "#000", icon: <GiInnerSelf />, label: "Well-Being" },
  nutrition: { color: "#acecf7", textColor: "#000", icon: <GiKnifeFork />, label: "Nutrition" },
  growth: { color: "#ffcc00", textColor: "#000", icon: <FaBookReader />, label: "Growth" },
  fitness: { color: "#ff5f6d", textColor: "#FFF", icon: <FaDumbbell />, label: "Fitness" },
  productivity: { color: "#6c5ce7", textColor: "#FFF", icon: <FaTasks />, label: "Productivity" },
};

const categoryOptions = Object.keys(categoryStyles).map((key) => ({
  value: key,
  label: categoryStyles[key as keyof typeof categoryStyles].label,
}));

const Dashboard = () => {
  const {
    goals,
    deleteGoal,
    updateGoal,
    openCreateModal,
    openEditModal,
    isModalOpen,
    closeModal,
    refetchGoals,
  } = useGoals();

  // ✅ Add state for active tab
  const [activeTab, setActiveTab] = useState<"calendar" | "goals">("goals");

  useEffect(() => {
    refetchGoals();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "To Do" | "Active" | "Complete") => {
    try {
      await updateGoal(id, { status: newStatus });
      refetchGoals();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Tab Headers
  const tabHeaders = {
    calendar: { title: "Map Your Path", description: "Map your paths, follow your progress and stay on course." },
    goals: { title: "Create Your Path", description: "Motivation is what gets you started. A Habit is what keeps you going." },
  };

  return (
    <div>
      {/* Header */}
      <Header setShowModal={openCreateModal} />
      <Carousel />

      {/* Main Content Wrapper */}
      <div
        className="main-content p-4 rounded shadow"
        style={{
          width: "95%",
          maxWidth: "2000px",
          margin: "20px auto",
          background: "linear-gradient(135deg, rgba(214, 246, 221, 0.3) 0%, rgba(218, 196, 247, 0.3) 25%, rgba(244, 152, 156, 0.3) 50%, rgba(235, 210, 180, 0.3) 75%, rgba(172, 236, 247, 0.3) 100%)",
          zIndex: 1,
          padding: 40,
          borderRadius: 10,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Navigation Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#6c5ce7", marginBottom: "5px", fontWeight: "normal", fontFamily: "inherit" }}>
              {tabHeaders[activeTab].title}
            </h2>
            <p style={{ fontSize: "22px", fontFamily: "inherit", marginTop: 0, marginBottom: 15 }}>
              {tabHeaders[activeTab].description}
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px", background: "transparent" }}>
            {Object.keys(tabHeaders).map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab as "calendar" | "goals")}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                  color: activeTab === tab ? "#6c5ce7" : "#bbb",
                  padding: "8px 16px",
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6c5ce7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = activeTab === tab ? "#6c5ce7" : "#bbb")}
              >
                {tab === "calendar" ? "Calendar" : "Goals"}

                {/* Underline for active tab */}
                {activeTab === tab && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#6c5ce7",
                    }}
                  ></div>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Show Calendar only on the "Calendar" tab */}
        {activeTab === "calendar" && (
          <div style={{ marginBottom: "40px", textAlign: "left" }}>
            {/* Goal Calendar Component */}
            <div style={{ marginTop: "20px" }}>
              <GoalCalendar />
            </div>
          </div>
        )}

        {/* Show Goals only on the "Goals" tab */}
        {activeTab === "goals" && (
          <>
            {/* Goal Grid */}
            <div className="goal-grid mt-3">
              {goals.map((goal) => (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  onDelete={() => deleteGoal(goal._id)}
                  onStatusChange={handleStatusChange}
                  handleDetails={() => openEditModal(goal)}
                  className="mb-4"
                  categories={categoryStyles}
                />
              ))}

              {/* Add Goal Button */}
              <div className="add-goal-card" onClick={openCreateModal}>
                <p>+ Add New Goal</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Goal Modal */}
      {isModalOpen && <GoalModal show={isModalOpen} handleClose={closeModal} categories={categoryOptions} />}
    </div>
  );
};

export default Dashboard;









