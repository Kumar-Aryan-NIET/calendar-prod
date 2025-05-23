import React, { useState, useEffect, createContext, useContext } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export default function Toaster() {
  const [toasts, setToasts] = useState([]);

  const addToast = (content) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, content }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <>
        {toasts.length > 0 && (
          <div className="fixed top-5 right-5 space-y-2 z-50">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className="bg-gray-800 text-white px-4 py-2 rounded shadow"
              >
                {toast.content}
              </div>
            ))}
          </div>
        )}
      </>
    </ToastContext.Provider>
  );
}
