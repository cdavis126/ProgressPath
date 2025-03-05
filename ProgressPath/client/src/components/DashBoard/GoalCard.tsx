import React, { useState, useEffect } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { useGoals } from "../../context/goalContext";

interface Goal {
  _id: string;
  title: string;
  category: string;
  description: string;
  status: "To Do" | "Active" | "Complete";
}

interface GoalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  goal: Goal;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: Goal["status"]) => void;
  handleDetails?: () => void;
  categories: Record<string, { color: string; textColor: string; icon: JSX.Element; label: string }>;
}

const STATUS_LEVELS: { label: Goal["status"]; value: number }[] = [
  { label: "To Do", value: 0 },
  { label: "Active", value: 50 },
  { label: "Complete", value: 100 },
];

const GoalCard = ({ goal, onDelete, onStatusChange, handleDetails, categories, className = "", ...props }: GoalCardProps) => {
  const { openEditModal } = useGoals();
  const [localStatus, setLocalStatus] = useState(goal.status);

  // This should sync when the goal card status is updated - NOT WORKING / WORKING????
  useEffect(() => {
    setLocalStatus(goal.status);
  }, [goal.status]);

  // Convert status to slider value - NOT WORKING / WORKING????
  const getStatusValue = (status: Goal["status"]) => STATUS_LEVELS.find((s) => s.label === status)?.value || 0;

  // Status change via slider - NOT WORKING / WORKING????
  const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    const newStatus = STATUS_LEVELS.find((s) => s.value === newValue)?.label || "To Do";

    setLocalStatus(newStatus);
    try {
      await onStatusChange(goal._id, newStatus);
    } catch {
      setLocalStatus(goal.status);
    }
  };

  const categoryData = categories[goal.category] || { color: "#95a5a6", textColor: "#000", icon: null, label: "Unknown" };

  return (
    <div
      className={`goal-card ${className}`}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "250px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s ease-in-out",
      }}
      {...props}
    >
      {/* Category & Delete Button */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span
          className="badge d-flex align-items-center gap-1"
          style={{
            backgroundColor: categoryData.color,
            color: categoryData.textColor,
            borderRadius: "12px",
            padding: "6px 10px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {categoryData.icon} {categoryData.label}
        </span>
        <button className="btn p-1" style={{ background: "transparent", border: "none" }} onClick={() => onDelete(goal._id)}>
          <BsTrash3 size={16} />
        </button>
      </div>

      {/* Goal Title & Description */}
      <h5 style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }} onClick={handleDetails}>
        {goal.title}
      </h5>
      <p className="text-muted" style={{ fontSize: "14px", flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {goal.description.length > 100 ? `${goal.description.substring(0, 100)}...` : goal.description}
      </p>

      {/* Status Slider & Edit Button */}
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="50"
            value={getStatusValue(localStatus)}
            onChange={handleStatusChange}
            style={{
              width: "80%",
              cursor: "pointer",
              accentColor: getStatusValue(localStatus) === 100 ? "#4CAF50" : getStatusValue(localStatus) === 50 ? "#FF9800" : "#D32F2F",
            }}
          />
          <button className="btn p-1" style={{ background: "transparent", border: "none" }} onClick={() => openEditModal(goal)}>
            <BsPencilSquare size={16} />
          </button>
        </div>

        <small style={{ fontSize: "11px", fontWeight: "bold", display: "block", textAlign: "left", marginTop: "4px" }}>
          {localStatus}
        </small>
      </div>
    </div>
  );
};

export default GoalCard;
