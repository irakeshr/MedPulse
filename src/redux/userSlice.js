import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  lastFetched: null,
  stats:null, // ⭐ silent refresh
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
    setStats: (state,action) => {
        state.stats=action.payload;
     
    },
    updateUserProfile: (state, action) => {
      // Assuming payload is the full patient profile or updates to it
      // Based on previous code: state.profile.patientProfile = action.payload;
      // But we just updated getUserProfile to return nested savedPosts IN patientProfile?
      // Or we structure it so state.profile IS the patientProfile?
      // Looking at setUser: state.profile = action.payload;
      // The API returns { patientProfile, ... }
      // So if clean structure, state.profile might be { ...patientProfile, savedPosts: [] }
      
      // Let's stick to the safe path.
      if (state.profile) {
          state.profile.patientProfile = action.payload; // This looks like legacy or specific update logic
      }
    },
    toggleSavedPost: (state, action) => {
        const postId = action.payload;
        // Check structure: is savedPosts in state.profile or state.profile.patientProfile?
        // Based on my controller update: patientProfile.savedPosts
        // If state.profile maps to result.patientProfile (which users usually do):
        
        let target = null;
        if (state.profile && Array.isArray(state.profile.savedPosts)) {
             target = state.profile;
        } else if (state.profile && state.profile.patientProfile && Array.isArray(state.profile.patientProfile.savedPosts)) {
             target = state.profile.patientProfile;
        }
        
        // If not found, maybe init it?
        if (!target && state.profile) {
            // Assume root if missing
             if (!state.profile.savedPosts) state.profile.savedPosts = [];
             target = state.profile;
        }

        if (target) {
            if (target.savedPosts.includes(postId)) {
                target.savedPosts = target.savedPosts.filter(id => id !== postId);
            } else {
                target.savedPosts.push(postId);
            }
        }
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

export const { setUser,setStats,updateUserProfile, toggleSavedPost, userError, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
