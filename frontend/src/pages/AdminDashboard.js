// src/pages/AdminDashboard.js
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Modal from "../components/Modal";
import "../App.css";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        category: "",
        location: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        if (user?.role === "admin") {
            fetchEvents();
        }
    }, [user]);

    const fetchEvents = async () => {
        const res = await axios.get("/events");
        setEvents(res.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`/events/${editingId}`, formData);
        } else {
            await axios.post("/events", formData);
        }
        fetchEvents();
        resetForm();
    };

    const handleEdit = (event) => {
        setEditingId(event.id);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date.split("T")[0],
            category: event.category,
            location: event.location,
        });
    };

    const handleDeleteClick = (id) => {
        setEventToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        await axios.delete(`/events/${eventToDelete}`);
        setEvents(events.filter((e) => e.id !== eventToDelete));
        setShowModal(false);
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", date: "", category: "", location: "" });
        setEditingId(null);
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>

            <h2>{editingId ? "Edit Event" : "Create Event"}</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <button type="submit">{editingId ? "Update" : "Create"}</button>
            </form>

            <h2>All Events</h2>
            <ul className="event-list">
                {events.map((event) => (
                    <li key={event.id} className="event-item">
                        <strong>{event.title}</strong> – {event.date.split("T")[0]} – {event.category}
                        <div style={{ marginTop: "0.5rem" }}>
                            <button onClick={() => handleEdit(event)}>Edit</button>
                            <button onClick={() => handleDeleteClick(event.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this event?"
            />
        </div>
    );
};

export default AdminDashboard;
