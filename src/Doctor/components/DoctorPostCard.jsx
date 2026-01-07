import React, { useState } from "react";
import CommentItem from "../../User/components/CommentItem";
const DoctorPostCard = ({ data }) => {
  // --- STATE (for the comment/review section) ---
  const [showReviewSection, setShowReviewSection] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]); // This would typically come from props/API

  // --- HANDLERS ---
  const handleToggleReviewSection = () => {
    setShowReviewSection(!showReviewSection);
  };
  const handleAddComment = () => {
    console.log("Submitting review:", reviewText);
    setReviewText("");
    setShowReviewSection(false);
    // Add logic to send to backend here
  };

  // --- HELPERS ---
  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high priority":
      case "critical":
        return "bg-accent-red dark:bg-red-900/40 text-accent-red-text dark:text-red-200 border-red-200 dark:border-red-900";
      case "medium priority":
        return "bg-accent-yellow dark:bg-yellow-900/30 text-accent-yellow-text dark:text-yellow-200 border-yellow-200 dark:border-yellow-900";
      case "low priority":
        return "bg-accent-green dark:bg-green-900/30 text-accent-green-text dark:text-green-200 border-green-200 dark:border-green-900";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
    }
  };

  return (
    <article className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] transition-all hover:shadow-md">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          {/* Avatar Logic */}
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-100 dark:border-gray-700 shrink-0"
            style={{ backgroundImage: `url(${data.avatar})` }}
          ></div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-med-dark dark:text-white text-sm">
                {data.patientName}
              </h3>
              <span className="text-xs text-med-text-secondary dark:text-gray-500">•</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-med-gray dark:bg-[#253636] text-med-dark dark:text-gray-300 text-xs font-medium">
                <span className="material-symbols-outlined text-[14px] mr-1">schedule</span>
                {data.time}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-med-text-secondary dark:text-gray-400 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">medical_services</span>
              {data.specialty}
            </div>
          </div>
        </div>

        {/* Menu */}
        <button className="text-med-text-secondary dark:text-gray-500 hover:bg-med-gray dark:hover:bg-[#253636] p-1 rounded-full">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      {/* --- CONTENT --- */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-med-dark dark:text-white mb-2">
          {data.title}
        </h4>
        <p className="text-med-dark dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {data.desc}
        </p>

        {/* Optional Image */}
        {data.image && (
          <div className="mt-3">
            <img
              src={data.image}
              alt="Case attachment"
              className="w-full h-48 object-cover rounded-xl border border-gray-100 dark:border-[#2a3838]"
            />
          </div>
        )}
      </div>

      {/* --- TAGS / SEVERITY --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.priority && (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${getSeverityStyles(data.priority)}`}>
            <span className="material-symbols-outlined text-[14px] mr-1 filled-icon" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
            {data.priority}
          </span>
        )}
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/5 text-primary-dark dark:text-primary text-xs font-medium border border-primary/20">
          #{data.specialty}
        </span>
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <div className="flex items-center justify-between border-t border-[#f0f4f4] dark:border-[#2a3838] pt-3">
        <div className="flex gap-4 w-full">
          
          {/* PRIMARY ACTION: Review Case (Replaces Comment) */}
          <button
            onClick={handleToggleReviewSection}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
              ${showReviewSection 
                ? "bg-primary text-[#111818] dark:text-med-dark shadow-sm" 
                : "bg-primary/10 text-primary-dark dark:text-primary hover:bg-primary/20"
              }`}
          >
            <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
            {showReviewSection ? "Close Review" : "Review Case"}
          </button>

          {/* SECONDARY ACTION: Quick Save/Bookmark */}
          <button className="flex items-center gap-1.5 px-3 py-2 text-med-text-secondary dark:text-gray-400 hover:text-primary hover:bg-med-gray dark:hover:bg-[#253636] rounded-lg transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">bookmark</span>
            Save
          </button>

          {/* SECONDARY ACTION: Share */}
          <button className="flex items-center gap-1.5 px-3 py-2 text-med-text-secondary dark:text-gray-400 hover:text-primary hover:bg-med-gray dark:hover:bg-[#253636] rounded-lg transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      {/* --- REVIEW/COMMENT SECTION (Toggled by "Review Case") --- */}
      {showReviewSection && (
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
            {comments?.length > 0 ? (
              comments?.map((comment, index) => (
                <CommentItem key={comment._id || comment.id || index} comment={comment} />
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

export default DoctorPostCard;