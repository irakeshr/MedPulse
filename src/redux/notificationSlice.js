import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonApi } from "../server/CommonApi";
import SERVER_URL from "../server/ServerURL";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const response = await CommonApi(
        "GET",
        `${SERVER_URL}/notifications?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch notifications" });
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await CommonApi(
        "PUT",
        `${SERVER_URL}/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to mark as read" });
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CommonApi(
        "PUT",
        `${SERVER_URL}/notifications/read-all`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to mark all as read" });
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await CommonApi(
        "DELETE",
        `${SERVER_URL}/notifications/${notificationId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete notification" });
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CommonApi(
        "GET",
        `${SERVER_URL}/notifications/unread-count`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch unread count" });
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const exists = state.notifications.some(n => n._id === action.payload._id);
      if (!exists) {
        state.notifications.unshift(action.payload);
        state.unreadCount += 1;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetNotifications: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.notifications = action.payload.notifications || [];
        } else {
          state.notifications = [...state.notifications, ...(action.payload.notifications || [])];
        }
        state.unreadCount = action.payload.unreadCount || 0;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch notifications";
      })
      // Mark as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(n => n._id === action.payload.notification?._id);
        if (index !== -1) {
          state.notifications[index].isRead = true;
          if (state.unreadCount > 0) {
            state.unreadCount -= 1;
          }
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to mark as read";
      })
      // Mark all as read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.loading = false;
        state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to mark all as read";
      })
      // Delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        const deleted = state.notifications.find(n => n._id === action.meta.arg);
        if (deleted && !deleted.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter(n => n._id !== action.meta.arg);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete notification";
      })
      // Fetch unread count
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.unreadCount || 0;
      });
  },
});

export const { addNotification, clearError, resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
