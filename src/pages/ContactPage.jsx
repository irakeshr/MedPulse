import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';
import { submitContactApi } from '../server/allApi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'doctor', label: 'Doctor Partnership' },
    { value: 'patient', label: 'Patient Support' },
    { value: 'media', label: 'Media & Press' },
    { value: 'emergency', label: 'Emergency Contact' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast(
        <CustomToast title="Missing Information" message="Please fill in all required fields." type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitContactApi(formData);
      if (res.data.success) {
        toast(
          <CustomToast 
            title="Message Sent" 
            message="Our clinical team will respond within 24 hours." 
            type="success" 
          />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
        setFormData({ name: '', email: '', subject: 'general', message: '' });
      }
    } catch (error) {
      toast(
        <CustomToast 
          title="Submission Failed" 
          message={error.response?.data?.message || "Please try again later."} 
          type="error" 
        />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="flex-1 pt-20 pb-16 px-6 max-w-7xl mx-auto w-full">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-med-dark dark:text-white tracking-tight mb-4">
            How can we assist you?
          </h1>
          <p className="text-lg text-med-text-secondary dark:text-gray-400 max-w-2xl">
            Connect with our clinical team or support staff. We're here to ensure your experience with MedPulse is seamless and reassuring.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 bg-surface-container-lowest dark:bg-[#1a2c2c] rounded-xl p-8 flex flex-col gap-6 border border-[#e5e7eb] dark:border-gray-700">
            <h2 className="text-2xl font-bold text-med-dark dark:text-white mb-2">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 ml-1">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#e6e8ea] dark:bg-[#253636] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1a2c2c] transition-all outline-none text-med-dark dark:text-white"
                    placeholder="Dr. Sarah Mitchell"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 ml-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#e6e8ea] dark:bg-[#253636] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1a2c2c] transition-all outline-none text-med-dark dark:text-white"
                    placeholder="sarah@hospital.org"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 ml-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#e6e8ea] dark:bg-[#253636] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1a2c2c] transition-all outline-none text-med-dark dark:text-white appearance-none"
                >
                  {subjectOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 ml-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-[#e6e8ea] dark:bg-[#253636] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1a2c2c] transition-all outline-none resize-none text-med-dark dark:text-white"
                  placeholder="Describe your inquiry or concern. For patient cases, please include relevant medical history."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4  bg-primary text-black font-bold rounded-full hover:shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>

          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="bg-surface-container-low dark:bg-[#1a2c2c] rounded-xl p-8 flex flex-col gap-6 border border-[#e5e7eb] dark:border-gray-700">
              <h3 className="text-xl font-bold text-med-dark dark:text-white">Direct Contact</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#76f3ea] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#002204]">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-med-text-secondary dark:text-gray-400 mb-1">Email Us</p>
                    <p className="font-medium text-med-dark dark:text-white">care@medpulse.sanctuary</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#76f3ea] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#002204]">call</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-med-text-secondary dark:text-gray-400 mb-1">24/7 Helpline</p>
                    <p className="font-medium text-med-dark dark:text-white">+1 (888) 555-PLSE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#76f3ea] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#002204]">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-med-text-secondary dark:text-gray-400 mb-1">Headquarters</p>
                    <p className="font-medium text-med-dark dark:text-white leading-relaxed">
                      42 Sanctuary Grove Way,<br />
                      Medical District, SF 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest dark:bg-[#1a2c2c] rounded-xl p-8 flex flex-col gap-4 border border-[#e5e7eb] dark:border-gray-700">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-med-dark dark:text-white">Clinical Support Hours</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#1e862d] rounded-full">
                  <span className="w-2 h-2 bg-[#94f990] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live Support</span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[#e6e8ea] dark:border-gray-700">
                  <span className="text-med-text-secondary dark:text-gray-400">Monday — Friday</span>
                  <span className="font-semibold text-med-dark dark:text-white">08:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e6e8ea] dark:border-gray-700">
                  <span className="text-med-text-secondary dark:text-gray-400">Saturday</span>
                  <span className="font-semibold text-med-dark dark:text-white">09:00 AM - 04:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-med-text-secondary dark:text-gray-400">Sunday & Holidays</span>
                  <span className="font-semibold text-red-500 dark:text-red-400">Emergency Only</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 relative h-80 rounded-xl overflow-hidden group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop"
              alt="MedPulse Headquarters"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-[#1a2c2c]/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#f7f9fb] dark:bg-[#253636] flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">map</span>
              </div>
              <div>
                <p className="font-bold text-med-dark dark:text-white">Our HQ Location</p>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">42 Sanctuary Grove Way, Medical District, SF</p>
              </div>
              <a 
                href="https://maps.google.com/?q=San+Francisco+Medical+District" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#0070ea] transition-colors"
              >
                <span className="material-symbols-outlined">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>

        <section className="mt-20 text-center bg-[#76f3ea]/20 rounded-xl py-12 px-6">
          <h2 className="text-2xl font-bold text-med-dark dark:text-white mb-3">Looking for immediate answers?</h2>
          <p className="text-med-text-secondary dark:text-gray-400 mb-6">
            Our help center contains articles on onboarding, technical requirements, and medical compliance.
          </p>
          <a 
            className="inline-flex items-center gap-2 font-bold text-primary hover:text-[#0070ea] transition-colors" 
            href="#"
          >
            Browse Documentation
            <span className="material-symbols-outlined text-lg">menu_book</span>
          </a>
        </section>
      </main>

      
    </div>
  );
};

export default ContactPage;
