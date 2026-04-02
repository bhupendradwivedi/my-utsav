import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getEvents,
  getEventById,
  createEvent,
  deleteEventById,
} from "../services/eventService";

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const { currentUser } = useAuth(); // ✅ added
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data || []);
      setError("");
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventById = async (id) => {
    try {
      setLoading(true);
      const data = await getEventById(id);
      setSelectedEvent(data || null);
      setError("");
    } catch (err) {
      console.error("Error fetching event details:", err);
      setError("Unable to load event details.");
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    try {
      setLoading(true);
      const data = await createEvent(eventData);
      if (data?.success) {
        setEvents((prev) => [...prev, data.event]);
        setError("");
      } else {
        setError(data?.message || "Failed to create event.");
      }
      return data;
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event.");
      return { success: false, message: "Failed to create event." };
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (id) => {
    try {
      setLoading(true);
      const data = await deleteEventById(id);
      if (data?.success) {
        setEvents((prev) => prev.filter((event) => event._id !== id));
        setError("");
      } else {
        setError(data?.message || "Failed to delete event.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: only fetch if logged in
  useEffect(() => {
    if (currentUser) {
      fetchEvents();
    }
  }, [currentUser]);

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        loading,
        error,
        fetchEvents,
        fetchEventById,
        addEvent,
        removeEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);