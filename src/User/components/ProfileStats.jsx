const ProfileStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-4 shadow-sm">
      <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
        <span className="material-symbols-outlined">post_add</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-med-dark dark:text-white">{stats?.posts}</div>
        <div className="text-xs text-med-text-secondary dark:text-gray-400 font-semibold uppercase tracking-wide">Total Posts</div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-4 shadow-sm">
      <div className="size-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
        <span className="material-symbols-outlined">thumb_up</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-med-dark dark:text-white">{stats?.helpful}</div>
        <div className="text-xs text-med-text-secondary dark:text-gray-400 font-semibold uppercase tracking-wide">Helpful Votes</div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-4 shadow-sm">
      <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
        <span className="material-symbols-outlined">forum</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-med-dark dark:text-white">{stats?.comments}</div>
        <div className="text-xs text-med-text-secondary dark:text-gray-400 font-semibold uppercase tracking-wide">Comments</div>
      </div>
    </div>
  </div>
);

export default ProfileStats;