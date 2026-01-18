import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, isValid } from "date-fns";
import { createComment, getCommentsByPost, likePostApi } from "../../server/allApi";
import { setComments, addComment } from "../../redux/commentSlice"; // Added addComment import
import { updateLike } from "../../redux/postSlice"; // Added updateLike import

// Component Imports
import DoctorCommentItem from "./DoctorCommentItem";
 

const CaseCard = ({ post }) => {
  const dispatch = useDispatch();
  console.log("post from=>>>>>",post)

  // --- STATE & SELECTORS ---
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  const { stats } = useSelector((state) => state.doctor); // Removed unused 'profile' from useSelector
  
  // Select comments specifically for this post
  const comments = useSelector(
    (state) => state.comment.byPostId?.[post._id] || []
  );
  // --- HANDLERS ---

  useEffect(()=>{
   const loadCommentOnce= async()=>{
try {
        const res = await getCommentsByPost(post._id);
        console.log("COMMENT===>",res)
        if (res.data && res.data.comments) {
          dispatch(setComments({ postId: post._id, comments: res.data.comments }));
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
   }
   loadCommentOnce();
      
  },[])

  // Toggle Comments & Fetch if empty
  const handleToggleComments = async () => {
    // Toggle UI first
    const nextState = !showComments;
    setShowComments(nextState);

    // If opening and no comments loaded yet, fetch them
    if (nextState && comments.length === 0) {
      try {
        const res = await getCommentsByPost(post._id);
        if (res.data && res.data.comments) {
          dispatch(setComments({ postId: post._id, comments: res.data.comments }));
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  // Like Management
  const isLiked = post.likedBy?.includes(stats?._id);
  const likesCount = post.likesCount || 0;

  const handleLike = async (postId) => {
    // Removed isOwnPost check as doctors can like posts
    try {
      // Optimistic update logic could go here, but currently relying on API first
      await likePostApi({ postId: postId });
      
      dispatch(
        updateLike({
          postId: post._id,
          userId: stats._id,
          liked: !isLiked,
        })
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      const res = await createComment(post._id, { text: newComment });
      if (res.status === 201) {
        dispatch(addComment({
          postId: post._id,
          comment: res.data.comment
        }));
        setNewComment("");
        // After adding a comment, re-fetch all comments for the post to ensure the list is up-to-date
        // This also handles cases where the server might return additional data not in the initial comment object
        const updatedCommentsRes = await getCommentsByPost(post._id);
        dispatch(setComments({ postId: post._id, comments: updatedCommentsRes.data.comments }));

      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // --- MEMOS ---
  
  const timeAgo = useMemo(() => {
    if (!post?.createdAt) return "";
    const date = new Date(post.createdAt);
    if (!isValid(date)) return "";
    return formatDistanceToNow(date, { addSuffix: true });
  }, [post?.createdAt]);

  // --- HELPER STYLES ---
  
  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "moderate":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";
      case "mild":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderStatusBadge = () => {
    if (post.status.toLowerCase() === "open") {
      return (
        <span className="px-2 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-[10px] uppercase font-bold rounded-md tracking-wide">
          Unresolved
        </span>
      );
    }
    if (post.status.toLowerCase() === "resolved") {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-[10px] uppercase font-bold rounded-md tracking-wide">
          Resolved
        </span>
      );
    }
    return null;
  };

  if (!post) return null;

  return (
    <article
      className={`bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] transition-all
        ${post.status === "Resolved" && "opacity-80 hover:opacity-100"}`}
    >
      {/* --- HEADER --- */}
      <header className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          {/* Avatar Logic */}
          {post.isAnonymous ? (
            <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-300 rounded-full size-10 border border-transparent">
              <span className="material-symbols-outlined">visibility_off</span> {/* Changed 'visibility_off' to 'person' for anonymous */}
            </div>
          ) : (
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-100 dark:border-gray-700"
              style={{
                backgroundImage: `url(${post?.author?.profileImage || ""})`,
              }}
            ></div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-med-dark dark:text-white text-sm">
                
                  {post.author?.username || "Anonymous"} {/* Added "Anonymous" fallback */}
              </h3>
              <span className="text-xs text-med-text-secondary dark:text-gray-500">
                •
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-med-gray dark:bg-[#253636] text-med-dark dark:text-gray-300 text-xs font-medium">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  schedule
                </span>
                {timeAgo}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-med-text-secondary dark:text-gray-400 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">
                {post.isAnonymous ? "lock" : "location_on"}
              </span>
              {post.isAnonymous ? "Private Identity" : post.location}
            </div>
          </div>
        </div>

        {/* Status Badge & Menu */}
        <div className="flex items-center gap-2">
          {renderStatusBadge()}
          <button className="text-med-text-secondary dark:text-gray-500 hover:bg-med-gray dark:hover:bg-[#253636] p-1 rounded-full">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-med-dark dark:text-white mb-2">
          {post.title}
        </h4> {/* Changed 'title' to 'content' */}
        <p className="text-med-dark dark:text-gray-300 text-sm leading-relaxed">
          {post.content}
        </p>

        {/* image section */}
        {post.images && post.images.length > 0 && (
          <div className="mt-3">
            <img
              src={post.images[0]}
              alt="Post visualization"
              className="w-full h-64 object-cover rounded-xl border border-gray-100 dark:border-[#2a3838]"
            />
          </div>
        )}
      </div>

      {/* --- TAGS --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.severity && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
              getSeverityStyles(post.severity)
            }`}
          >
            Severity: {post.severity}
          </span>
        )}

        {post.tags &&
          post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-teal-800 dark:text-primary text-xs font-medium border border-primary/20"
            >
              #{tag}
            </span>
          ))}
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <div className="flex items-center justify-between border-t border-[#f0f4f4] dark:border-[#2a3838] pt-3">
        <div className="flex gap-4">
          {/* LEFT ACTION */}
          {/* Removed isOwnPost check as doctors can like posts */}
            <button
  onClick={() => handleLike(post._id)}
  className="focus:outline-none" // Removed redundant classes from wrapper, moved logic inside
>
  <span
    className={`inline-flex items-center px-3 py-2 rounded-lg text-[15px] font-medium transition-colors ${
      isLiked
        ? "bg-primary/10 text-primary" // Suggestion: Use a light bg for active state
        : "bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 hover:text-primary"
    }`}
  >
    <span
      className={`material-symbols-outlined text-[20px] mr-2 ${
        isLiked ? "fill-current" : ""
      }`}
      style={isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}
    >
      thumb_up
    </span>
    
    <span>
      {likesCount} {!isLiked && "Helpful"}
    </span>
  </span>
</button>
          

          {/* MIDDLE ACTION */}
          <button
  onClick={handleToggleComments}
  className="focus:outline-none"
>
  <span
    className={`inline-flex items-center px-3 py-2 rounded-lg text-[15px] font-medium transition-colors ${
      showComments
        ? "bg-primary/10 text-primary" // Active State
        : "bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 hover:text-primary" // Inactive State
    }`}
  >
    <span className="material-symbols-outlined text-[20px] mr-2">
      chat_bubble
    </span>
    
    <span>
      {post.commentCount || (comments ? comments.length : 0)}
    </span>
  </span>
</button>
        </div>

        {/* RIGHT ACTION */}
          {/* Removed isOwnPost check as doctors can share posts */}
          <button className="flex items-center gap-1.5 text-sm text-med-text-secondary dark:text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span>Share</span>
          </button>
      
      </div>

      {/* --- DOCTOR RESPONSE --- */}
      {post.doctorResponseData && (
        <div className="mt-4 bg-primary/5 dark:bg-[#13ecec]/5 border border-primary/20 rounded-xl p-3">
          <div className="flex gap-3">
            <div className="relative">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-8 border border-gray-200"
                style={{
                  backgroundImage: `url(${post.doctorResponseData.image})`,
                }}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-0.5">
                <span className="material-symbols-outlined text-primary text-[14px] fill">
                  verified
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-med-dark dark:text-white">
                  {post.doctorResponseData.name}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-primary text-[#111818] text-[10px] font-bold uppercase tracking-wide">
                  Physician
                </span>
              </div>
              <p className="text-sm text-med-dark dark:text-gray-300 leading-snug">
                {post.doctorResponseData.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- COMMENTS SECTION --- */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-[#e5e7eb] dark:border-[#2a3838] animate-in fade-in slide-in-from-top-1 pl-12">
          {/* Add Comment Input */}
          <div className="flex gap-3 mb-6">
            <div className="size-8 rounded-full bg-gray-200 dark:bg-[#253636] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm text-gray-500">
                person
              </span>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full bg-gray-50 dark:bg-[#203030] border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-[#1a2c2c] rounded-xl text-sm p-3 min-h-[80px] resize-none text-med-dark dark:text-white transition-all"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-med-dark text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <DoctorCommentItem key={comment._id || comment.id || index} comment={comment} />
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-4">
                No comments yet. Be the first to share!
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default CaseCard;