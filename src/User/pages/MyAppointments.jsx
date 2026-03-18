import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';
import AppointmentCard from '../components/AppointmentCard';
import { Link } from 'react-router-dom';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState({
        upcoming: [],
        completed: [],
        cancelled: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [timeTrigger, setTimeTrigger] = useState(0);

    const showToast = (title, message, type = 'success') => {
        toast(
            <CustomToast title={title} message={message} type={type} />,
            { bodyClassName: "p-5 m-0", closeButton: false }
        );
    };

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/user/appointments', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                const today = new Date().toISOString().split('T')[0];
                const nowLocal = new Date();
                const currentMinutes = nowLocal.getHours() * 60 + nowLocal.getMinutes();

                const upcoming = [];
                const completed = [];

                // Use backend's cancelled array directly
                const cancelled = response.data.cancelled || [];

                // Process upcoming and past from backend
                [...response.data.upcoming, ...response.data.past].forEach(booking => {
                    if (booking.status === 'cancelled') return;

                    const isPast = booking.date < today ||
                        (booking.date === today && booking.startTime < currentMinutes);

                    if (isPast) {
                        completed.push(booking);
                    } else {
                        upcoming.push(booking);
                    }
                });

                setAppointments({ upcoming, completed, cancelled });
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            showToast("Error", "Failed to load appointments", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        showToast("Processing", "Cancelling your appointment...", "info");

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/user/cancel-appointment', 
                { bookingId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                showToast("Cancelled Successfully", response.data.message || "Your appointment has been cancelled.", "success");
                fetchAppointments();
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            const errMsg = error.response?.data?.message || "Failed to cancel appointment";
            
            if (error.response?.status === 500) {
                showToast("Server Error", "We couldn't process your cancellation. Please try again later.", "error");
            } else {
                showToast("Cancellation Failed", errMsg, "error");
            }
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeTrigger(prev => prev + 1);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const getUrgencyStatus = (booking) => {
        const today = new Date().toISOString().split('T')[0];
        if (booking.date !== today) return false;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const diff = booking.slot?.startMin - currentMinutes;

        return diff > 0 && diff <= 30;
    };

    const formatTime = (minutes) => {
        if (!minutes && minutes !== 0) return "";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const tabs = [
        { id: 'upcoming', label: 'Upcoming', count: appointments.upcoming.length, icon: 'event_available' },
        { id: 'completed', label: 'Completed', count: appointments.completed.length, icon: 'check_circle' },
        { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length, icon: 'cancel' }
    ];

    const currentAppointments = appointments[activeTab] || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0f1a1a] dark:to-[#1a2c2c]">
            <main className="flex-1 md:ml-10 p-4 md:p-8 lg:p-6">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                My Bookings
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                                Manage your health appointments with ease
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-slate-200 dark:border-[#2a3c3c] shadow-sm w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    activeTab === tab.id 
                                        ? 'bg-primary text-white shadow-md' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                {tab.count > 0 && (
                                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                                        activeTab === tab.id 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-slate-100 dark:bg-[#253636] text-slate-600 dark:text-slate-400'
                                    }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Appointments List */}
                    <div className="lg:col-span-2 space-y-5">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse bg-white dark:bg-[#1a2c2c] h-44 rounded-2xl border border-slate-200 dark:border-[#2a3c3c]"></div>
                                ))}
                            </div>
                        ) : currentAppointments.length > 0 ? (
                            currentAppointments.map((booking) => {
                                const isUrgent = getUrgencyStatus(booking);
                                const isCancelled = booking.status === 'cancelled';
                                const isPast = activeTab === 'completed';

                                return (
                                    <AppointmentCard
                                        key={booking._id}
                                        name={`Dr. ${booking.doctor?.displayName || 'Unknown'}`}
                                        role={`${booking.doctor?.specialization || 'General'} • ${booking.doctor?.clinicName || 'Clinic'}`}
                                        status={
                                            isCancelled ? 'Cancelled' : 
                                            isPast ? 'Completed' : 
                                            isUrgent ? 'Starting Soon' : 
                                            'Confirmed'
                                        }
                                        statusColor={
                                            isCancelled ? 'red' : 
                                            isPast ? 'blue' : 
                                            isUrgent ? 'amber' : 
                                            'green'
                                        }
                                        date={`${formatDate(booking.date)}, ${formatTime(booking.slot?.startMin || booking.startTime)}`}
                                        type="Video Consultation"
                                        icon={isPast ? "history" : isCancelled ? "event_busy" : isUrgent ? "videocam" : "event_available"}
                                        imgSrc={booking.doctor?.profileImage || "https://via.placeholder.com/150"}
                                        actionText={
                                            isCancelled ? 'View Details' :
                                            isPast ? 'View Summary' :
                                            isUrgent ? 'Join Now' : 
                                            'Cancel'
                                        }
                                        isUrgent={isUrgent}
                                        opacityClass={isCancelled ? 'opacity-60 grayscale hover:grayscale-0 transition-all' : ''}
                                        onAction={() => {
                                            if (isCancelled || isPast) {
                                                return;
                                            }
                                            if (isUrgent) {
                                                alert("Joining meeting...");
                                            } else {
                                                handleCancel(booking._id);
                                            }
                                        }}
                                    />
                                );
                            })
                        ) : (
                            <div className="text-center py-16 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-slate-200 dark:border-[#2a3c3c]">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
                                    {activeTab === 'upcoming' ? 'event_busy' : activeTab === 'completed' ? 'history' : 'cancel'}
                                </span>
                                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    No {activeTab} appointments
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                                    {activeTab === 'upcoming' 
                                        ? "You don't have any upcoming appointments scheduled." 
                                        : activeTab === 'completed' 
                                        ? "You haven't completed any appointments yet."
                                        : "No appointments have been cancelled."}
                                </p>
                                {activeTab === 'upcoming' && (
                                    <Link 
                                        to="/doctors"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-med-dark font-semibold text-sm rounded-xl transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">search</span>
                                        Find a Doctor
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 border border-slate-200 dark:border-[#2a3c3c] shadow-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                                Summary
                            </h4>
                            <div className="space-y-3">
                                {tabs.map((tab) => (
                                    <div 
                                        key={tab.id}
                                        className={`flex items-center justify-between p-3 rounded-xl ${
                                            activeTab === tab.id 
                                                ? 'bg-primary/5 border border-primary/20' 
                                                : 'bg-slate-50 dark:bg-[#253636]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined ${
                                                tab.id === 'upcoming' ? 'text-green-500' : 
                                                tab.id === 'completed' ? 'text-blue-500' : 
                                                'text-red-500'
                                            }`}>
                                                {tab.icon}
                                            </span>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                                                {tab.label}
                                            </span>
                                        </div>
                                        <span className={`text-lg font-black ${
                                            tab.id === 'upcoming' ? 'text-green-500' : 
                                            tab.id === 'completed' ? 'text-blue-500' : 
                                            'text-red-500'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Urgent Care Card */}
                        <div className="bg-gradient-to-br from-primary to-teal-600 rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
                            <span className="material-symbols-outlined mb-4 text-4xl">emergency_home</span>
                            <h4 className="text-xl font-bold mb-2">Need immediate help?</h4>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">
                                Connect with an available doctor in under 5 minutes for urgent non-emergencies.
                            </p>
                            <button className="w-full py-3 bg-white text-primary font-black rounded-xl text-sm transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">videocam</span>
                                START URGENT CALL
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 border border-slate-200 dark:border-[#2a3c3c]">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h4>
                            <div className="space-y-2">
                                <Link 
                                    to="/doctors"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#253636] transition-colors group"
                                >
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">search</span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Find a Specialist</span>
                                </Link>
                                <Link 
                                    to="/community"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#253636] transition-colors group"
                                >
                                    <span className="material-symbols-outlined text-teal-500 group-hover:scale-110 transition-transform">groups</span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Health Community</span>
                                </Link>
                                <Link 
                                    to="/profile"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#253636] transition-colors group"
                                >
                                    <span className="material-symbols-outlined text-purple-500 group-hover:scale-110 transition-transform">person</span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">My Profile</span>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Mobile Navigation Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a2c2c] border-t border-slate-200 dark:border-[#2a3c3c] px-6 py-3 flex justify-between items-center z-50">
                <Link to="/feed" className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">home</span>
                </Link>
                <Link to="/community" className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">groups</span>
                </Link>
                <Link to="/doctors" className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">search</span>
                </Link>
                <Link to="/my-appointments" className="text-primary">
                    <span className="material-symbols-outlined">calendar_today</span>
                </Link>
                <Link to="/profile" className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">person</span>
                </Link>
            </nav>
        </div>
    );
};

export default MyAppointments;
