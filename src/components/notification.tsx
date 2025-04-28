import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { selectNotifications } from '@/containers/Notification/selector';
import { useSelector } from 'react-redux';
import { NotificationDto } from '@/common/models/notification';

interface NotificationDropdownProps {
  notificationCount: number;
  isLoading?: boolean;
  errorMessage?: string;
  currentPage: number;
  totalPages: number;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notificationCount,
  isLoading,
  errorMessage,
  currentPage,
  totalPages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifications = useSelector(selectNotifications);

  // Đóng dropdown khi click ngoài
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
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2">
        <Bell className="w-6 h-6 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition" />
        {notificationCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </button>

      <AnimatePresence>
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

            {/* Handling loading, error, and empty states */}
            {isLoading ? (
              <div className="flex justify-center items-center py-6">
                <span className="text-gray-500 dark:text-gray-400">
                  Đang tải...
                </span>
              </div>
            ) : errorMessage ? (
              <div className="flex justify-center items-center py-6">
                <span className="text-red-500">{errorMessage}</span>
              </div>
            ) : notifications.length > 0 ? (
              <ul className="space-y-2 max-h-80 overflow-auto">
                {notifications.map(
                  (notification: NotificationDto, index: number) => (
                    <li
                      key={index}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {notification.content}
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <div className="flex flex-col justify-center items-center py-6">
                <span className="text-gray-500 dark:text-gray-400">
                  Không có thông báo nào.
                </span>
              </div>
            )}

            {/* Hiển thị thông tin phân trang nếu có nhiều trang */}
            {totalPages > 1 && (
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Trang {currentPage} / {totalPages}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
