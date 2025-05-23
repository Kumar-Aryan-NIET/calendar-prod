import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function EventSidebar({ selectedDate, events, onClose, updateEvents }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    color: '#f6be23',
    description: '',
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        color: editingEvent.color,
        description: editingEvent.description || '',
      });
    } else {
      setFormData({
        title: '',
        startTime: '',
        endTime: '',
        color: '#f6be23',
        description: '',
      });
    }
  }, [editingEvent]);

  if (!selectedDate) return null;

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  let dayEvents = events.filter((event) => event.date === dateStr);
  dayEvents = dayEvents.slice().sort((a, b) => {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
    return 0;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingEvent(null);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsAdding(true);
  };

  const handleDeleteClick = (eventId) => {
    const newEvents = events.filter((e) => e.id !== eventId);
    updateEvents(newEvents);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields.');
      return;
    }

    // Check if event date/time is in the past
    const now = new Date();
    const eventStart = new Date(`${dateStr}T${formData.startTime}`);
    if (eventStart < now) {
      alert('Cannot create or update event in the past.');
      return;
    }

    // Check for time conflicts
    const conflictingEvents = events.filter((event) => {
      if (editingEvent && event.id === editingEvent.id) return false;
      if (event.date !== dateStr) return false;
      return (
        (formData.startTime < event.endTime && formData.endTime > event.startTime)
      );
    });

    if (conflictingEvents.length > 0) {
      alert('Warning: This event conflicts with existing events.');
      // Allow creation/update despite conflict
    }

    if (editingEvent) {
      // Update existing event
      const newEvents = events.map((e) =>
        e.id === editingEvent.id ? { ...e, ...formData, date: dateStr } : e
      );
      updateEvents(newEvents);
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        date: dateStr,
        ...formData,
      };
      updateEvents([...events, newEvent]);
    }
    setIsAdding(false);
    setEditingEvent(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingEvent(null);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{format(selectedDate, 'EEEE, MMMM d')}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close sidebar"
        >
          &#10005;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isAdding ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time *</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="mt-1 block w-full h-8 p-0 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {editingEvent ? 'Update' : 'Add'} Event
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : dayEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📅</div>
            <p className="text-gray-500">No events scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onEventSelect && onEventSelect(event)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span>⏰</span>
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>

                {event.description && (
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                )}

                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(event);
                    }}
                    className="text-purple-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(event.id);
                    }}
                    className="text-red-600 hover:underline ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isAdding && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleAddClick}
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-100"
          >
            Add New Event
          </button>
        </div>
      )}
    </div>
  );
}
