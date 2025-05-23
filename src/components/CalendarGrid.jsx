import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CalendarGrid({ currentDate, events, selectedDate, onDateSelect, onEventSelect }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getEventsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.filter((event) => event.date === dateStr);
  };

  const hasConflicts = (dateEvents) => {
    if (dateEvents.length <= 1) return false;

    for (let i = 0; i < dateEvents.length; i++) {
      for (let j = i + 1; j < dateEvents.length; j++) {
        const event1 = dateEvents[i];
        const event2 = dateEvents[j];

        const start1 = event1.startTime;
        const end1 = event1.endTime;
        const start2 = event2.startTime;
        const end2 = event2.endTime;

        if (start1 < end2 && end1 > start2) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="flex-1 bg-white">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="px-4 py-3 text-sm font-medium text-gray-500 text-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1">
        {days.map((day, dayIdx) => {
          const dayEvents = getEventsForDate(day);
          const hasTimeConflicts = hasConflicts(dayEvents);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              className={cn(
                'min-h-[120px] border-b border-r border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors',
                !isCurrentMonth && 'bg-gray-50',
                isSelected && 'bg-blue-50',
                dayIdx % 7 === 6 && 'border-r-0'
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    'text-sm font-medium',
                    !isCurrentMonth && 'text-gray-400',
                    isCurrentDay &&
                      'bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold'
                  )}
                >
                  {format(day, 'd')}
                </span>
                {hasTimeConflicts && (
                  <div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    title="Time conflicts detected"
                  />
                )}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded text-white truncate cursor-pointer"
                    style={{ backgroundColor: event.color }}
                    title={`${event.title} (${event.startTime} - ${event.endTime})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventSelect(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 p-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
