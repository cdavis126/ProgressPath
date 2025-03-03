import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

const GoalCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    pathway: "",
    location: "",
    additionalInfo: "",
    date: "",
  });

  const pathways = ["Meditation", "Sleeping", "Fitness", "Nutrition", "Mindfulness"]; // ✅ Dynamic values

  const handleDateClick = (info: any) => {
    setNewEvent({ ...newEvent, date: info.dateStr });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) {
      alert("Event title is required.");
      return;
    }

    const eventToAdd: EventInput = {
      title: `${newEvent.title} (${newEvent.pathway})`,
      date: newEvent.date,
      extendedProps: {
        location: newEvent.location,
        additionalInfo: newEvent.additionalInfo,
      },
    };

    setEvents([...events, eventToAdd]);
    setShowModal(false);
    setNewEvent({ title: "", pathway: "", location: "", additionalInfo: "", date: "" });
  };

  return (
    <div>
      <h2>Goal Calendar</h2>

      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick} // ✅ Click date to open modal
      />

      {/* ✅ Event Form Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            borderRadius: "8px",
            width: "400px",
          }}
        >
          <h3>Add New Event</h3>
          <form onSubmit={handleSubmit}>
            {/* Event Title */}
            <label>
              Event Title: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            {/* Pathway (Dropdown) */}
            <label>Pathway:</label>
            <select
              value={newEvent.pathway}
              onChange={(e) => setNewEvent({ ...newEvent, pathway: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            >
              <option value="">Select Pathway</option>
              {pathways.map((path) => (
                <option key={path} value={path}>
                  {path}
                </option>
              ))}
            </select>

            {/* Location */}
            <label>Location:</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            {/* Additional Info (500 character limit) */}
            <label>Additional Information (max 500 characters):</label>
            <textarea
              value={newEvent.additionalInfo}
              onChange={(e) =>
                setNewEvent({ ...newEvent, additionalInfo: e.target.value.slice(0, 500) })
              }
              maxLength={500}
              rows={4}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                backgroundColor: "#6c5ce7",
                color: "#fff",
                padding: "10px",
                width: "100%",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add Event
            </button>
          </form>

          {/* Cancel Button */}
          <button
            onClick={() => setShowModal(false)}
            style={{
              marginTop: "10px",
              backgroundColor: "#ff4757",
              color: "#fff",
              padding: "8px",
              width: "100%",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalCalendar;









