import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/ApiService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    if (strength === 1) return "strength-weak";
    else if (strength === 2 || strength === 3) return "strength-medium";
    else if (strength === 4) return "strength-strong";
    return "";
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password
      };
      
      const response = await ApiService.register(userData);
      
      if (response.token) {
        login(response);
        alert("Account created successfully!");
        navigate("/");
      } else {
        alert(response.message || "Registration failed");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterWithGoogle = () => {
    alert("Google registration integration would be implemented here");
  };

  const handleRegisterWithFacebook = () => {
    alert("Facebook registration integration would be implemented here");
  };

  return (
    <>
      <style>{`
        .register-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          margin-top: 80px;

        }
        .register-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          max-width: 500px;
          width: 100%;
        }
        .register-header {
          background: var(--primary-color);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .register-body {
          padding: 40px;
        }
        .form-control {
          border-radius: 10px;
          border: 2px solid #eee;
          padding: 12px 15px;
          margin-bottom: 20px;
        }
        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(253, 119, 75, 0.25);
        }
        .btn-register {
          background: var(--primary-color);
          border: none;
          border-radius: 10px;
          padding: 12px;
          width: 100%;
          color: white;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .btn-register:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
        }
        .social-login {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .social-btn {
          flex: 1;
          padding: 10px;
          border: 2px solid #eee;
          border-radius: 10px;
          background: white;
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
        }
        .password-strength {
          height: 4px;
          border-radius: 2px;
          margin-top: 5px;
          transition: all 0.3s ease;
        }
        .strength-weak { background: #e74c3c; }
        .strength-medium { background: #f39c12; }
        .strength-strong { background: #27ae60; }
      `}</style>

      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>
              <i className="fas fa-shopping-bag me-2"></i>eValet
            </h2>
            <p className="mb-0">Create Your Account</p>
          </div>
          <div className="register-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className={`password-strength ${passwordStrength}`}></div>
                <small className="text-muted">
                  Password must be at least 8 characters
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the{" "}
                  <a href="#" className="text-decoration-none">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="newsletter">
                  Subscribe to our newsletter for updates and offers
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-register"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>Creating
                    Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus me-2"></i>Create Account
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">Or register with</small>
            </div>

            <div className="social-login">
              <button className="social-btn" onClick={handleRegisterWithGoogle}>
                <i className="fab fa-google text-danger"></i>
              </button>
              <button className="social-btn" onClick={handleRegisterWithFacebook}>
                <i className="fab fa-facebook text-primary"></i>
              </button>
            </div>

            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
