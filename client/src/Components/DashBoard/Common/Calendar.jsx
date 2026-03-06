import { useMemo } from "react";
import React from "react";
function Calendar() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11
  const currentDate = today.getDate();

  const monthName = today.toLocaleString("default", { month: "long" });

  const { daysInMonth, firstDayIndex } = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay(); // 0-6 (Sun-Sat)
    const totalDays = new Date(year, month + 1, 0).getDate();
    return {
      daysInMonth: totalDays,
      firstDayIndex: firstDay,
    };
  }, [year, month]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-semibold mb-4">
        Calendar - {monthName} {year}
      </h3>

      <div className="grid grid-cols-7 text-center text-sm gap-2">

        {/* Days Header */}
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((day) => (
          <div key={day} className="font-medium text-gray-600">
            {day}
          </div>
        ))}

        {/* Empty spaces before first day */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Actual Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNumber = i + 1;
          const isToday = dayNumber === currentDate;

          return (
            <div
              key={dayNumber}
              className={`p-2 rounded-lg cursor-pointer transition ${
                isToday
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;