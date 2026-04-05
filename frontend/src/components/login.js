import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:5001`;

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        user,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/sales");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.status === 401
          ? "Invalid username or password."
          : "Login failed. Please make sure the backend server is running on port 5001."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-copy">
          <p className="eyebrow">SalesPilot</p>
          <h1>Admin analytics workspace</h1>
          <p className="login-subtitle">
            Track revenue, manage sales records, and keep your internal dashboard
            in one focused place.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="field-group">
            <span>Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </label>

          <label className="field-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

          <button className="primary-btn login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
