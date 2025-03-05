import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import NavLimited from "../components/Navbar/NavLimited";
import "../assets/styles/login.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });

      console.log("Debugging Login Response:", data); // ✅ Debugging response

      if (!data || !data.loginUser || !data.loginUser.token) {
        throw new Error("Login failed. No token received.");
      }

      console.log("Login Successful! Token:", data.loginUser.token);

      AuthService.login(data.loginUser.token);

    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <NavLimited />

      <Container className="login-container mt-5">
        <Row className="align-items-center">
          {/* Left Side - Login Form */}
          <Col md={6} className="form-section">
            <h2 className="text-dark">Log In</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
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


