import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  lastFetched: null, // ⭐ silent refresh
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
      state.lastFetched = Date.now();
      state.loading = false;
      state.error = null;
    },
    userLoading: (state) => {
      state.loading = true;
    },
    userError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
      state.lastFetched = null;
    },
  },
});

export const { setUser, userLoading, userError, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
