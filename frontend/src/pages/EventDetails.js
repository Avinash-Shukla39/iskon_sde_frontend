// src/pages/EventDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        axios.get(`/events/${id}`)
            .then((res) => setEvent(res.data))
            .catch(() => setError("Event not found"));
    }, [id]);

    const registerForEvent = async () => {
        try {
            await axios.post(`/events/${id}/register`);
            setSuccess("Registered successfully!");
        } catch (err) {
            setError("Failed to register.");
        }
    };

    if (error) return <p className="error">{error}</p>;
    if (!event) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>{event.title}</h1>
            <p><strong>Date:</strong> {event.date.split("T")[0]}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <button onClick={registerForEvent}>Register</button>
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default EventDetails;
