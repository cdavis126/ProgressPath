import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import "./GoalCalendar.css";  // ✅ Import the CSS file

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

  const pathways = [
    { name: "Meditation", color: "#74b9ff" },
    { name: "Sleeping", color: "#55efc4" },
    { name: "Fitness", color: "#ffeaa7" },
    { name: "Nutrition", color: "#fab1a0" },
    { name: "Mindfulness", color: "#a29bfe" },
  ]; // ✅ Dynamic values with colors

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
      className: newEvent.pathway.replace(/\s+/g, ''),
    };

    setEvents([...events, eventToAdd]);
    setShowModal(false);
    setNewEvent({ title: "", pathway: "", location: "", additionalInfo: "", date: "" });
  };

  return (
    <div className="GoalCalendar">
      <h2>Map Your Path</h2>
      <p>Use the calendar to track your path!</p>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
      />

      {/* ✅ Event Form Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Event</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Event Title: <span className="required">*</span>
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />

              <label>Pathway:</label>
              <select
                value={newEvent.pathway}
                onChange={(e) => setNewEvent({ ...newEvent, pathway: e.target.value })}
                required
              >
                <option value="">Select Pathway</option>
                {pathways.map((path) => (
                  <option
                    key={path.name}
                    value={path.name}
                    style={{
                      backgroundColor: path.color,
                      color: "#fff",
                    }}
                  >
                    {path.name}
                  </option>
                ))}
              </select>

              <label>Location:</label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />

              <label>Additional Information (max 500 characters):</label>
              <textarea
                value={newEvent.additionalInfo}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, additionalInfo: e.target.value.slice(0, 500) })
                }
                maxLength={500}
                rows={4}
              />

              <button type="submit">Add Event</button>
            </form>
            <button className="cancel-button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCalendar;