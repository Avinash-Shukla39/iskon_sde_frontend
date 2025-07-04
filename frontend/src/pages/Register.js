// src/pages/Register.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "../api/axiosInstance";
import "../App.css";
import { registerUser } from "../api/auth"; // Update the import

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required.");
            return;
        }

        try {
    const res = await registerUser(formData); // Use this instead of axios.post
    login(res.data.user, res.data.token);
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed.");
  }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
