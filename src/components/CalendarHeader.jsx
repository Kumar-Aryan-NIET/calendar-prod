import { format } from 'date-fns';

export default function CalendarHeader({ currentDate, onNavigate }) {
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('prev')}
              className="h-8 w-8 p-0 rounded hover:bg-gray-100 flex items-center justify-center"
              aria-label="Previous Month"
            >
              &#8592;
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="h-8 w-8 p-0 rounded hover:bg-gray-100 flex items-center justify-center"
              aria-label="Next Month"
            >
              &#8594;
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
        </div>
      </div>
    </div>
  );
}
