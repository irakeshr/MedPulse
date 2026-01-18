import { createSlice } from "@reduxjs/toolkit";

const postSlicer = createSlice({
  name: "post",
  initialState: {
    posts: [],
    searchKey:""
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
    },
    setSearchKey:(state,action)=>{
      state.searchKey=action.payload;
    }
  }
});

export const { setPosts, updateLike, addCommentId, setSearchKey } = postSlicer.actions;
export default postSlicer.reducer;
