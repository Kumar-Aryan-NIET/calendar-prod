import { useState } from 'react';

export default function Sidebar({ onMenuSelect }) {
  const [selectedMenu, setSelectedMenu] = useState('Events');

  const menuItems = [
    { key: 'Home', icon: '🏠' },
    { key: 'Programs', icon: '📋' },
    { key: 'Events', icon: '📅' },
    { key: 'Memberships', icon: '👥' },
    { key: 'Documents', icon: '📄' },
    { key: 'Payments', icon: '💳' },
    { key: 'People', icon: '👥' },
    { key: 'Communication', icon: '💬' },
    { key: 'Notifications', icon: '🔔'},
    { key: 'Search', icon: '🔍', shortcut: '⌘K' },
  ];

  const handleClick = (key) => {
    setSelectedMenu(key);
    if (onMenuSelect) {
      onMenuSelect(key);
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <span className="font-semibold text-gray-900">Survey Spparow</span>
        </div>

        <nav className="space-y-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Manage
          </div>
          {menuItems.map(({ key, icon, badge, shortcut }) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
                selectedMenu === key
                  ? 'bg-purple-100 text-purple-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className={`w-5 h-5 ${selectedMenu === key ? 'text-purple-600' : 'text-gray-400'}`}>
                {icon}
              </span>
              <span>{key}</span>
              {badge && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {badge}
                </span>
              )}
              {shortcut && (
                <span className="ml-auto text-xs text-gray-400">
                  {shortcut}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
