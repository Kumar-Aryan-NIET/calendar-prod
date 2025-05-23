import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventSidebar from './EventSidebar';
import EventDetailCard from './EventDetailCard';
import useCalendar from '../hooks/useCalendar';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { currentDate, navigateMonth, events, updateEvents } = useCalendar();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
  };

  const handleCloseEventDetail = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="flex h-screen bg-white relative">
      <div className="flex-1 flex flex-col">
        <CalendarHeader currentDate={currentDate} onNavigate={navigateMonth} />
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onEventSelect={handleEventSelect}
        />
      </div>
      <EventSidebar
        selectedDate={selectedDate}
        events={events}
        onClose={() => {
          setSelectedDate(null);
          setSelectedEvent(null);
        }}
        updateEvents={updateEvents}
        onEventSelect={handleEventSelect}
      />
      {selectedEvent && (
        <EventDetailCard event={selectedEvent} onClose={handleCloseEventDetail} />
      )}
    </div>
  );
}
