import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            const { token, admin } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("admin", JSON.stringify(admin));

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-left">
                <div className="brand">
                    <div className="brand-icon">🎓</div>
                    <h1>Student<span>MS</span></h1>
                </div>

                <div className="welcome-content">
                    <h2>Manage your students<br />with ease.</h2>

                    <p>
                        A simple and powerful student management
                        system for managing your academic data.
                    </p>

                    <div className="features">
                        <div>✓ Student Management</div>
                        <div>✓ Secure Authentication</div>
                        <div>✓ Easy Dashboard</div>
                    </div>
                </div>
            </div>

            <div className="login-right">

                <div className="login-card">

                    <div className="mobile-brand">
                        🎓 Student<span>MS</span>
                    </div>

                    <h2>Welcome Back 👋</h2>

                    <p className="login-subtitle">
                        Sign in to your admin account
                    </p>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In →"}
                        </button>

                    </form>

                    <p className="login-footer">
                        Student Management System
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;