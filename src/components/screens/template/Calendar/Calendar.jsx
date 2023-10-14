import React, { useState } from 'react';

const Calendar = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Генерируем массив с числами от 1 до количества дней в месяце
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <h2>{currentDate.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric' })}</h2>
      <div className="days">
        {daysArray.map((day) => (
          <div
            key={day}
            className={`day ${day === selectedDate ? 'selected' : ''}`}
            onClick={() => setSelectedDate(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
