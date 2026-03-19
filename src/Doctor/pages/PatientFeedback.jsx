import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDoctorPosts, respondToPostApi } from '../../server/allApi';
import ReviewCard from '../components/ReviewCard';
import CustomToast from '../../components/CustomToast';
import { ToastContainer, toast } from 'react-toastify';

const PatientFeedback = () => {
  const { profile } = useSelector((state) => state.doctor);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyModal, setReplyModal] = useState({ isOpen: false, review: null });
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const showToast = (title, message, type = 'success') => {
    toast(
      <CustomToast title={title} message={message} type={type} />,
      { bodyClassName: "p-5 m-0", closeButton: false }
    );
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getDoctorPosts();
      
      if (response.data?.posts) {
        const postsWithComments = response.data.posts.filter(
          post => post.comments && post.comments.length > 0
        );
        
        const transformedReviews = postsWithComments.flatMap(post => {
          return post.comments.map(comment => ({
            id: comment._id,
            postId: post._id,
            name: comment.isAnonymous ? 'Anonymous' : comment.author?.fullName || 'Anonymous',
            initials: comment.isAnonymous ? '' : (comment.author?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AN'),
            consultation: post.title || 'General Consultation',
            rating: 5,
            time: formatTimeAgo(comment.createdAt),
            content: comment.content,
            avatarUrl: comment.author?.profilePicture || null,
            avatarColor: getRandomColor(),
            textColor: getRandomColor(true),
            doctorReply: comment.doctorReply || null,
            createdAt: comment.createdAt
          }));
        });
        
        setReviews(transformedReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      showToast("Error", "Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getRandomColor = (textOnly = false) => {
    const colors = [
      { bg: 'bg-blue-100', text: 'text-blue-600' },
      { bg: 'bg-purple-100', text: 'text-purple-600' },
      { bg: 'bg-green-100', text: 'text-green-600' },
      { bg: 'bg-amber-100', text: 'text-amber-600' },
      { bg: 'bg-pink-100', text: 'text-pink-600' },
      { bg: 'bg-teal-100', text: 'text-teal-600' }
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    return textOnly ? random.text : random.bg;
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || 
      (filter === 'replied' && review.doctorReply) ||
      (filter === 'unreplied' && !review.doctorReply);
    
    const matchesSearch = searchQuery === '' || 
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: reviews.length,
    replied: reviews.filter(r => r.doctorReply).length,
    unreplied: reviews.filter(r => !r.doctorReply).length,
    avgRating: reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !replyModal.review) return;
    
    setSubmitting(true);
    try {
      const response = await respondToPostApi(replyModal.review.postId, replyContent);
      if (response.status === 200) {
        showToast("Reply Sent", "Your response has been posted successfully", "success");
        setReplyModal({ isOpen: false, review: null });
        setReplyContent('');
        fetchReviews();
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      showToast("Error", "Failed to post reply", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0f1a1a] dark:to-[#1a2c2c] min-h-screen">
      <div className="flex h-screen w-full overflow-hidden">
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-hide">
            <div className="mx-auto max-w-7xl">
              
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Patient Feedback
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                      Manage your reputation and connect with patients through thoughtful responses.
                    </p>
                  </div>
                  
                  {/* Overall Rating Card */}
                  <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-4 border border-slate-200 dark:border-[#2a3c3c] shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-black text-primary">{stats.avgRating}</div>
                        <div className="flex flex-col">
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span 
                                key={star} 
                                className="material-symbols-outlined text-lg"
                                style={{ fontVariationSettings: `'FILL' ${star <= Math.round(stats.avgRating) ? 1 : 0}` }}
                              >
                                star
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Overall Rating</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary rounded-2xl px-4 py-2 font-bold">
                      {stats.total} Total
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div 
                  className={`bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 border cursor-pointer transition-all ${
                    filter === 'all' 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-slate-200 dark:border-[#2a3c3c] hover:border-primary/50'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-slate-400">inbox</span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">All Feedback</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</div>
                </div>
                
                <div 
                  className={`bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 border cursor-pointer transition-all ${
                    filter === 'replied' 
                      ? 'border-green-500 shadow-lg shadow-green-500/10' 
                      : 'border-slate-200 dark:border-[#2a3c3c] hover:border-green-500/50'
                  }`}
                  onClick={() => setFilter('replied')}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Replied</span>
                  </div>
                  <div className="text-2xl font-black text-green-500">{stats.replied}</div>
                </div>
                
                <div 
                  className={`bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 border cursor-pointer transition-all ${
                    filter === 'unreplied' 
                      ? 'border-amber-500 shadow-lg shadow-amber-500/10' 
                      : 'border-slate-200 dark:border-[#2a3c3c] hover:border-amber-500/50'
                  }`}
                  onClick={() => setFilter('unreplied')}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-amber-500">pending</span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Reply</span>
                  </div>
                  <div className="text-2xl font-black text-amber-500">{stats.unreplied}</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-4 border border-slate-200 dark:border-[#2a3c3c] shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="flex w-full items-center h-12 rounded-xl bg-slate-50 dark:bg-[#152626] px-4 border border-slate-200 dark:border-[#2a3c3c] focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                      <span className="material-symbols-outlined text-slate-400 mr-3">search</span>
                      <input 
                        className="w-full bg-transparent border-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 p-0 font-medium" 
                        placeholder="Search by patient name or content..." 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse bg-white dark:bg-[#1a2c2c] h-48 rounded-2xl border border-slate-200 dark:border-[#2a3c3c]"></div>
                    ))}
                  </div>
                ) : filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <ReviewCard 
                      key={review.id} 
                      data={review} 
                      onReply={() => setReplyModal({ isOpen: true, review })}
                    />
                  ))
                ) : (
                  <div className="text-center py-16 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-slate-200 dark:border-[#2a3c3c]">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">inbox</span>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
                      No feedback found
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {filter === 'unreplied' 
                        ? "Great job! You've replied to all feedback." 
                        : "No patient feedback matches your search."}
                    </p>
                  </div>
                )}
              </div>

              {/* Pro Tip Card */}
              {stats.unreplied > 0 && (
                <div className="mt-8 bg-gradient-to-br from-[#102222] to-[#1a3c3c] rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 size-24 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="shrink-0 size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">lightbulb</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Pro Tip: Engage with Your Patients</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        Responding to patient feedback increases trust and retention. Take a moment to acknowledge 
                        their questions and provide thoughtful guidance.
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        <span>{stats.unreplied} pending replies</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Reply Modal */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2a3c3c]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-[#2a3c3c]">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reply to Patient</h2>
              <button 
                onClick={() => setReplyModal({ isOpen: false, review: null })}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#253636] text-gray-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6">
              {replyModal.review && (
                <div className="mb-6 p-4 bg-slate-50 dark:bg-[#152626] rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    {replyModal.review.avatarUrl ? (
                      <img src={replyModal.review.avatarUrl} alt="" className="size-10 rounded-full" />
                    ) : (
                      <div className={`size-10 rounded-full ${replyModal.review.avatarColor} flex items-center justify-center ${replyModal.review.textColor} font-bold text-sm`}>
                        {replyModal.review.initials}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{replyModal.review.name}</h4>
                      <span className="text-xs text-slate-500">{replyModal.review.consultation}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{replyModal.review.content}</p>
                </div>
              )}
              
              <textarea
                className="w-full h-32 p-4 bg-slate-50 dark:bg-[#152626] border border-slate-200 dark:border-[#2a3c3c] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                placeholder="Write your professional response..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setReplyModal({ isOpen: false, review: null })}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#253636] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyContent.trim() || submitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary text-med-dark hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">send</span>
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default PatientFeedback;
