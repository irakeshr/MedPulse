import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/doctor/upcoming-appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setAppointments(res.data.slots || []);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    if (!minutes && minutes !== 0) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((slot) => slot.date === today);
  const upcomingAppointments = appointments
    .filter((slot) => slot.date > today)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  const pastAppointments = appointments
    .filter((slot) => slot.date < today)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const currentAppointments =
    activeTab === "today"
      ? todayAppointments
      : activeTab === "upcoming"
      ? upcomingAppointments
      : pastAppointments;

  const tabs = [
    { id: "today", label: "Today", count: todayAppointments.length },
    { id: "upcoming", label: "Upcoming", count: upcomingAppointments.length },
    { id: "past", label: "Past", count: pastAppointments.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0f1a1a] dark:to-[#1a2c2c]">
      <main className="flex-1 md:ml-10 p-4 md:p-8 lg:p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                My Appointments
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                View and manage your patient bookings
              </p>
            </div>
            <Link
              to="/doctor/schedule"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Manage Schedule
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-slate-200 dark:border-[#2a3c3c] shadow-sm w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-500 dark:text-slate-400 hover:text-primary"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-[#253636] text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white dark:bg-[#1a2c2c] h-32 rounded-2xl border border-slate-200 dark:border-[#2a3c3c]"
                ></div>
              ))}
            </div>
          ) : currentAppointments.length > 0 ? (
            currentAppointments.map((slot) => {
              const patient = slot.booking?.user;
              const isToday = slot.date === today;

              return (
                <div
                  key={slot._id}
                  className={`bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 border ${
                    isToday
                      ? "border-primary shadow-md shadow-primary/10"
                      : "border-slate-200 dark:border-[#2a3c3c]"
                  } transition-all hover:shadow-md`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Patient Info */}
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                        {patient?.fullName?.charAt(0).toUpperCase() || "P"}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {patient?.fullName || "Patient"}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {slot.booking?.reason || "General Consultation"}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {formatDate(slot.date)}
                        </p>
                        <p className="text-sm text-primary font-bold">
                          {formatTime(slot.startMin)} - {formatTime(slot.endMin)}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isToday
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        }`}
                      >
                        {isToday ? "Today" : activeTab === "past" ? "Completed" : "Confirmed"}
                      </div>
                    </div>
                  </div>

                  {/* Notes if any */}
                  {slot.booking?.notes && (
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-[#253636] rounded-xl">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Patient Notes:
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {slot.booking.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-slate-200 dark:border-[#2a3c3c]">
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
                {activeTab === "today"
                  ? "today"
                  : activeTab === "upcoming"
                  ? "event_busy"
                  : "history"}
              </span>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
                No {activeTab} appointments
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming patient bookings."
                  : activeTab === "today"
                  ? "No appointments scheduled for today."
                  : "No past appointments found."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorAppointments;
