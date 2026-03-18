import React from 'react';

const WelcomeBanner = ({ userName = 'User', stats = {} }) => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
      <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
      <p className="text-blue-200 mb-6">
        Discover expert consultations tailored for your business needs
      </p>
      
      <div className="flex gap-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-200">Completed</p>
            <p className="text-2xl font-bold">{stats.completed || 0} Sessions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-200">Upcoming</p>
            <p className="text-2xl font-bold">{stats.upcoming || 0} Sessions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-200">Total Hours</p>
            <p className="text-2xl font-bold">{stats.totalHours || 0} hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
