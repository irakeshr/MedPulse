import React from 'react';
import { format } from 'date-fns';

const SessionCard = ({ session }) => {
  const formattedDate = session.dateTime 
    ? format(new Date(session.dateTime), "MMM dd, yyyy 'at' hh:mm a")
    : 'Date not set';
  
  return (
    <div className={`rounded-xl p-5 border transition-all hover:shadow-md ${
      session.status === 'next-up' 
        ? 'bg-yellow-50 border-yellow-200' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <img
            src={session.consultantImage || 'https://via.placeholder.com/48'}
            alt={session.consultantName || 'Consultant'}
            className="w-12 h-12 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              {session.consultantName || 'Consultant Name'}
            </h4>
            <p className="text-sm text-gray-500 mb-3">{session.consultantRole || 'Specialist'}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{session.sessionType || 'Session'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          {session.status === 'next-up' && (
            <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full mb-3">
              Next Up
            </span>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{session.duration || 0} min</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>₹{session.price || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
