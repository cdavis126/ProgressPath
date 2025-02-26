import React from 'react';
import './goaldisplay.css';
import { FaRunning, FaAppleAlt, FaDumbbell, FaWeight } from 'react-icons/fa';

const GoalDisplay: React.FC = () => {
  return (
    <div className="goal-display">
      <h1>Goals</h1>
      <h3>“Motivation is what gets you started. Habit is what keeps you going.”</h3>
      <div className="goal-grid">
      <div className="goal-card">
          <FaDumbbell className="goal-icon" />
          <h3>Mindset Goals</h3>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaRunning className="goal-icon" />
          <h3>Creativity Goals</h3>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaDumbbell className="goal-icon" />
          <h3>Growth Goals</h3>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaAppleAlt className="goal-icon" />
          <h3>Nutrition Goals</h3>
          <p>Goal Description</p>
        </div>
        <div className="goal-card">
          <FaWeight className="goal-icon" />
          <h3>Fitness Goals</h3>
          <p>Goal Description</p>
        </div>
      </div>
    </div>
  );
};

export default GoalDisplay;
