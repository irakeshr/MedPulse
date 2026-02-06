import React, { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import DoctorModal from '../components/DoctorModal'; // Make sure you have this
import DoctorCard from '../components/DoctorCard';
import { fetchAllDoctors } from '../../server/allApi';

// --- MOCK DATA ---
const DOCTORS_DATA = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "General Physician",
    experience: "8 Years Exp.",
    rating: 4.9,
    reviews: 124,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC_a9H2-3A4RMV8-Nvm03Vor3Mtqezjgw1yRZuZ88hNsrjxWkHnMaQw0TRuJ9Qgf3dxFG90nMFZ5Ep6PLMHEObNEbripg-r2vOWL3qqsNy58MA1FzBYfjaqn8cV9zHAl0bJy5LS1cH29CX-61nru4uTve2Dc3RG6zGx59dse1gPz_poHACgiJsUe5GQkfUEcQiMyfxlv62Q1TezG3dpNJS31vLnShUNGx-ccIzGAOzbHuSeMYL1ul7UYc1e7_8HALsRSgH9k3t5Gw",
    description: "Specialized in family medicine and preventive care. Focused on holistic approaches to patient health and long-term wellness strategies.",
    status: "Available Today",
    statusColor: "text-green-700 dark:text-green-400",
    statusBg: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30",
    indicatorColor: "bg-green-500",
    nextSlot: "2:00 PM",
    location: "kerala, kk",
    buttonText: "Book Appointment",
    buttonStyle: "bg-med-dark dark:bg-white text-white dark:text-med-dark hover:bg-med-dark/90 dark:hover:bg-gray-100"
  },
  {
    id: 2,
    name: "Dr. A. Patel",
    specialty: "Cardiologist",
    experience: "12 Years Exp.",
    rating: 4.8,
    reviews: 98,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc",
    description: "Expert in cardiovascular health, hypertension management, and preventive heart care. Committed to helping patients maintain a healthy heart.",
    status: "Busy Now",
    statusColor: "text-yellow-700 dark:text-yellow-400",
    statusBg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30",
    indicatorColor: "bg-yellow-500",
    nextSlot: "Tomorrow, 9:00 AM",
    location: "chennai, IL",
    buttonText: "Join Waitlist",
    buttonStyle: "bg-primary hover:bg-primary/90 text-med-dark"
  },
  {
    id: 3,
    name: "Dr. Sarah Lee",
    specialty: "Dermatologist",
    experience: "6 Years Exp.",
    rating: 5.0,
    reviews: 210,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E",
    description: "Dermatology specialist with a focus on acne treatment, skin cancer screening, and cosmetic dermatology.",
    status: "Available Today",
    statusColor: "text-green-700 dark:text-green-400",
    statusBg: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30",
    indicatorColor: "bg-green-500",
    nextSlot: "4:15 PM",
    location: "palakkad,kkd",
    locationIcon: "videocam",
    buttonText: "Book Appointment",
    buttonStyle: "bg-med-dark dark:bg-white text-white dark:text-med-dark hover:bg-med-dark/90 dark:hover:bg-gray-100"
  },
  {
    id: 4,
    name: "Dr. Michael Ross",
    specialty: "Neurologist",
    experience: "15 Years Exp.",
    rating: 4.7,
    reviews: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E", // Reusing image for mock
    description: "Focuses on treating disorders of the nervous system, including migraines, epilepsy, and stroke recovery.",
    status: "Fully Booked Today",
    statusColor: "text-red-700 dark:text-red-400",
    statusBg: "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30",
    indicatorColor: "bg-red-500",
    nextSlot: "Wed, 10:00 AM",
    location: "Bangalore, MA",
    buttonText: "Check Schedule",
    buttonStyle: "bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white hover:bg-med-gray dark:hover:bg-[#1a2c2c]"
  }
];

