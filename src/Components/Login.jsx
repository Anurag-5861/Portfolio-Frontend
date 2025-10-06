import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios'


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            if (!email || !password) {
                alert("Please fill in all required fields");
                return;
            }
            const response = await api.post(
                "/login",
                { email, password }
            );

            const { accessJWT, refreshToken, success, message } = response.data;
            if (success) {
                localStorage.setItem("token", accessJWT);
                localStorage.setItem("refreshToken", refreshToken);
                navigate("/home");
            } else {
                setError(message || "Login failed. Please check your credentials and retry again");
            }
        } catch (err) {
            setError(
                err.response?.data ||
                "Please enter correct password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid-login">
            <div className="col-12 col-md-4 col-lg-6 mx-auto">
                <h2
                    className="text-center mb-4"
                    style={{
                        fontFamily: '"Delius Swash Caps", cursive',
                        fontWeight: 1000,
                    }}
                >
                    Login
                </h2>

                <div className="container custom-form-width">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label mb-0 text-dark">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-3 custom-width"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label mb-0 text-dark">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-3 custom-width"
                            placeholder="Enter your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value.trim())}
                        />
                    </div>

                    <div className="button-mar text-center">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Let's Go 😁"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            style={{
                                background: "linear-gradient(90deg, #6C63FF, #9D84FF)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "25px",
                                marginTop: "10px",
                                padding: "10px 20px",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                cursor: "pointer",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "translateY(-2px)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "translateY(0)")
                            }
                        >
                            Don't have a account registered yet? Signup
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
