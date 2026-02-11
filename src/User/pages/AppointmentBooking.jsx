import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDoctor, fetchDoctorSlots, createCheckoutSession } from '../../server/allApi';
import { socket } from '../../socket';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from '../../components/CustomToast';

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [userId, setUserId] = useState(null);

  // Booking confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [reason, setReason] = useState('');
  const [problemNote, setProblemNote] = useState('');

  // --- Helpers ---
  const minutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  // --- 1. Init User & Doctor ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.id);
      } catch (e) {
        console.error("Token decode failed", e);
      }
    }

    const doctorDetails = async () => {
      try {
        const respond = await fetchOneDoctor(doctorId);
        setDoctor(respond.data.doctor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (doctorId) doctorDetails();
  }, [doctorId]);

  // --- 2. Fetch Slots & Socket Setup ---
  useEffect(() => {
    if (!doctorId || !selectedDate) return;

    // Fetch initial slots
    const loadSlots = async () => {
      try {
        const res = await fetchDoctorSlots(doctorId, selectedDate);
        if (res.data.success) {
          setSlots(res.data.slots);
        }
      } catch (err) {
        console.error("Failed to load slots", err);
      }
    };
    loadSlots();

    // Socket Connection
    socket.connect();

    // Subscribe to this doctor+date
    socket.emit('subscribe_to_slots', { doctorId, date: selectedDate });

    // Listen for updates
    const handleSlotUpdate = (updatedSlot) => {
      setSlots((prev) =>
        prev.map((s) => (s._id === updatedSlot.slotId ? { ...s, ...updatedSlot } : s))
      );
    };

    socket.on('slot_updated', handleSlotUpdate);

    return () => {
      socket.emit('unsubscribe_from_slots', { doctorId, date: selectedDate });
      socket.off('slot_updated', handleSlotUpdate);
    };
  }, [doctorId, selectedDate]);


  // --- 3. Slot Interaction ---
  // --- 3. Slot Interaction ---
  const handleSlotClick = (slot) => {
    if (!userId) {
      alert("Please login to book");
      return;
    }

    // 1. If I click a slot I ALREADY hold -> Release it (Toggle off)
    if (slot.status === 'held' && slot.heldBy === userId) {
      socket.emit('release_hold_slot', {
        slotId: slot._id,
        userId,
        doctorId,
        date: selectedDate
      });
      return;
    }

    // 2. If I click an available slot
    if (slot.status === 'available') {
      // Check if I already hold ANOTHER slot. If yes, release it first.
      const currentlyHeld = slots.find(s => s.status === 'held' && s.heldBy === userId);
      if (currentlyHeld) {
        socket.emit('release_hold_slot', {
          slotId: currentlyHeld._id,
          userId,
          doctorId,
          date: selectedDate
        });
      }

      // Then hold the new one
      socket.emit('attempt_hold_slot', {
        slotId: slot._id,
        userId,
        doctorId,
        date: selectedDate
      }, (response) => {
        if (!response.success) {
          alert(response.message);
        }
      });
    }
  };

  const handleBookAppointment = async () => {
    if (!userId) {
      toast(<CustomToast title="Login Required" message="Please login" type="error" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
      return;
    }
    const heldSlot = slots.find(s => s.status === 'held' && s.heldBy === userId);
    if (!heldSlot) return;

    // Open confirmation modal
    setSelectedSlot(heldSlot);
    setShowConfirmModal(true);
  };

  const confirmBooking = async () => {
    if (!selectedSlot) return;

    try {
      // Create Stripe checkout session
      const res = await createCheckoutSession({
        slotId: selectedSlot._id,
        userId,
        doctorId,
        patientDetails: {
          isUrgent,
          reason,
          notes: problemNote
        }
      });

      if (res.data.success) {
        // Redirect to Stripe checkout page
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      toast(<CustomToast title="Payment Error" message={err.response?.data?.message || "Failed to initiate payment"} type="error" />, { closeButton: false, bodyClassName: 'bg-transparent p-0' });
    }
  };

  if (loading || !doctor) return <div className="p-10 text-center">Loading Doctor Profile...</div>;

  return (
    <div className="bg-white dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col">

        <main className="layout-container flex grow justify-center w-full max-w-[1200px] mx-auto px-4 lg:px-5 py-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">

            {/* --- Left Sidebar: Doctor Profile --- */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] sticky top-[100px]">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <div className="size-24 rounded-full border-4 border-primary/20 overflow-hidden">
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover"
                        style={{ backgroundImage: `url("${doctor.profileImage}")` }}
                      ></div>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-med-dark dark:text-white">{doctor.displayName}</h2>
                  <p className="text-sm text-med-text-secondary dark:text-gray-400 font-medium">{doctor.specialization}</p>
                </div>
                {/* ... (Static profile details kept simple) ... */}
                <div className="space-y-4 pt-4 border-t border-med-gray dark:border-[#2a3838]">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Experience</span>
                    <span className="text-sm font-bold text-primary">{doctor.experienceYears} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Consultation Fee</span>
                    <span className="text-sm font-bold text-primary">₹{doctor.consultationFee}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* --- Right Content: Booking Area --- */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-med-dark dark:text-white">Select Appointment Slots</h1>
                <p className="text-med-text-secondary dark:text-gray-400 mt-1">
                  Date: <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent border border-gray-300 dark:border-gray-700 rounded px-2 py-1 ml-2 text-sm"
                  />
                </p>
              </div>

              <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] overflow-hidden mb-8">

                {/* Slots Grid */}
                <div className="p-6">
                  {slots.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">No slots available for this date.</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {slots.map((slot) => {
                        const isMyHold = slot.status === 'held' && slot.heldBy === userId;
                        const isAvailable = slot.status === 'available';

                        let btnClass = "py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all ";

                        if (isMyHold) {
                          btnClass += "border-primary bg-primary/10 text-primary shadow-sm"; // Selected
                        } else if (isAvailable) {
                          btnClass += "border-med-gray dark:border-[#2a3838] hover:border-primary hover:bg-primary/5 text-med-dark dark:text-white"; // Available
                        } else {
                          btnClass += "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-med-text-secondary/50 cursor-not-allowed"; // Taken/Held by others
                        }

                        return (
                          <button
                            key={slot._id}
                            onClick={() => handleSlotClick(slot)}
                            disabled={!isAvailable && !isMyHold}
                            className={btnClass}
                          >
                            {minutesToTime(slot.startMin)}
                            {isMyHold && <span className="block text-[9px] uppercase">Selected</span>}
                            {!isAvailable && !isMyHold && <span className="block text-[9px] uppercase">{slot.status}</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-primary/5 dark:bg-primary/10 p-6 border-t border-[#e5e7eb] dark:border-[#2a3838]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      {slots.find(s => s.status === 'held' && s.heldBy === userId)
                        ? "Slot selected. Proceed to book."
                        : "Please select a slot."}
                    </p>
                    <button
                      onClick={handleBookAppointment}
                      disabled={!slots.find(s => s.status === 'held' && s.heldBy === userId)}
                      className="px-10 py-4 bg-primary hover:bg-primary/90 text-med-dark font-bold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-med-dark dark:text-white mb-4">Confirm Booking</h2>

            <div className="space-y-4">
              {/* Urgency Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="urgent" className="text-sm font-medium text-red-700 dark:text-red-300 cursor-pointer flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                  Mark as Urgent
                </label>
              </div>

              {/* Reason Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Visit</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f3333] focus:border-primary focus:outline-none"
                >
                  <option value="">Select reason...</option>
                  <option value="Consultation">General Consultation</option>
                  <option value="Follow-up">Follow-up Visit</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Check-up">Routine Check-up</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Problem Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Problem Description</label>
                <textarea
                  value={problemNote}
                  onChange={(e) => setProblemNote(e.target.value)}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f3333] focus:border-primary focus:outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        theme="colored"
        toastClassName="!bg-transparent !shadow-none !p-0"
        bodyClassName="!bg-transparent !p-0"
      />
    </div>
  );
};

export default AppointmentBooking;