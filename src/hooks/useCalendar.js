import { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import defaultEvents from '../data/events.json';

const LOCAL_STORAGE_KEY = 'calendarEvents';

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultEvents));
    }
  }, []);

  const navigateMonth = (direction) => {
    setCurrentDate((prev) =>
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newEvents));
  };

  return {
    currentDate,
    navigateMonth,
    events,
    updateEvents,
  };
}
