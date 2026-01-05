import { createSlice } from "@reduxjs/toolkit";

const postSlicer = createSlice({
  name: "post",
  initialState: {
    posts: []
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addCommentId: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) post.commentIds.push(commentId);
    },
    updateLike: (state, action) => {
      const { postId, userId, liked} = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if(!post) return;
        if (liked) {
     
    post.likedBy.push(userId);
  } else {
     
    post.likedBy = post.likedBy.filter(id => id !== userId);
  }
  post.likesCount=post.likedBy.length;
    }
  }
});

export const { setPosts, updateLike, addCommentId } = postSlicer.actions;
export default postSlicer.reducer;
