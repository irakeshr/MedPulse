const DoctorCard = ({ doctor, onViewProfile }) => (
  <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 group">
    <div className="flex flex-col sm:flex-row gap-5">
      
      {/* Avatar */}
      <div className="relative shrink-0 mx-auto sm:mx-0">
        <div className="size-24 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-inner" style={{ backgroundImage: `url('${doctor.profileImage}')` }}></div>
        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#1a2c2c] rounded-full p-1 shadow-sm">
          <span className="material-symbols-outlined text-primary text-[20px] fill">verified</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-lg font-bold text-med-dark dark:text-white group-hover:text-primary transition-colors">{doctor.displayName}</h3>
            <p className="text-sm font-medium text-med-text-secondary dark:text-gray-400">{doctor.specialization} • {doctor.experienceYears}</p>
          </div>
          <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/10 px-2 py-1 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
            <span className="material-symbols-outlined text-yellow-500 text-[16px] fill mr-1">star</span>
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">{doctor.rating}</span>
            <span className="text-xs text-yellow-600/70 dark:text-yellow-500/70 ml-1">({doctor.reviews})</span>
          </div>
        </div>
        
        <p className="text-sm text-med-dark dark:text-gray-300 leading-relaxed line-clamp-2 mb-3">
          {doctor.profileBio
}
        </p>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-auto">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${doctor.statusBg}`}>
            <div className={`size-2 rounded-full ${doctor.indicatorColor} ${doctor.status === 'Available Today' ? 'animate-pulse' : ''}`}></div>
            <span className={`text-xs font-semibold ${doctor.statusColor}`}>{doctor.status}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-med-text-secondary dark:text-gray-400">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Next Slot: {doctor.nextSlot}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-med-text-secondary dark:text-gray-400">
            <span className="material-symbols-outlined text-[16px]">{doctor.locationIcon || 'location_on'}</span>
            <span>{doctor.location}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Actions */}
    <div className="flex items-center justify-between border-t border-[#f0f4f4] dark:border-[#2a3838] pt-4 mt-4">
      <button 
        onClick={onViewProfile}
        className="text-sm font-medium text-med-text-secondary hover:text-med-dark dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        View Profile
      </button>
      <button className={`px-5 py-2 font-semibold text-sm rounded-xl transition-colors shadow-sm ${doctor.buttonStyle}`}>
        {doctor.buttonText}
      </button>
    </div>
  </div>
);

export default DoctorCard;