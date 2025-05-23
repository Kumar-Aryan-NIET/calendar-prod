import React from 'react';

export default function EventDetailCard({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close event details"
        >
          &#10005;
        </button>
        <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
        <div className="mb-2">
          <span className="font-semibold">Date: </span>{event.date}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Time: </span>{event.startTime} - {event.endTime}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Color: </span>
          <span
            className="inline-block w-5 h-5 rounded"
            style={{ backgroundColor: event.color }}
          />
        </div>
        {event.description && (
          <div className="mb-2">
            <span className="font-semibold">Description: </span>{event.description}
          </div>
        )}
      </div>
    </div>
  );
}
