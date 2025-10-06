import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        otp: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSignup = async () => {
        try {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        alert("Please fill in all required fields");
        return;
    }
            const response = await api.post("/signup", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 200) {
                navigate('/login')
            }
        } catch (error) {
            if (error.status === 409) {
                alert("Email already registered please use different one.");
            } else {
                alert("Please enter correct email format");
            }
        }
    };

    return (
        <div className="container-fluid-signup">
            <div className="col-12 col-md-4 col-lg-6">
                <h2
                    className="text-center mb-4"
                    style={{
                        fontFamily: '"Delius Swash Caps", cursive',
                        fontWeight: 1000,
                        fontStyle: "normal",
                    }}
                >
                    Sign Up
                </h2>
                <div id="forms" className="container custom-form-width">
                    <form>
                        <div className="mb-3">
                            <label className="form-label mb-0 text-custom">
                                <strong>First Name</strong>
                            </label>
                            <input
                                type="text"
                                name="firstName"                  
                                value={formData.firstName}        
                                onChange={handleChange}
                                className="form-control rounded-3 custom-width"
                                placeholder="Enter your first name here"
                                required
                                style={{ background: "rgb(253, 252, 218)" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label mb-0 text-custom">
                                <strong>Last Name</strong>
                            </label>
                            <input
                                type="text"
                                name="lastName"                   
                                value={formData.lastName}         
                                onChange={handleChange}
                                className="form-control rounded-3 custom-width"
                                placeholder="Enter your last name here"
                                required
                                style={{ background: "rgb(253, 252, 218)" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label mb-0 text-custom">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control rounded-3 custom-width"
                                placeholder="Enter your Email Id here"
                                required
                                style={{ background: "rgb(253, 252, 218)" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label mb-0 text-custom">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control rounded-3 custom-width"
                                placeholder="Enter the password here"
                                required
                                style={{ background: "rgb(253, 252, 218)" }}
                            />
                        </div>

                        <div className="button-mar">
                            {(
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={handleSignup}          
                                >
                                    <strong>Save & Login</strong>
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                style={{
                                    background: "linear-gradient(90deg, #6C63FF, #9D84FF)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "25px",
                                    marginTop:"10px",
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
                                Already have an account? Login
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