export default function FindDoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const respond = await fetchAllDoctors();
        if (respond.data.success) {
          setDoctors(respond.data.doctors);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Filter only verified doctors
  const verifiedDoctors = doctors.filter(doc => doc.verificationStatus === 'verified');

  return (
    // MAIN LAYOUT
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">

      {/*   LEFT COLUMN: MAIN CONTENT  */}
      <main className="flex flex-col w-full max-w-[720px] gap-6">

        {/* --- Header & Search --- */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-med-dark dark:text-white tracking-tight">Find a Doctor</h1>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] rounded-xl text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-sm text-sm transition-all"
              placeholder="Search by doctor's name, specialization, or condition..."
              type="text"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button className="p-1.5 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Filters --- */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect label="Specialization">
            <option>General Physician</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Neurologist</option>
            <option>Pediatrician</option>
          </FilterSelect>
          <FilterSelect label="Availability">
            <option>Available Today</option>
            <option>Available Tomorrow</option>
            <option>Next 3 Days</option>
          </FilterSelect>
          <FilterSelect label="Location">
            <option>Near Me</option>
            <option>Remote / Telehealth</option>
            <option>New York</option>
            <option>San Francisco</option>
          </FilterSelect>

          <button className="ml-auto flex items-center gap-2 text-sm font-medium text-med-text-secondary hover:text-med-dark dark:text-gray-400 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">sort</span>
            Sort by Rating
          </button>
        </div>

        {/* --- Doctor List --- */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading doctors...</p>
          ) : verifiedDoctors.length > 0 ? (
            verifiedDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onViewProfile={() => setSelectedDoctor(doctor)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_search</span>
              <p className="text-gray-500 font-medium">No verified doctors found.</p>
              <p className="text-sm text-gray-400">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>

        {/* --- Load More --- */}
        {verifiedDoctors.length > 0 && (
          <div className="flex justify-center py-6">
            <button className="px-6 py-2.5 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary dark:text-gray-400 font-medium text-sm rounded-xl hover:bg-med-gray dark:hover:bg-[#253636] transition-colors shadow-sm">
              Load More Doctors
            </button>
          </div>
        )}
      </main>

      {/* ================= RIGHT COLUMN: SIDEBAR ================= */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4 h-full overflow-y-auto scrollbar-hide">
        <aside className="flex flex-col gap-6 w-full">

          {/* Info Card */}
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <div>
                <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Verify Credentials</h5>
                <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
                  Always verify doctor credentials and reviews before booking critical procedures. MedPulse verifies licenses quarterly.
                </p>
              </div>
            </div>
          </div>

          {/* Top Specialists List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-med-dark dark:text-white">Top Rated Specialists</h3>
              <Link to="#" className="text-xs font-semibold text-primary hover:text-primary/80">View All</Link>
            </div>
            <div className="flex flex-col gap-3">
              {/* Mini List Items */}
              {[
                { name: "Dr. A. Patel", role: "Cardiologist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc", rating: 4.8 },
                { name: "Dr. Sarah Lee", role: "Dermatologist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E", rating: 5.0 },
                { name: "Dr. Emily Chen", role: "General Physician", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC_a9H2-3A4RMV8-Nvm03Vor3Mtqezjgw1yRZuZ88hNsrjxWkHnMaQw0TRuJ9Qgf3dxFG90nMFZ5Ep6PLMHEObNEbripg-r2vOWL3qqsNy58MA1FzBYfjaqn8cV9zHAl0bJy5LS1cH29CX-61nru4uTve2Dc3RG6zGx59dse1gPz_poHACgiJsUe5GQkfUEcQiMyfxlv62Q1TezG3dpNJS31vLnShUNGx-ccIzGAOzbHuSeMYL1ul7UYc1e7_8HALsRSgH9k3t5Gw", rating: 4.9 }
              ].map((doc, idx) => (
                <div key={idx} className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                  <div className="flex gap-3 items-center">
                    <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${doc.img}')` }}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-sm font-semibold text-med-dark dark:text-white truncate">{doc.name}</span>
                        <span className="flex items-center text-[10px] bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded text-yellow-700 dark:text-yellow-500 font-bold">
                          <span className="material-symbols-outlined text-[10px] mr-0.5">star</span> {doc.rating}
                        </span>
                      </div>
                      <p className="text-xs text-med-text-secondary dark:text-gray-400 truncate">{doc.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>

      {/* --- MODAL (Rendered conditionally) --- */}
      <DoctorModal
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        doctor={selectedDoctor}
      />

    </div>
  );
}

// --- SUB-COMPONENTS ---

const FilterSelect = ({ label, children }) => (
  <div className="relative">
    <select className="appearance-none bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 py-2 pl-4 pr-10 rounded-xl text-sm font-medium hover:border-med-text-secondary focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer shadow-sm transition-colors">
      <option>{label}</option>
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-med-text-secondary dark:text-gray-400">
      <span className="material-symbols-outlined text-[18px]">expand_more</span>
    </div>
  </div>
);
