import React from 'react';
import Modal from 'react-modal';
import './addgoalmodal.css';

interface AddGoalModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Goal"
      className="add-goal-modal"
      overlayClassName="add-goal-modal-overlay"
    >
      <h2>Start A New Path</h2>
      <form>
        <label>
          Path Title:
          <input type="text" name="title" placeholder="Enter new path" />
        </label>
        <label>
          Path Description:
          <input type="text" name="description" placeholder="Enter brief path description" />
        </label>
        <label>
          Path Motivation:
          <input type="text" name="motivation" placeholder="Enter an inspirational quote" />
        </label>
        <label>
          Category:
          <select name="category">
            <option value="health">Health</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
            <option value="weight">Weight</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AddGoalModal;
