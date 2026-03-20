import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { 
  getAllJobApplicationsApi, 
  updateApplicationStatusApi,
  deleteApplicationApi 
} from '../../server/allApi';
import CustomToast from '../../components/CustomToast';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, interviewed: 0, accepted: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (searchTerm) params.append('search', searchTerm);
      
      const res = await getAllJobApplicationsApi(`?${params.toString()}`);
      if (res.data.success) {
        setApplications(res.data.applications);
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) fetchApplications();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleStatusChange = async (careerId, applicationId, newStatus) => {
    try {
      const res = await updateApplicationStatusApi(careerId, applicationId, newStatus);
      if (res.data.success) {
        toast(
          <CustomToast title="Status Updated" message="Application status has been updated." type="success" />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
        fetchApplications();
      }
    } catch (error) {
      toast(
        <CustomToast title="Update Failed" message="Failed to update status." type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    }
  };

  const handleDelete = async (careerId, applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      const res = await deleteApplicationApi(careerId, applicationId);
      if (res.data.success) {
        toast(
          <CustomToast title="Deleted" message="Application has been deleted." type="success" />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
        setShowModal(false);
        fetchApplications();
      }
    } catch (error) {
      toast(
        <CustomToast title="Delete Failed" message="Failed to delete application." type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    }
  };

  const openApplicationDetail = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    reviewed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    interviewed: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-med-dark dark:text-white">Job Applications</h1>
          <p className="text-sm text-med-text-secondary dark:text-gray-400">Manage job applications from candidates</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1a2c2c] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-med-text-secondary dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-med-dark dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400">Reviewed</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.reviewed}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-600 dark:text-purple-400">Interviewed</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.interviewed}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400">Accepted</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.accepted}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">Rejected</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#253636] border border-gray-200 dark:border-gray-700 text-med-dark dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#253636] border border-gray-200 dark:border-gray-700 text-med-dark dark:text-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a2c2c] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#253636]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Applicant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Position</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Applied</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-med-text-secondary dark:text-gray-400">Loading...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-med-text-secondary dark:text-gray-400">No applications found</td>
                </tr>
              ) : (
                applications.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-[#253636] transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-med-dark dark:text-white">{app.applicantName}</p>
                        <p className="text-sm text-med-text-secondary dark:text-gray-400">{app.applicantEmail}</p>
                        {app.applicantPhone && (
                          <p className="text-sm text-med-text-secondary dark:text-gray-400">{app.applicantPhone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-med-dark dark:text-white">{app.careerTitle}</p>
                      <p className="text-sm text-med-text-secondary dark:text-gray-400">{app.careerDepartment}</p>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.careerId, app._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[app.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-sm text-med-text-secondary dark:text-gray-400">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => openApplicationDetail(app)}
                        className="px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-med-dark dark:text-white">{selectedApp.applicantName}</h2>
                <p className="text-med-text-secondary dark:text-gray-400">{selectedApp.applicantEmail}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-med-text-secondary dark:text-gray-400 mb-1">Position</p>
                  <p className="font-medium text-med-dark dark:text-white">{selectedApp.careerTitle}</p>
                  <p className="text-sm text-med-text-secondary dark:text-gray-400">{selectedApp.careerDepartment}</p>
                </div>
                <div>
                  <p className="text-sm text-med-text-secondary dark:text-gray-400 mb-1">Applied On</p>
                  <p className="font-medium text-med-dark dark:text-white">{new Date(selectedApp.appliedAt).toLocaleDateString()}</p>
                </div>
                {selectedApp.applicantPhone && (
                  <div>
                    <p className="text-sm text-med-text-secondary dark:text-gray-400 mb-1">Phone</p>
                    <p className="font-medium text-med-dark dark:text-white">{selectedApp.applicantPhone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-med-text-secondary dark:text-gray-400 mb-1">Status</p>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.careerId, selectedApp._id, e.target.value)}
                    className={`mt-1 px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${statusColors[selectedApp.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {selectedApp.coverLetter && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 mb-2">Cover Letter</h3>
                  <p className="text-med-dark dark:text-white bg-gray-50 dark:bg-[#253636] p-4 rounded-lg whitespace-pre-line">
                    {selectedApp.coverLetter}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <button
                onClick={() => handleDelete(selectedApp.careerId, selectedApp._id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                Delete Application
              </button>
              <a
                href={`mailto:${selectedApp.applicantEmail}?subject=Regarding your application for ${selectedApp.careerTitle}`}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#0070ea]"
              >
                Contact Applicant
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
