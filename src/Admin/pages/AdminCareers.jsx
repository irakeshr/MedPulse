import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';
import {
  getAllCareersAdminApi,
  createCareerApi,
  updateCareerApi,
  deleteCareerApi,
  getCareerApplicationsApi,
  updateApplicationStatusApi,
  deleteApplicationApi
} from '../../server/allApi';

const AdminCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showApplications, setShowApplications] = useState(false);
  const [applications, setApplications] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [''],
    responsibilities: [''],
    salaryMin: '',
    salaryMax: '',
    benefits: [''],
    applicationDeadline: '',
    isActive: true
  });

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await getAllCareersAdminApi();
      if (res.data?.careers) {
        setCareers(res.data.careers);
      }
    } catch {
      toast.error('Failed to fetch careers');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCareer(null);
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: [''],
      responsibilities: [''],
      salaryMin: '',
      salaryMax: '',
      benefits: [''],
      applicationDeadline: '',
      isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title || '',
      department: career.department || '',
      location: career.location || '',
      type: career.type || 'Full-time',
      description: career.description || '',
      requirements: career.requirements?.length > 0 ? career.requirements : [''],
      responsibilities: career.responsibilities?.length > 0 ? career.responsibilities : [''],
      salaryMin: career.salary?.min || '',
      salaryMax: career.salary?.max || '',
      benefits: career.benefits?.length > 0 ? career.benefits : [''],
      applicationDeadline: career.applicationDeadline ? career.applicationDeadline.split('T')[0] : '',
      isActive: career.isActive ?? true
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.department || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const careerData = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      requirements: formData.requirements.filter(r => r.trim()),
      responsibilities: formData.responsibilities.filter(r => r.trim()),
      salary: {
        min: formData.salaryMin ? parseInt(formData.salaryMin) : null,
        max: formData.salaryMax ? parseInt(formData.salaryMax) : null,
        currency: 'USD'
      },
      benefits: formData.benefits.filter(b => b.trim()),
      applicationDeadline: formData.applicationDeadline || null,
      isActive: formData.isActive
    };

    try {
      if (editingCareer) {
        await updateCareerApi(editingCareer._id, careerData);
        toast(<CustomToast title="Updated" message="Career updated successfully" type="success" />);
      } else {
        await createCareerApi(careerData);
        toast(<CustomToast title="Created" message="Career created successfully" type="success" />);
      }
      setShowModal(false);
      fetchCareers();
    } catch (error) {
      toast(<CustomToast title="Error" message={error.response?.data?.message || "Failed to save career"} type="error" />);
    }
  };

  const handleDelete = async (careerId) => {
    if (!window.confirm('Are you sure you want to delete this career?')) return;
    
    try {
      await deleteCareerApi(careerId);
      toast(<CustomToast title="Deleted" message="Career deleted successfully" type="success" />);
      fetchCareers();
    } catch {
      toast(<CustomToast title="Error" message="Failed to delete career" type="error" />);
    }
  };

  const viewApplications = async (career) => {
    setSelectedCareer(career);
    try {
      const res = await getCareerApplicationsApi(career._id);
      if (res.data?.applications) {
        setApplications(res.data.applications);
      }
      setShowApplications(true);
    } catch {
      toast.error('Failed to fetch applications');
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatusApi(selectedCareer._id, applicationId, status);
      toast(<CustomToast title="Updated" message="Application status updated" type="success" />);
      const res = await getCareerApplicationsApi(selectedCareer._id);
      if (res.data?.applications) {
        setApplications(res.data.applications);
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (applicationId) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await deleteApplicationApi(selectedCareer._id, applicationId);
      toast(<CustomToast title="Deleted" message="Application deleted" type="success" />);
      setApplications(applications.filter(a => a._id !== applicationId));
    } catch {
      toast.error('Failed to delete application');
    }
  };

  const updateArrayField = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      reviewed: 'bg-blue-100 text-blue-700',
      interviewed: 'bg-purple-100 text-purple-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-med-dark dark:text-white">Career Management</h1>
          <p className="text-sm text-gray-500">Manage job postings and applications</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add Career
        </button>
      </div>

      {/* Careers Table */}
      <div className="bg-white dark:bg-[#1a2c2c] rounded-xl shadow-sm border border-gray-200 dark:border-[#2a3838] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#253636]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : careers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No careers found. Create your first job posting.
                  </td>
                </tr>
              ) : (
                careers.map((career) => (
                  <tr key={career._id} className="hover:bg-gray-50 dark:hover:bg-[#253636]/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-med-dark dark:text-white">{career.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{career.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{career.location}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{career.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <button
                        onClick={() => viewApplications(career)}
                        className="text-primary hover:underline"
                      >
                        {career.applications?.length || 0} applications
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${career.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {career.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(career)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(career._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-[#1a2c2c] border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-med-dark dark:text-white">
                {editingCareer ? 'Edit Career' : 'Create Career'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {employmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Salary</label>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Salary</label>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Application Deadline</label>
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, applicationDeadline: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requirements</label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter requirement"
                    />
                    {formData.requirements.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem('requirements', index)} className="text-red-500">×</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('requirements')} className="text-sm text-primary">+ Add Requirement</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Responsibilities</label>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => updateArrayField('responsibilities', index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter responsibility"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem('responsibilities', index)} className="text-red-500">×</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('responsibilities')} className="text-sm text-primary">+ Add Responsibility</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Benefits</label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateArrayField('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter benefit"
                    />
                    {formData.benefits.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem('benefits', index)} className="text-red-500">×</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('benefits')} className="text-sm text-primary">+ Add Benefit</button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-primary rounded"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">Active (Visible on website)</label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  {editingCareer ? 'Update Career' : 'Create Career'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplications && selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-[#1a2c2c] border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-med-dark dark:text-white">
                  Applications for {selectedCareer.title}
                </h2>
                <p className="text-sm text-gray-500">{applications.length} applicants</p>
              </div>
              <button onClick={() => setShowApplications(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              {applications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No applications yet
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app._id} className="bg-gray-50 dark:bg-[#253636] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-med-dark dark:text-white">{app.applicantName}</h4>
                          <p className="text-sm text-gray-500">{app.applicantEmail}</p>
                          {app.applicantPhone && <p className="text-sm text-gray-500">{app.applicantPhone}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                          <select
                            value={app.status}
                            onChange={(e) => updateStatus(app._id, e.target.value)}
                            className="text-xs px-2 py-1 border rounded"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                      {app.coverLetter && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{app.coverLetter}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteApplication(app._id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
