import React, { useState } from 'react';

const PostCard = ({ post, isOwnPost = false }) => {
  // --- STATE ---
  const [likes, setLikes] = useState(post.helpfulCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  // --- HANDLERS ---
  const handleLike = () => {
    if (isOwnPost) return; // You usually can't like your own post
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      user: "You",
      avatar: "https://ui-avatars.com/api/?name=You&background=random",
      text: newComment,
      timeAgo: "Just now"
    };
    setComments(prev => [...prev, commentObj]);
    setNewComment("");
  };

  // --- HELPER STYLES ---
  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'medium': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Logic for Status Badge (Only for My Posts)
  const renderStatusBadge = () => {
    if (!isOwnPost || !post.status) return null;
    
    if (post.status === 'Unresolved') {
      return <span className="px-2 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-[10px] uppercase font-bold rounded-md tracking-wide">Unresolved</span>;
    }
    if (post.status === 'Resolved') {
      return <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-[10px] uppercase font-bold rounded-md tracking-wide">Resolved</span>;
    }
  };

  return (
    <article 
      className={`bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] transition-all
      ${post.status === 'Resolved' && isOwnPost ? 'opacity-80 hover:opacity-100' : ''}`}
    >
      {/* --- HEADER --- */}
      <header className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          {/* Avatar Logic */}
          {post.isAnonymous ? (
             <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-300 rounded-full size-10 border border-transparent">
                <span className="material-symbols-outlined">visibility_off</span>
             </div>
          ) : (
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-100 dark:border-gray-700" 
              style={{ backgroundImage: `url(${post.userImage})` }}
            ></div>
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-med-dark dark:text-white text-sm">
                {isOwnPost ? (post.isAnonymous ? "You (Anonymous)" : "You") : post.userName}
              </h3>
              <span className="text-xs text-med-text-secondary dark:text-gray-500">•</span>
              <span className="text-xs text-med-text-secondary dark:text-gray-500">{post.timeAgo}</span>
            </div>
            {/* Sub-header: Location (Feed) OR Privacy (My Posts) */}
            <div className="flex items-center gap-1 text-xs text-med-text-secondary dark:text-gray-400 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">
                {isOwnPost ? (post.isAnonymous ? 'lock' : 'public') : 'location_on'}
              </span>
              {isOwnPost ? (post.isAnonymous ? 'Private Identity' : 'Public') : post.location}
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
        <h4 className="text-lg font-semibold text-med-dark dark:text-white mb-2">{post.title}</h4>
        <p className="text-med-dark dark:text-gray-300 text-sm leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* --- TAGS --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.severity && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getSeverityStyles(post.severity)}`}>
            Severity: {post.severity}
            </span>
        )}
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-med-gray dark:bg-[#253636] text-med-dark dark:text-gray-300 text-xs font-medium">
          <span className="material-symbols-outlined text-[14px] mr-1">schedule</span> {post.duration}
        </span>
        {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-teal-800 dark:text-primary text-xs font-medium border border-primary/20">
            {tag}
            </span>
        ))}
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <div className="flex items-center justify-between border-t border-[#f0f4f4] dark:border-[#2a3838] pt-3">
        <div className="flex gap-4">
          
          {/* LEFT ACTION: Like (Feed) OR "Doctor Responded" (My Posts) */}
          {isOwnPost && post.doctorResponded ? (
             <div className="flex items-center gap-1.5 text-sm text-primary font-medium">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Doctor Responded</span>
             </div>
          ) : (
            <button 
              onClick={handleLike}
              disabled={isOwnPost} 
              className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-primary font-medium' : 'text-med-text-secondary dark:text-gray-400 hover:text-primary'}`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isLiked ? 'fill' : ''}`}>thumb_up</span>
              <span>{likes} Helpful</span>
            </button>
          )}

          {/* MIDDLE ACTION: Comments */}
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 text-sm transition-colors ${showComments ? 'text-primary font-medium' : 'text-med-text-secondary dark:text-gray-400 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            <span>{post.commentCount || comments.length} Comments</span>
          </button>
        </div>
        
        {/* RIGHT ACTION: Share (Feed) OR Edit (My Posts) */}
        {isOwnPost ? (
          <button className="flex items-center gap-1.5 text-sm text-med-text-secondary dark:text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            <span>Edit</span>
          </button>
        ) : (
          <button className="flex items-center gap-1.5 text-sm text-med-text-secondary dark:text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span>Share</span>
          </button>
        )}
      </div>

      {/* --- DOCTOR RESPONSE (Shared) --- */}
      {post.doctorResponseData && (
        <div className="mt-4 bg-primary/5 dark:bg-[#13ecec]/5 border border-primary/20 rounded-xl p-3">
          <div className="flex gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-8 border border-gray-200" 
                style={{ backgroundImage: `url(${post.doctorResponseData.image})` }}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-0.5">
                <span className="material-symbols-outlined text-primary text-[14px] fill">verified</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-med-dark dark:text-white">{post.doctorResponseData.name}</span>
                <span className="px-1.5 py-0.5 rounded bg-primary text-[#111818] text-[10px] font-bold uppercase tracking-wide">Physician</span>
              </div>
              <p className="text-sm text-med-dark dark:text-gray-300 leading-snug">
               {post.doctorResponseData.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- COMMENTS SECTION (Shared) --- */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2a3838]">
          <div className="flex flex-col gap-3 mb-4">
            {comments.map((comment) => (
               <div key={comment.id} className="flex gap-2">
                 <div className="size-8 rounded-full bg-gray-200 bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${comment.avatar})` }}></div>
                 <div className="bg-gray-50 dark:bg-[#203030] p-2.5 rounded-r-xl rounded-bl-xl text-sm flex-1">
                   <div className="flex justify-between items-baseline mb-1">
                     <span className="font-bold text-med-dark dark:text-white text-xs">{comment.user}</span>
                     <span className="text-[10px] text-gray-500">{comment.timeAgo}</span>
                   </div>
                   <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                 </div>
               </div>
            ))}
          </div>
          {/* Comment Input */}
          <div className="flex gap-2 items-start">
             <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sm text-primary">person</span>
             </div>
             <div className="flex-1 relative">
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a helpful comment..." 
                  className="w-full bg-gray-50 dark:bg-[#203030] border-transparent focus:border-primary/50 focus:ring-0 rounded-xl text-sm p-3 min-h-[40px] resize-none pr-10 text-med-dark dark:text-white"
                />
                <button onClick={handleAddComment} className="absolute right-2 top-2 p-1 text-primary hover:bg-primary/10 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
             </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default PostCard;