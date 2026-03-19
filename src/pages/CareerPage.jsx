import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCareersApi, getCareerByIdApi, applyToCareerApi } from '../server/allApi';
import { toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';

const CareerPage = () => {
  const [careers, setCareers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    type: ''
  });

  const [applicationForm, setApplicationForm] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

  const benefits = [
    { icon: 'health_and_safety', title: 'Comprehensive Health', desc: 'Top-tier medical, dental, and vision coverage for you and your family.' },
    { icon: 'work_history', title: 'Flexible & Remote First', desc: 'Work from where you feel most productive. We focus on impact.' },
    { icon: 'diversity_3', title: 'Inclusive Community', desc: 'A diverse team brings diverse solutions. Everyone belongs here.' }
  ];

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async (queryParams = '') => {
    try {
      setLoading(true);
      const res = await getAllCareersApi(queryParams);
      if (res.data?.careers) {
        setCareers(res.data.careers);
        if (res.data.departments) {
          setDepartments(res.data.departments);
        }
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.department) params.append('department', filters.department);
    if (filters.type) params.append('type', filters.type);
    fetchCareers(`?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search || filters.department || filters.type) {
        applyFilters();
      } else {
        fetchCareers();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const openCareerDetail = async (career) => {
    try {
      const res = await getCareerByIdApi(career._id);
      if (res.data?.career) {
        setSelectedCareer(res.data.career);
        setShowModal(true);
      }
    } catch (error) {
      toast.error('Failed to load career details');
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!applicationForm.applicantName || !applicationForm.applicantEmail) {
      toast.error('Name and email are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await applyToCareerApi(selectedCareer._id, applicationForm);
      if (res.status === 201) {
        toast(
          <CustomToast
            title="Application Submitted"
            message="Your application has been successfully submitted!"
            type="success"
          />
        );
        setShowModal(false);
        setApplicationForm({ applicantName: '', applicantEmail: '', applicantPhone: '', coverLetter: '' });
      }
    } catch (error) {
      toast(
        <CustomToast
          title="Application Failed"
          message={error.response?.data?.message || "Failed to submit application"}
          type="error"
        />
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary?.min && !salary?.max) return 'Salary not specified';
    const format = (num) => num ? `$${num.toLocaleString()}` : '';
    if (salary.min && salary.max) {
      return `${format(salary.min)} - ${format(salary.max)}`;
    }
    return `From ${format(salary.min || salary.max)}`;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date() > new Date(deadline);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-[#1a2c2c] border-b border-gray-200 dark:border-[#2a3838] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#13ecec]/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-[#253636] text-[#618989] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="size-2 rounded-full bg-[#13ecec] animate-pulse"></span>
              We are hiring
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111818] dark:text-white mb-6 leading-tight">
              Help us build the <span className="text-[#0ebdbd] dark:text-[#13ecec]">heartbeat</span> of modern healthcare.
            </h1>
            <p className="text-lg text-[#618989] dark:text-gray-400 mb-8 leading-relaxed">
              Join a team of doctors, engineers, and visionaries dedicated to making healthcare accessible, transparent, and human-centric. At MedPulse, your work saves lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#open-positions" className="px-6 py-3 bg-[#13ecec] text-[#111818] font-bold rounded-xl hover:bg-[#0ebdbd] transition-colors shadow-lg shadow-[#13ecec]/20">
                View Open Positions
              </a>
              <button className="px-6 py-3 bg-white dark:bg-[#253636] border border-gray-200 dark:border-[#2a3838] text-[#111818] dark:text-white font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-[#2a3838] transition-colors">
                Read About Our Culture
              </button>
            </div>
          </div>
          <div className="hidden md:block w-1/3 relative">
            <div className="grid grid-cols-2 gap-4 opacity-90">
              <div className="bg-gray-100 dark:bg-[#253636] h-40 rounded-2xl rounded-tr-[4rem]"></div>
              <div className="bg-[#13ecec]/20 h-40 rounded-2xl rounded-bl-[4rem] mt-8"></div>
              <div className="bg-[#618989]/10 h-40 rounded-2xl rounded-tl-[4rem] -mt-8"></div>
              <div className="bg-gray-100 dark:bg-[#253636] h-40 rounded-2xl rounded-br-[4rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MedPulse Section */}
      <section className="py-20 bg-[#f6f8f8] dark:bg-[#102222]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#111818] dark:text-white mb-4">Why MedPulse?</h2>
            <p className="text-[#618989] dark:text-gray-400">
              We believe in taking care of our people so they can take care of the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-[#1a2c2c] p-8 rounded-2xl border border-gray-200 dark:border-[#2a3838] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-[#618989] dark:text-gray-400 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white dark:bg-[#1a2c2c] border-t border-gray-200 dark:border-[#2a3838]" id="open-positions">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#111818] dark:text-white mb-2">Current Openings</h2>
              <p className="text-[#618989] dark:text-gray-400">Join our growing team in engineering, product, and medical operations.</p>
            </div>
            <div className="flex gap-2">
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="form-select rounded-lg border-gray-200 dark:border-[#2a3838] bg-gray-100 dark:bg-[#253636] text-[#111818] dark:text-white text-sm py-2 pl-4 pr-10 focus:ring-[#13ecec] focus:border-[#13ecec] cursor-pointer"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="form-select rounded-lg border-gray-200 dark:border-[#2a3838] bg-gray-100 dark:bg-[#253636] text-[#111818] dark:text-white text-sm py-2 pl-4 pr-10 focus:ring-[#13ecec] focus:border-[#13ecec] cursor-pointer"
              >
                <option value="">All Types</option>
                {employmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13ecec]"></div>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">work_off</span>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">No positions found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {careers.map((career) => (
                <div
                  key={career._id}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-[#2a3838] bg-[#f6f8f8] dark:bg-[#152323] hover:border-[#13ecec]/50 hover:bg-white dark:hover:bg-[#1a2c2c] hover:shadow-lg hover:shadow-[#13ecec]/5 transition-all duration-300 cursor-pointer"
                  onClick={() => openCareerDetail(career)}
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-[#111818] dark:text-white mb-2 group-hover:text-[#0ebdbd] dark:group-hover:text-[#13ecec] transition-colors">
                      {career.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-[#618989]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">{career.department.toLowerCase().includes('engine') || career.department.toLowerCase().includes('tech') ? 'code' : career.department.toLowerCase().includes('medical') ? 'medical_services' : 'inventory_2'}</span>
                        {career.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {career.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {career.type}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <button className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-[#111818] dark:border-white text-[#111818] dark:text-white font-semibold text-sm group-hover:bg-[#111818] group-hover:text-white dark:group-hover:bg-[#13ecec] dark:group-hover:text-[#111818] dark:group-hover:border-[#13ecec] transition-all">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center py-8">
            <p className="text-[#618989] text-sm">Don't see a role that fits? <a className="text-[#0ebdbd] dark:text-[#13ecec] font-bold hover:underline" href="#">Send us your resume</a> for future consideration.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#111818] dark:bg-[#102222] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-4xl text-[#13ecec] mb-4">rocket_launch</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            We're building something special, and we'd love for you to be a part of it. Join MedPulse today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-3.5 bg-[#13ecec] text-[#111818] font-bold rounded-xl hover:bg-[#0ebdbd] transition-colors">
              Apply Now
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      {/* Career Detail Modal */}
      {showModal && selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-[#2a3838]">
            <div className="sticky top-0 bg-white dark:bg-[#1a2c2c] border-b border-gray-200 dark:border-[#2a3838] p-6 flex justify-between items-center rounded-t-2xl">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#13ecec]/10 text-[#13ecec] mb-2">
                  {selectedCareer.department}
                </span>
                <h2 className="text-2xl font-bold text-[#111818] dark:text-white">
                  {selectedCareer.title}
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#253636] rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[#618989] dark:text-gray-300">
                  <span className="material-symbols-outlined">location_on</span>
                  {selectedCareer.location}
                </div>
                <div className="flex items-center gap-2 text-[#618989] dark:text-gray-300">
                  <span className="material-symbols-outlined">schedule</span>
                  {selectedCareer.type}
                </div>
                <div className="flex items-center gap-2 text-[#618989] dark:text-gray-300">
                  <span className="material-symbols-outlined">payments</span>
                  {formatSalary(selectedCareer.salary)}
                </div>
                {selectedCareer.applicationDeadline && (
                  <div className={`flex items-center gap-2 ${isDeadlinePassed(selectedCareer.applicationDeadline) ? 'text-red-500' : 'text-[#618989] dark:text-gray-300'}`}>
                    <span className="material-symbols-outlined">event</span>
                    Deadline: {new Date(selectedCareer.applicationDeadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-[#111818] dark:text-white mb-3">About the Role</h3>
                <p className="text-[#618989] dark:text-gray-300 whitespace-pre-line">
                  {selectedCareer.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedCareer.requirements?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#111818] dark:text-white mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedCareer.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#618989] dark:text-gray-300">
                        <span className="material-symbols-outlined text-[#13ecec] text-base mt-0.5">check_circle</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {selectedCareer.responsibilities?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#111818] dark:text-white mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedCareer.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#618989] dark:text-gray-300">
                        <span className="material-symbols-outlined text-blue-500 text-base mt-0.5">arrow_right</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedCareer.benefits?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#111818] dark:text-white mb-3">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.benefits.map((benefit, index) => (
                      <span key={index} className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply Button */}
              {!isDeadlinePassed(selectedCareer.applicationDeadline) && (
                <div className="pt-4 border-t border-gray-200 dark:border-[#2a3838]">
                  <button
                    onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-3 bg-[#13ecec] hover:bg-[#0ebdbd] text-[#111818] font-bold rounded-xl transition-colors"
                  >
                    Apply for this Position
                  </button>
                </div>
              )}

              {/* Application Form */}
              <div id="apply-form" className="pt-4 border-t border-gray-200 dark:border-[#2a3838]">
                <h3 className="text-lg font-semibold text-[#111818] dark:text-white mb-4">Apply Now</h3>
                <form onSubmit={handleApply} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111818] dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={applicationForm.applicantName}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, applicantName: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3838] bg-gray-50 dark:bg-[#152323] text-[#111818] dark:text-white focus:ring-2 focus:ring-[#13ecec] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111818] dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={applicationForm.applicantEmail}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, applicantEmail: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3838] bg-gray-50 dark:bg-[#152323] text-[#111818] dark:text-white focus:ring-2 focus:ring-[#13ecec] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111818] dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={applicationForm.applicantPhone}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, applicantPhone: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3838] bg-gray-50 dark:bg-[#152323] text-[#111818] dark:text-white focus:ring-2 focus:ring-[#13ecec] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111818] dark:text-gray-300 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3838] bg-gray-50 dark:bg-[#152323] text-[#111818] dark:text-white focus:ring-2 focus:ring-[#13ecec] outline-none resize-none"
                      placeholder="Tell us why you'd be a great fit for this role..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#13ecec] hover:bg-[#0ebdbd] disabled:bg-gray-400 text-[#111818] font-bold rounded-xl transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPage;
