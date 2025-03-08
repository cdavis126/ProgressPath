import { Modal, Button, Form } from "react-bootstrap";
import { useGoals } from "../../context/goalContext";
import { useState, useEffect } from "react";

type GoalStatus = "To Do" | "Active" | "Complete";

interface GoalModalProps {
  show: boolean;
  handleClose: () => void;
  categories: { value: string; label: string }[];
}

const GoalModal = ({ show, handleClose, categories }: GoalModalProps) => {
  const { goal, createGoal, updateGoal, modalMode } = useGoals();

  const defaultCategory = categories.length > 0 ? categories[0].value : "misc";
  const defaultStatus: GoalStatus = "To Do";

  const initialGoalState: { _id: string; title: string; description: string; category: string; status: GoalStatus } = {
    _id: "",
    title: "",
    description: "",
    category: defaultCategory,
    status: defaultStatus,
  };

  const [localGoal, setLocalGoal] = useState(initialGoalState);


  useEffect(() => {
    if (modalMode === "edit" && goal) {
      setLocalGoal({ ...goal, status: goal.status as GoalStatus });
    } else {
      setLocalGoal(initialGoalState);
    }
  }, [goal, modalMode, show]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setLocalGoal((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as GoalStatus) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === "edit" && localGoal._id) {
      await updateGoal(localGoal._id, {
        title: localGoal.title,
        description: localGoal.description,
        category: localGoal.category,
        status: localGoal.status,
      });
    } else {
      await createGoal(localGoal.title, localGoal.description, localGoal.category, localGoal.status);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === "edit" ? "Edit Your Goal" : "Create A Goal"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Goal Title */}
          <Form.Group className="mb-3">
            <Form.Label>Path Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter goal title"
              name="title"
              value={localGoal.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Goal Description */}
          <Form.Group className="mb-3">
            <Form.Label>Path Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter goal description"
              name="description"
              value={localGoal.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Category Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Path Category</Form.Label>
            <Form.Select name="category" value={localGoal.category} onChange={handleInputChange}>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Status Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Path Status</Form.Label>
            <Form.Select name="status" value={localGoal.status} onChange={handleInputChange}>
              <option value="To Do">To Do</option>
              <option value="Active">Active</option>
              <option value="Complete">Complete</option>
            </Form.Select>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {modalMode === "edit" ? "Update Goal" : "Create Goal"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GoalModal;
