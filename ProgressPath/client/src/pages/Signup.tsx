import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import NavLimited from "../components/Navbar/NavLimited";
import "../assets/styles/signup.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addUser, { loading }] = useMutation(ADD_USER);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle signup form submission
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const { data } = await addUser({
        variables: { ...formData },
      });

      console.log("Debugging Signup Response:", data); // ✅ Debugging response

      if (!data || !data.addUser || !data.addUser.token) {
        throw new Error("Signup failed. No token received.");
      }

      console.log("Signup Successful! Token:", data.addUser.token);

      // Corrected to use AuthService.login() instead of AuthService.signup()
      AuthService.login(data.addUser.token);

    } catch (err: any) {
      console.error("Signup error:", err);
      setErrorMessage(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <NavLimited />

      <Container className="signup-container mt-5">
        <Row className="align-items-center">
          {/* Left Side - Signup Form */}
          <Col md={6} className="form-section">
            <h2 className="text-dark">Sign Up</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            
            <Form onSubmit={handleSignUp}>
              <Form.Group controlId="username" className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
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
