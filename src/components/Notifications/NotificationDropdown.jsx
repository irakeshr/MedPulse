import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '../../redux/notificationSlice';
import NotificationCard from './NotificationCard';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { notifications, unreadCount, loading, page, totalPages } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications({ page: 1, limit: 20 }));
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(fetchNotifications({ page: page + 1, limit: 20 }));
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full mt-2 w-96 max-h-[500px] bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2a3c3c] overflow-hidden z-50 transition-all duration-200 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-[#2a3c3c] bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-med-dark dark:text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto max-h-[400px] scrollbar-hide">
        {loading && notifications.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 mb-2">
              notifications_off
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">No notifications yet</p>
          </div>
        ) : (
          <>
            <div className="py-1">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            {page < totalPages && (
              <div className="p-3 border-t border-gray-100 dark:border-[#2a3c3c]">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-100 dark:border-[#2a3c3c] bg-gray-50 dark:bg-[#152626]">
        <button
          onClick={onClose}
          className="w-full py-2 text-xs font-medium text-gray-500 hover:text-primary transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
