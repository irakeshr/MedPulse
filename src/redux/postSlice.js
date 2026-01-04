import { createSlice } from "@reduxjs/toolkit";

const postSlicer = createSlice({
  name: "post",
  initialState: {
    posts: []
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.data.modifiedPosts;
    },
    addCommentId: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) post.commentIds.push(commentId);
    },
    updateLike: (state, action) => {
  const { postId, likesCount, liked } = action.payload;
  const post = state.posts.find(p => p._id === postId);
  if (post) {
    post.likesCount = likesCount;
    post.liked = liked;
  }

  }

}});

export const { setPosts,updateLike,addCommentId } = postSlicer.actions;
export default postSlicer.reducer;