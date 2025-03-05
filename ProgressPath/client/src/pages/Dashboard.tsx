import { useEffect } from "react";
import Header from "../components/Header";
import { useGoals } from "../context/goalContext";
import GoalModal from "../components/DashBoard/GoalModal";
import GoalCalendar from "../components/DashBoard/GoalCalendar";
import GoalCard from "../components/DashBoard/GoalCard";
import { FaTasks, FaPaintBrush, FaDumbbell, FaBrain, FaBookReader } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { GiInnerSelf, GiKnifeFork } from "react-icons/gi";
import "../assets/Styles/Dashboard.css";

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

  return (
    <div>
      {/* Header */}
      <Header setShowModal={openCreateModal} />

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
        {/* Section: Map Your Path */}
        <div style={{ marginBottom: "40px", textAlign: "left" }}>
          <h3 style={{ color: "#6c5ce7", fontWeight: "normal", marginBottom: "5px" }}>Map Your Path</h3>
          <p style={{ marginTop: 0 }}>Use the calendar to track your pathways.</p>

          {/* Goal Calendar Component */}
          <div style={{ marginTop: "20px" }}>
            <GoalCalendar />
          </div>
        </div>

        {/* Section: Create Your Path */}
        <div>
          <h3 className="mb-0">Create Your Path... Follow Your Progress</h3>
          <p className="text-muted mb-0">"Motivation is what gets you started. A Habit is what keeps you going."</p>
        </div>

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
      </div>

      {/* Goal Modal */}
      {isModalOpen && <GoalModal show={isModalOpen} handleClose={closeModal} categories={categoryOptions} />}
    </div>
  );
};

export default Dashboard;









