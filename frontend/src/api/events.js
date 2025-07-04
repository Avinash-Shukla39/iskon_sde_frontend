import axios from "./axiosInstance";

export const getEvents = (filters = {}) => axios.get("/events", { params: filters });
export const getEventById = (id) => axios.get(`/events/${id}`);
export const createEvent = (data) => axios.post("/events", data);
export const updateEvent = (id, data) => axios.put(`/events/${id}`, data);
export const deleteEvent = (id) => axios.delete(`/events/${id}`);
export const registerForEvent = (id) => axios.post(`/events/${id}/register`);
