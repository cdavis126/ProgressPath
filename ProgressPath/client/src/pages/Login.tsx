import React, { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLimited from "../components/Navbar/NavLimited"; 
import "../assets/Styles/Login.css"; 

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: Connect to backend for authentication
  };

  return (
    <>
      {/* ✅ Added NavLimited */}
      <NavLimited />

      <Container className="login-container mt-5">
        <Row className="align-items-center">
          {/* Left Side - Login Form */}
          <Col md={6} className="form-section">
            <h2 className="text-dark">Log In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Log In
              </Button>
            </Form>
            <p className="mt-3 signup-text">
              New user? <Link to="/signup" className="bold-link">Sign Up Now!</Link>
            </p>
          </Col>

          {/* Right Side - Marketing Section */}
          <Col md={6} className="marketing-section">
            <h2 className="marketing-header">Congrats on your Progress! Continue Your Pathway Now.</h2>
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

export default Login;
