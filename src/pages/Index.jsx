import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';

function Progress() {
  return (
    <div className="p-8 text-center text-gray-500">
      <h2 className="text-xl font-semibold mb-4">Progress Component</h2>
      <p>Content for the Progress component goes here.</p>
    </div>
  );
}

function DataNotFound() {
  return (
    <div className="p-8 text-center text-gray-500">
      <h2 className="text-xl font-semibold mb-4">Data Not Found / Only Event Panel is Working Right Now</h2>
      <p>No data available for this section.</p>
    </div>
  );
}

export default function Index() {
  const [selectedMenu, setSelectedMenu] = useState('Events');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Events':
        return <Calendar />;
      case 'Progress':
        return <Progress />;
      default:
        return <DataNotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onMenuSelect={setSelectedMenu} />
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
}
