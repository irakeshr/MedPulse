import { useState,useMemo } from "react";
import { formatDistanceToNow,isValid } from "date-fns";

const DoctorCommentItem = ({ comment }) => {
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
 
//   time
const timeAgo = useMemo(() => {
    if (!comment?.createdAt) return "";
    const date = new Date(comment.createdAt);
    if (!isValid(date)) return "";
    return formatDistanceToNow(date, { addSuffix: true });
  }, [comment?.createdAt]);
  console.log("image=>>>>>>>>>>>>>>",comment.author?.profileImage)

  return (
    comment.authorRole ==="doctor" ? (<div className="mt-4 bg-primary/5 dark:bg-[#13ecec]/5 border border-primary/20 rounded-xl p-3">
  <div className="flex gap-3">
    {/* Avatar Section */}
    <div className="relative">
      <div
        className="bg-center bg-no-repeat bg-cover rounded-full size-8 border border-gray-200"
        data-alt="Profile picture of Dr. Emily Chen"
        style={{
          backgroundImage:`url('${comment.author.profileImage   }')`       }}
      ></div>
      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-0.5">
        <span className="material-symbols-outlined text-primary text-[14px] fill">
          verified
        </span>
      </div>
    </div>

    {/* Content Section */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-sm text-med-dark dark:text-white">
          {comment.author?.username}
        </span>
        <span className="px-1.5 py-0.5 rounded bg-primary text-[#111818] text-[10px] font-bold uppercase tracking-wide">
          Physician
        </span>
      </div>
      <p className="text-sm text-med-dark dark:text-gray-300 leading-snug">
        Morning headaches can sometimes be related to sleep posture or even
        teeth grinding (bruxism). Since you mentioned screen sensitivity, eye
        strain could be a factor. I'd recommend tracking your sleep quality.
      </p>

      {/* Action Buttons Added Here */}
      <div className="flex items-center gap-4 mt-3">
        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-[#13ecec] transition-colors">
          <span className="material-symbols-outlined text-[16px]">
            thumb_up
          </span>
          Helpful
        </button>

        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
          <span className="material-symbols-outlined text-[16px]">
            thumb_down
          </span>
          Not Helpful
        </button>
      </div>
    </div>
  </div>
</div>) :
    (<div className="flex gap-3 group">
      <div 
        className="size-8 rounded-full bg-gray-200 bg-center bg-cover shrink-0" 
        style={{ backgroundImage: `url('${comment.author.profileImage   }')` }}
      ></div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-med-dark dark:text-white">{comment.author?.username || "Anonymous"}</span>
          <span className="text-[10px] text-med-text-secondary dark:text-gray-500">{timeAgo}</span>
        </div>
        
        <p className="text-sm text-med-dark dark:text-gray-300 leading-snug mb-2">{comment.content}</p>
        
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
    </div>)
  );
};

export default DoctorCommentItem ;