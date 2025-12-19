import React, { useState } from 'react';

const CommunityPostCard = ({ post }) => {
  // --- STATE MANAGEMENT ---
  const [votes, setVotes] = useState(post.votes || 0);
  const [userVote, setUserVote] = useState(0); // 0 = none, 1 = up, -1 = down
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.commentList || []); // Expecting a list from props
  const [newComment, setNewComment] = useState("");

  // --- HANDLERS ---

  // Handle Post Voting (Reddit Style)
  const handleVote = (direction) => {
    if (userVote === direction) {
      // Toggle off if clicking same button
      setUserVote(0);
      setVotes(prev => prev - direction);
    } else {
      // Switch vote (e.g., from -1 to 1 adds 2)
      setVotes(prev => prev + direction - userVote);
      setUserVote(direction);
    }
    // Future: await api.votePost(post.id, direction)
  };

  // Handle New Comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(), // Temp ID
      user: "You",
      avatar: "https://ui-avatars.com/api/?name=You&background=random",
      text: newComment,
      votes: 0,
      timeAgo: "Just now",
      replies: [] // Future: Nested replies
    };

    setComments(prev => [commentObj, ...prev]); // Add to top
    setNewComment("");
    // Future: await api.addComment(post.id, newComment)
  };

  return (
    <article className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] transition-colors cursor-default">
      
      {/* MAIN CONTENT ROW */}
      <div className="flex gap-4">
        
        {/* --- Vote Controls (Reddit Style) --- */}
        <div className="flex flex-col items-center gap-1 min-w-[40px]">
          <button 
            onClick={() => handleVote(1)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-[#253636] transition-colors ${userVote === 1 ? 'text-orange-500' : 'text-med-text-secondary'}`}
          >
            <span className="material-symbols-outlined text-[24px] font-bold">keyboard_arrow_up</span>
          </button>
          
          <span className={`font-bold text-sm ${userVote === 1 ? 'text-orange-500' : userVote === -1 ? 'text-blue-500' : 'text-med-dark dark:text-white'}`}>
            {votes}
          </span>
          
          <button 
            onClick={() => handleVote(-1)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-[#253636] transition-colors ${userVote === -1 ? 'text-blue-500' : 'text-med-text-secondary'}`}
          >
            <span className="material-symbols-outlined text-[24px] font-bold">keyboard_arrow_down</span>
          </button>
        </div>

        {/* --- Post Details --- */}
        <div className="flex-1">
          <header className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              {post.isAnonymous ? (
                <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-300 rounded-full size-6">
                  <span className="material-symbols-outlined text-[14px]">visibility_off</span>
                </div>
              ) : (
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-6" style={{ backgroundImage: `url('${post.userImage}')` }}></div>
              )}
              <span className="text-xs font-semibold text-med-dark dark:text-white">{post.userName}</span>
              <span className="text-xs text-med-text-secondary dark:text-gray-500">•</span>
              <span className="text-xs text-med-text-secondary dark:text-gray-500">{post.timeAgo}</span>
            </div>
            
            {post.hasDoctorReply && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-[10px] font-bold uppercase tracking-wide border border-teal-100 dark:border-teal-800/30">
                <span className="material-symbols-outlined text-[12px] fill">check_circle</span>
                Doctor Replied
              </span>
            )}
          </header>

          <h3 className="text-lg font-bold text-med-dark dark:text-white mb-2">{post.title}</h3>
          <p className="text-med-text-secondary dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.map((tag, idx) => (
                 <span key={idx} className="inline-flex items-center px-2 py-1 rounded bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs">
                   {tag}
                 </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-med-text-secondary dark:text-gray-400 text-xs">
              <button 
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-1 hover:text-med-dark dark:hover:text-white transition-colors ${showComments ? 'text-primary font-bold' : ''}`}
              >
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                <span>{comments.length} Comments</span>
              </button>
              <button className="flex items-center gap-1 hover:text-med-dark dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- EXPANDABLE COMMENT SECTION --- */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-[#e5e7eb] dark:border-[#2a3838] animate-in fade-in slide-in-from-top-1 pl-12">
          
          {/* Add Comment Input */}
          <div className="flex gap-3 mb-6">
             <div className="size-8 rounded-full bg-gray-200 dark:bg-[#253636] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sm text-gray-500">person</span>
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
              comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-4">No comments yet. Be the first to share!</p>
            )}
          </div>

        </div>
      )}

    </article>
  );
};

// --- SUB-COMPONENT: Individual Comment ---
const CommentItem = ({ comment }) => {
  const [votes, setVotes] = useState(comment.votes || 0);
  const [userVote, setUserVote] = useState(0);

  const handleCommentVote = (direction) => {
    if (userVote === direction) {
      setUserVote(0);
      setVotes(prev => prev - direction);
    } else {
      setVotes(prev => prev + direction - userVote);
      setUserVote(direction);
    }
  };

  return (
    <div className="flex gap-3 group">
      <div 
        className="size-8 rounded-full bg-gray-200 bg-center bg-cover shrink-0" 
        style={{ backgroundImage: `url('${comment.avatar}')` }}
      ></div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-med-dark dark:text-white">{comment.user}</span>
          <span className="text-[10px] text-med-text-secondary dark:text-gray-500">{comment.timeAgo}</span>
        </div>
        
        <p className="text-sm text-med-dark dark:text-gray-300 leading-snug mb-2">{comment.text}</p>
        
        {/* Comment Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleCommentVote(1)}
              className={`p-0.5 rounded hover:bg-gray-100 dark:hover:bg-[#253636] ${userVote === 1 ? 'text-orange-500' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
            <span className={`text-xs font-bold ${userVote !== 0 ? 'text-med-dark dark:text-white' : 'text-gray-500'}`}>{votes}</span>
            <button 
              onClick={() => handleCommentVote(-1)}
              className={`p-0.5 rounded hover:bg-gray-100 dark:hover:bg-[#253636] ${userVote === -1 ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </button>
          </div>
          <button className="text-xs font-semibold text-gray-500 hover:text-med-dark dark:hover:text-white transition-colors">Reply</button>
          <button className="text-xs font-semibold text-gray-500 hover:text-med-dark dark:hover:text-white transition-colors">Share</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;