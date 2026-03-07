import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React from "react";
import { generateEvents } from "../../../utils/common/generateevents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { patients } from "../../../Data/patientdata";

const localizer = momentLocalizer(moment);

const events = generateEvents(patients);
const now = new Date();

export default function Scheduler() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Doctor Appointment Scheduler
      </h2>

      <Calendar
        localizer={localizer}
        events={events}
        titleAccessor="title"
        startAccessor="start"
        endAccessor="end"
        views={["day", "week"]}
        defaultView="day"
        style={{ height: 500 }}
		scrollToTime={now}
		
      />
    </div>
  );
}