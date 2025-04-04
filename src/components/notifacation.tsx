import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

interface NotificationDropdownProps {
  notificationCount: number;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notificationCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="relative p-2">
        <Bell className="w-6 h-6 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition" />
        {notificationCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-black shadow-lg rounded-lg p-4 z-50 border dark:border-gray-700"
        >
          <h4 className="font-semibold text-gray-700 dark:text-white mb-2">
            Thông báo
          </h4>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
              🔔 Bạn có một tin nhắn mới!
            </li>
            <li className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
              📅 Sự kiện quan trọng sắp diễn ra.
            </li>
            <li className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
              ✅ Nhiệm vụ của bạn đã hoàn thành.
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationDropdown;
