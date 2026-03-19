import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const getNotificationIcon = (type) => {
  const icons = {
    booking_confirmed: { icon: 'check_circle', color: 'text-green-500 bg-green-50 dark:bg-green-500/10' },
    booking_cancelled: { icon: 'cancel', color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
    new_booking: { icon: 'calendar_today', color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
    appointment_reminder: { icon: 'alarm', color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
    doctor_response: { icon: 'medical_services', color: 'text-teal-500 bg-teal-50 dark:bg-teal-500/10' },
    post_liked: { icon: 'favorite', color: 'text-pink-500 bg-pink-50 dark:bg-pink-500/10' },
    post_commented: { icon: 'chat_bubble', color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10' },
    slot_available: { icon: 'schedule', color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' },
    system: { icon: 'info', color: 'text-gray-500 bg-gray-50 dark:bg-gray-500/10' },
  };
  return icons[type] || icons.system;
};

const NotificationCard = ({ notification, onMarkAsRead, onDelete }) => {
  const { icon, color } = getNotificationIcon(notification.type);
  const timeAgo = notification.createdAt
    ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
    : '';

  return (
    <div
      className={`relative group flex gap-3 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#252f2f] ${
        !notification.isRead ? 'bg-primary/5 dark:bg-[#13ecec]/5' : ''
      }`}
    >
      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
      )}

      {/* Icon */}
      <div className={`shrink-0 size-10 rounded-full flex items-center justify-center ${color}`}>
        <span className={`material-symbols-outlined text-xl`}>{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold mb-0.5 ${notification.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-med-dark dark:text-white'}`}>
          {notification.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {notification.message}
        </p>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">
          {timeAgo}
        </span>
      </div>

      {/* Actions */}
      <div className="shrink-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.isRead && (
          <button
            onClick={() => onMarkAsRead(notification._id)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3c3c] text-gray-400 hover:text-primary transition-colors"
            title="Mark as read"
          >
            <span className="material-symbols-outlined text-[18px]">done</span>
          </button>
        )}
        <button
          onClick={() => onDelete(notification._id)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3c3c] text-gray-400 hover:text-red-500 transition-colors"
          title="Delete"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
