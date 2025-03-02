import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, CalendarOptions } from "@fullcalendar/core"; // Import CalendarOptions
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Define event type
interface GoalEvent {
  title: string;
  date: string;
}

const GoalCalendar: React.FC = () => {
  const [events, setEvents] = useState<GoalEvent[]>([
    { title: "Workout", date: "2025-03-01" },
    { title: "Meditation", date: "2025-03-03" }
  ]);

  // Handle clicking a date to add an event
  const handleDateClick = (info: { dateStr: string }) => {
    const newEvent: GoalEvent = { title: "New Goal", date: info.dateStr };
    setEvents((prev: GoalEvent[]) => [...prev, newEvent]); // Fix prev type error
  };

  // Handle clicking an event to delete it
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Delete "${clickInfo.event.title}"?`)) {
      setEvents((prev: GoalEvent[]) => prev.filter((event) => event.title !== clickInfo.event.title));
    }
  };

  return (
    <div id="full-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
      />
    </div>
  );
};

export default GoalCalendar;


