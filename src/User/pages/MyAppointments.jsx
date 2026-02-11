import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';
import AppointmentCard from '../components/AppointmentCard';

const MyAppointments = () => {
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('upcoming'); // 'upcoming' or 'past'
    const [timeTrigger, setTimeTrigger] = useState(0); // Forces re-render for time logic

    // Helper for Consistent Toasts
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
                setUpcoming(response.data.upcoming);
                setPast(response.data.past);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        // No window.confirm needed here anymore due to "Two-Step Button" in AppointmentCard
        
        // Show "Processing" info toast
        showToast("Processing", "Cancelling your appointment...", "info");

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/user/cancel-appointment', 
                { bookingId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                showToast("Cancelled Successfully", response.data.message || "Your appointment has been cancelled.", "success");
                fetchAppointments(); // Refresh list
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            const errMsg = error.response?.data?.message || "Failed to cancel appointment";
            
            // Handle 500 specifically
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

    // Time-based logic update every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeTrigger(prev => prev + 1);
        }, 60000); // 1 minute
        return () => clearInterval(interval);
    }, []);

    // Helper: Calculate if appointment is urgent (< 30 mins)
    const getUrgencyStatus = (booking) => {
        const today = new Date().toISOString().split('T')[0];
        if (booking.date !== today) return false;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const diff = booking.slot.startMin - currentMinutes;

        return diff > 0 && diff <= 30; // Starts in next 30 mins
    };

    // Helper: Format Time
    const formatTime = (minutes) => {
        if (!minutes) return "";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    // Helper: Format Date
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#1a110c]">
            <main className="flex-1 md:ml-10 p-4 md:p-8 lg:p-2">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                            My Appointments
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            Manage your health journey with ease
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-[#2d1e16] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setView('upcoming')}
                            className={`px-6 py-2 font-bold rounded-lg text-sm transition-all ${view === 'upcoming' ? 'bg-primary text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setView('past')}
                            className={`px-6 py-2 font-bold rounded-lg text-sm transition-all ${view === 'past' ? 'bg-primary text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
                        >
                            Past
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Appointment List */}
                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            // Skeleton Loading
                            [1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse bg-white dark:bg-[#2d1e16] h-48 rounded-2xl border border-slate-200 dark:border-slate-800"></div>
                            ))
                        ) : view === 'upcoming' ? (
                            upcoming.length > 0 ? (
                                upcoming.map((booking) => {
                                    const isUrgent = getUrgencyStatus(booking);
                                    return (
                                        <AppointmentCard
                                            key={booking._id}
                                            name={`Dr. ${booking.doctor.displayName}`}
                                            role={`${booking.doctor.specialization} • ${booking.doctor.clinicName || 'Clinic'}`}
                                            status={booking.status === 'confirmed' ? 'Confirmed' : booking.status}
                                            statusColor={booking.status === 'confirmed' ? 'green' : 'amber'}
                                            date={`${formatDate(booking.date)}, ${formatTime(booking.slot.startMin)}`}
                                            type="Video Consultation" // You might want to make this dynamic if stored
                                            icon="videocam"
                                            imgSrc={booking.doctor.profileImage || "https://via.placeholder.com/150"}
                                            actionText={isUrgent ? "Join Now" : "Cancel"}
                                            isUrgent={isUrgent}
                                            onAction={() => {
                                                if (isUrgent) {
                                                    // Handle Join Logic
                                                    alert("Joining meeting...");
                                                } else {
                                                    handleCancel(booking._id);
                                                }
                                            }}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-center py-10 text-slate-500">No upcoming appointments.</div>
                            )
                        ) : (
                            past.length > 0 ? (
                                past.map((booking) => (
                                    <AppointmentCard
                                        key={booking._id}
                                        name={`Dr. ${booking.doctor.displayName}`}
                                        role={booking.doctor.specialization}
                                        status={booking.status}
                                        statusColor="blue"
                                        date={`${formatDate(booking.date)}, ${formatTime(booking.slot.startMin)}`}
                                        type="Consultation"
                                        icon="history"
                                        imgSrc={booking.doctor.profileImage || "https://via.placeholder.com/150"}
                                        actionText="View Receipt"
                                        opacityClass="opacity-60 grayscale hover:grayscale-0 transition-all"
                                    />
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-500">No past appointments.</div>
                            )
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="bg-white dark:bg-[#2d1e16] rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Summary</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">event_available</span>
                                        <span className="text-sm font-medium">Upcoming</span>
                                    </div>
                                    <span className="text-lg font-black text-primary">{upcoming.length}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <span className="material-symbols-outlined">history</span>
                                        <span className="text-sm font-medium">Past Visits</span>
                                    </div>
                                    <span className="text-lg font-black text-slate-700 dark:text-slate-300">{past.length}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
                            <span className="material-symbols-outlined mb-4 text-4xl">emergency_home</span>
                            <h4 className="text-xl font-bold mb-2">Need immediate help?</h4>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">Connect with an available doctor in under 5 minutes for urgent non-emergencies.</p>
                            <button className="w-full py-3 bg-white text-primary font-black rounded-xl text-sm transition-transform hover:scale-[1.02]">
                                START URGENT CALL
                            </button>
                        </div>

                        <div className="p-4 bg-slate-100 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center text-center">
                            <span className="material-symbols-outlined text-slate-400 text-4xl mb-2">add_circle</span>
                            <p className="text-sm font-semibold text-slate-500 mb-3">Book a new checkup</p>
                            <button className="text-primary text-sm font-bold hover:underline">Find a Specialist</button>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Mobile Navigation Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#221610] border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
                <a className="text-slate-400" href="#"><span className="material-symbols-outlined">home</span></a>
                <a className="text-slate-400" href="#"><span className="material-symbols-outlined">groups</span></a>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg -mt-8 border-4 border-white dark:border-[#2d1e16]">
                    <span className="material-symbols-outlined">add</span>
                </div>
                <a className="text-primary" href="#"><span className="material-symbols-outlined">calendar_today</span></a>
                <a className="text-slate-400" href="#"><span className="material-symbols-outlined">person</span></a>
            </nav>
        </div>
    );
};

export default MyAppointments;
