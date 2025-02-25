import React, { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLimited from "../components/Navbar/NavLimited"; 
import "../assets/Styles/Signup.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // TODO: Connect to backend later
  };

  return (
    <>
      {/* ✅ Added NavLimited */}
      <NavLimited />

      <Container className="signup-container mt-5">
        <Row className="align-items-center">
          {/* Left Side - Signup Form */}
          <Col md={6} className="form-section">
            <h2 className="text-dark">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="SU_username" className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="SU_username" placeholder="Enter username" value={formData.username} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="SU_email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="SU_email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="SU_password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="SU_password" placeholder="Create password" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Sign Up
              </Button>
            </Form>
            <p className="mt-3 login-text">
              Already a Member? <Link to="/login" className="bold-link">Login now!</Link>
            </p>
          </Col>

          {/* Right Side - Marketing Section */}
          <Col md={6} className="marketing-section">
            <h2 className="marketing-header">Create Your Progress Pathway Now!</h2>
            <ul className="marketing-list">
              <li>🔥 <span className="goal-text">Track your goals</span></li>
              <li>📍 <span className="goal-text">Map your progress</span></li>
              <li>💡 <span className="goal-text">Find inspiration for your path</span></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
