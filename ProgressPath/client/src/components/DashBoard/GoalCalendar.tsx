import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";

const GoalCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null); 

  const events: EventInput[] = [
    { title: "Workout", date: "2025-03-01" },
    { title: "Meditation", date: "2025-03-03" },
    { title: "Run 5K", date: "2025-03-07" },
  ];

  return (
    <div>
      <h2>Goal Calendar</h2>
      <FullCalendar
        ref={calendarRef} // Fixes "refs missing" error
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={(info: DateClickArg) => alert(`Selected date: ${info.dateStr}`)}
      />
    </div>
  );
};

export default GoalCalendar;






