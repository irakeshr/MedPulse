import React, { useState, useEffect } from "react";
import TimelineSlot from "../components/TimelineSlot";
import NewAppointmentModal from "../components/NewAppointmentModal";
import { createDoctorSlots, fetchDoctorSlots, getDoctorProfile, toggleSlotBlock, cancelBooking, editBooking, getUpcomingAppointments, getAvailableDates } from "../../server/allApi";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../../components/CustomToast";

const SchedulePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDefineOpen, setIsDefineOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(null);

  // View Mode: 'timeline' or 'upcoming'
  const [viewMode, setViewMode] = useState('timeline');
  const [upcomingList, setUpcomingList] = useState([]);

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [editNotes, setEditNotes] = useState("");

  // Available Dates & Loading
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define Availability State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [durationMin, setDurationMin] = useState(30);

  // Timeline Data
  const [timelineItems, setTimelineItems] = useState([]);

  useEffect(() => {
    // Get Doctor ID from Profile and Available Dates
    const loadProfile = async () => {
      try {
        const res = await getDoctorProfile();
        if (res.data.success) {
          const docId = res.data.DoctorProfile._id;
          setDoctorId(docId);

          // Fetch available dates
          const datesRes = await getAvailableDates(docId);
          if (datesRes.data.success) {
            setAvailableDates(datesRes.data.dates);

            // Set default date: today if it has schedules, else first available date
            const today = new Date().toISOString().split('T')[0];
            const hasToday = datesRes.data.dates.some(d => d.date === today);

            if (hasToday) {
              setDate(today);
            } else if (datesRes.data.dates.length > 0) {
              setDate(datesRes.data.dates[0].date);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load doctor profile", error);
        toast(<CustomToast title="Profile Error" message="Could not load profile. Please complete profile setup." type="error" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
      }
    };
    loadProfile();
  }, []);

  // Fetch Slots when date changes or after creation
  const fetchSlots = async () => {
    if (!doctorId) return;

    setLoading(true);
    try {
      const res = await fetchDoctorSlots(doctorId, date);
      if (res.data.success) {
        // Transform slots to timeline items
        const items = res.data.slots.map(slot => ({
          id: slot._id, // IMPORTANT: Backend ID
          time: minutesToTime(slot.startMin),
          type: slot.status === 'available' ? 'open' : slot.status === 'booked' ? 'appointment' : 'blocked',
          title: slot.status === 'available' ? 'Open Slot' : slot.status,
          subtitle: `${slot.durationMin} mins`,
          status: slot.status,
          patientName: slot.booking?.user?.fullName || slot.booking?.user?.username || slot.booking?.user?.email?.split('@')[0],
          patientEmail: slot.booking?.user?.email,
          note: slot.booking?.notes,
          isUrgent: slot.booking?.isUrgent,
          reason: slot.booking?.reason
        }));
        
        // Debug: Log the first booked slot to verify patient data
        const bookedSlot = items.find(item => item.type === 'appointment');
        if (bookedSlot) {
          console.log('🔍 Sample Booked Slot:', bookedSlot);
          console.log('📋 Raw Slot Data:', res.data.slots.find(s => s.status === 'booked'));
        }
        
        setTimelineItems(items);
      }
    } catch (err) {
      console.error("Error fetching slots", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcoming = async () => {
    if (!doctorId) return;
    try {
      const res = await getUpcomingAppointments();
      if (res.data.success) {
        setUpcomingList(res.data.slots);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (viewMode === 'timeline') {
      fetchSlots();
    } else {
      fetchUpcoming();
    }
  }, [date, doctorId, viewMode]);


  const handleCreateSlots = async () => {
    try {
      const res = await createDoctorSlots({
        date,
        startTime,
        endTime,
        durationMin
      });
      if (res.data.success) {
        toast(<CustomToast title="Success" message="Availability created successfully!" type="success" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
        setIsDefineOpen(false);

        // Refresh available dates
        const datesRes = await getAvailableDates(doctorId);
        if (datesRes.data.success) {
          setAvailableDates(datesRes.data.dates);
        }

        fetchSlots(); // Refresh timeline
      }
    } catch (err) {
      toast(<CustomToast title="Error" message={err.response?.data?.message || "Failed to create slots"} type="error" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
    }
  };

  const handleSlotAction = async (action, slotData) => {
    try {
      if (action === 'block' || action === 'unblock') {
        await toggleSlotBlock({ slotId: slotData.id });
        toast(<CustomToast title="Success" message={action === 'block' ? "Slot Blocked" : "Slot Unblocked"} type="success" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
        fetchSlots();
      } else if (action === 'cancel') {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        await cancelBooking({ slotId: slotData.id });
        toast(<CustomToast title="Cancelled" message="Appointment Cancelled" type="success" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
        if (viewMode === 'timeline') fetchSlots(); else fetchUpcoming();
      } else if (action === 'edit') {
        setEditingSlot(slotData);
        setEditNotes(slotData.note || "");
        setIsEditOpen(true);
      }

    } catch (err) {
      console.error(err);
      toast(<CustomToast title="Error" message="Action failed" type="error" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await editBooking({ slotId: editingSlot.id, notes: editNotes });
      toast(<CustomToast title="Success" message="Notes Updated" type="success" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
      setIsEditOpen(false);
      setEditingSlot(null);
      if (viewMode === 'timeline') fetchSlots(); else fetchUpcoming();
    } catch (err) {
      toast(<CustomToast title="Error" message="Update failed" type="error" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
    }
  };

  const minutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="bg-white dark:bg-[#1a2c2c] text-[#111818] dark:text-white font-display transition-colors duration-200 h-screen w-full flex flex-col">
      <ToastContainer position="top-right" theme="colored" />
      <NewAppointmentModal onClose={() => setIsOpen(false)} isOpen={isOpen} />

      {/* Define Availability Modal */}
      {isDefineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1f3333] p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Define Availability</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded border dark:bg-[#152626] dark:border-gray-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 rounded border dark:bg-[#152626] dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 rounded border dark:bg-[#152626] dark:border-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (mins)</label>
                <select value={durationMin} onChange={e => setDurationMin(Number(e.target.value))} className="w-full p-2 rounded border dark:bg-[#152626] dark:border-gray-600">
                  <option value={15}>15 mins</option>
                  <option value={30}>30 mins</option>
                  <option value={60}>60 mins</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setIsDefineOpen(false)} className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                <button onClick={handleCreateSlots} className="px-4 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90">Create Slots</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Notes Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1f3333] p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4">Edit Appointment Notes</h3>
            <textarea
              className="w-full h-32 p-3 rounded-lg border dark:bg-[#152626] dark:border-gray-600"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Enter new notes here..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleEditSubmit} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="flex-1 flex overflow-hidden bg-white dark:bg-[#1a2c2c]">

        {/* --- LEFT SCROLLABLE AREA (Schedule) --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-6 lg:py-6 scrollbar-hide">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">

            {/* Header Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-[#111818] dark:text-white text-3xl font-black tracking-tight">Schedule</h1>
                <p className="text-secondary dark:text-gray-400 text-sm mt-1">Manage availability, appointments, and hospital shifts.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex bg-gray-100 dark:bg-[#1f3333] p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'timeline' ? 'bg-white dark:bg-[#2a3c3c] shadow-sm text-primary' : 'text-gray-500'}`}
                  >
                    Daily Timeline
                  </button>
                  <button
                    onClick={() => setViewMode('upcoming')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'upcoming' ? 'bg-white dark:bg-[#2a3c3c] shadow-sm text-primary' : 'text-gray-500'}`}
                  >
                    Upcoming All
                  </button>
                </div>
                <button onClick={() => setIsDefineOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#dbe6e6] bg-white text-secondary dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-gray-300 font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-[#2a3c3c] transition-all">
                  <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                  Define Availability
                </button>
              </div>
            </div>

            {/* Timeline Container */}
            <div className="flex flex-col gap-4">

              {/* Current Date Display (Only for Timeline) */}
              {viewMode === 'timeline' && (
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Select Date</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f3333] font-bold text-base focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
                  >
                    {availableDates.length === 0 ? (
                      <option value="">No schedules available</option>
                    ) : (
                      availableDates.map((dateInfo) => (
                        <option key={dateInfo.date} value={dateInfo.date}>
                          {dateInfo.date} - {dateInfo.available}/{dateInfo.total} slots available
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}

              <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-card relative overflow-hidden min-h-[600px]">
                <div className="p-6 flex flex-col gap-0 relative z-10">

                  {viewMode === 'timeline' ? (
                    /* Render Timeline Items */
                    timelineItems.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        No slots defined for this day. Click "Define Availability" to add slots.
                      </div>
                    ) : (
                      timelineItems.map((item, index) => (
                        <TimelineSlot key={index} data={item} onAction={handleSlotAction} />
                      ))
                    )
                  ) : (
                    /* Render Upcoming List */
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-bold mb-4">All Upcoming Appointments</h3>
                      {upcomingList.length === 0 ? (
                        <p className="text-gray-500">No upcoming appointments found.</p>
                      ) : (
                        upcomingList.map((slot) => (
                          <TimelineSlot
                            key={slot._id}
                            data={{
                              id: slot._id,
                              time: `${slot.date} ${minutesToTime(slot.startMin)}`,
                              type: 'appointment',
                              title: 'Appointment',
                              subtitle: `${slot.durationMin} mins`,
                              status: slot.status,
                              patientName: slot.booking?.user?.fullName || slot.booking?.user?.username || slot.booking?.user?.email?.split('@')[0],
                              patientEmail: slot.booking?.user?.email,
                              note: slot.booking?.notes,
                              isUrgent: slot.booking?.isUrgent,
                              reason: slot.booking?.reason
                            }}
                            onAction={handleSlotAction}
                          />
                        ))
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default SchedulePage;
