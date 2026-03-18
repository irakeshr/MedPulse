import React from 'react';

const ContinueJourney = () => {
  const handleViewPackages = () => {
    console.log('View packages clicked');
  };

  const handleViewSchedule = () => {
    console.log('View schedule clicked');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900">Continue Your Journey</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JourneyCard
          icon={
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          title="Your Packages"
          description="1 active package with 2 sessions remaining"
          linkText="View packages"
          onLinkClick={handleViewPackages}
        />

        <JourneyCard
          icon={
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          title="Upcoming Sessions"
          description="Your next session starts in 12 days"
          linkText="View schedule"
          onLinkClick={handleViewSchedule}
        />
      </div>
    </div>
  );
};

export default ContinueJourney;
