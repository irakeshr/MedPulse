import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, fetchUnreadCount } from '../../redux/notificationSlice';
import { socket } from '../../socket';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useSelector((state) => state.notifications);
  const { profile } = useSelector((state) => state.userDetail);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && profile?._id) {
      dispatch(fetchUnreadCount());
      
      // Connect socket and join user's room
      socket.connect();
      socket.emit('join_room', profile._id);
    }

    return () => {
      if (profile?._id) {
        socket.emit('leave_room', profile._id);
      }
    };
  }, [isAuthenticated, profile?._id, dispatch]);

  useEffect(() => {
    // Listen for real-time notifications
    const handleNewNotification = (notification) => {
      dispatch(addNotification(notification));
    };

    socket.on('new_notification', handleNewNotification);

    return () => {
      socket.off('new_notification', handleNewNotification);
    };
  }, [dispatch]);

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a3c3c] transition-colors"
      >
        <span className="material-symbols-outlined text-xl text-gray-600 dark:text-gray-300">
          notifications
        </span>
        
        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold bg-primary text-white rounded-full animate-pulse-subtle">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <NotificationDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default NotificationBell;
