import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../App.css";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h1 className="logo">Event Management</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                {user ? (
                    <>
                        {user.role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}
                        <li><button onClick={logout} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
