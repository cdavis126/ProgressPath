import React from 'react';
import './goaldisplay.css';
import { FaRunning, FaAppleAlt, FaDumbbell, FaWeight } from 'react-icons/fa';

const GoalDisplay: React.FC = () => {
  return (
    <div className="goal-display">
      <h3>Goals</h3>
      <h5>“Motivation is what gets you started. Habit is what keeps you going.”</h5>
      <div className="goal-grid">
      <div className="goal-card">
          <FaDumbbell className="goal-icon" />
          <h4>Mindset Goals</h4>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaRunning className="goal-icon" />
          <h4>Creativity Goals</h4>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaDumbbell className="goal-icon" />
          <h4>Growth Goals</h4>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaAppleAlt className="goal-icon" />
          <h4>Nutrition Goals</h4>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaWeight className="goal-icon" />
          <h4>Fitness Goals</h4>
          <p>Goal Description</p>
        </div>
      </div>
    </div>
  );
};

export default GoalDisplay;
