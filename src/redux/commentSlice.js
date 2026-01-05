import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    byPostId: {},  
  },
  reducers: {
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.byPostId[postId] = comments;
    },

    addComment: (state, action) => {
      const { postId, comment } = action.payload;

      if (!state.byPostId[postId]) {
        state.byPostId[postId] = [];
      }

      state.byPostId[postId].unshift(comment);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;
