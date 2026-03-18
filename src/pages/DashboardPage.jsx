import React from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import WelcomeBanner from '../components/Dashboard/WelcomeBanner';
import ContinueJourney from '../components/Dashboard/ContinueJourney';
import ScheduleSection from '../components/Dashboard/ScheduleSection';

const DashboardPage = () => {
  const stats = {
    completed: 12,
    upcoming: 4,
    totalHours: 18.5,
  };

  const sessions = [
    {
      id: '1',
      consultantName: 'Emily Rodriguez',
      consultantRole: 'Software Developer',
      consultantImage: 'https://i.pravatar.cc/150?img=1',
      sessionType: 'Eurometer',
      dateTime: '2026-03-12T09:00:00',
      duration: 60,
      price: 44,
      status: 'next-up',
    },
    {
      id: '2',
      consultantName: 'Emily Rodriguez',
      consultantRole: 'Investment & Wealth Advisor',
      consultantImage: 'https://i.pravatar.cc/150?img=2',
      sessionType: 'Portfolio Review',
      dateTime: '2026-03-15T14:00:00',
      duration: 90,
      price: 5500,
    },
    {
      id: '3',
      consultantName: 'Michael Chen',
      consultantRole: 'Retirement & Wealth Advisor',
      consultantImage: 'https://i.pravatar.cc/150?img=3',
      sessionType: 'Retirement Planning',
      dateTime: '2026-03-18T11:00:00',
      duration: 60,
      price: 1200,
    },
    {
      id: '4',
      consultantName: 'Sarah Johnson',
      consultantRole: 'Senior Business Strategy Consultant',
      consultantImage: 'https://i.pravatar.cc/150?img=4',
      sessionType: 'Business Strategy',
      dateTime: '2026-03-20T10:00:00',
      duration: 120,
      price: 1500,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <WelcomeBanner userName="Emily" stats={stats} />
        
        <div className="mt-8">
          <ContinueJourney />
        </div>
        
        <div className="mt-8">
          <ScheduleSection sessions={sessions} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
