import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Pagination from "../components/Pagination";
import "../App.css";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;

    const [filters, setFilters] = useState({
        category: "",
        location: "",
        date: "",
    });
    const [query, setQuery] = useState(filters);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    useEffect(() => {
        axios.get("/events", { params: filters }).then((res) => setEvents(res.data));
    }, [filters]);

    return (
        <div className="container">
            <h1>Events</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Category"
                    value={query.category}
                    onChange={(e) => setQuery({ ...query, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={query.location}
                    onChange={(e) => setQuery({ ...query, location: e.target.value })}
                />
                <input
                    type="date"
                    value={query.date}
                    onChange={(e) => setQuery({ ...query, date: e.target.value })}
                />
                <button onClick={() => setFilters(query)}>Search</button>
            </div>

            <ul className="event-list">
                {currentEvents.map((event) => (
                    <li key={event.id} className="event-item">
                        <h2>{event.title}</h2>
                        <p>{format(new Date(event.date), "MMMM dd, yyyy")}</p>
                        <p>{event.location} — {event.category}</p>
                    </li>
                ))}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(events.length / eventsPerPage)}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Home;
