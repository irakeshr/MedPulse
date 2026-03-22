import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { 
  getAllContactsApi, 
  updateContactStatusApi, 
  addContactNoteApi, 
  deleteContactApi 
} from '../../server/allApi';
import CustomToast from '../../components/CustomToast';

const AdminInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, in_progress: 0, resolved: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', subject: '' });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.subject) params.append('subject', filters.subject);
      if (searchTerm) params.append('search', searchTerm);
      
      const res = await getAllContactsApi(`?${params.toString()}`);
      if (res.data.success) {
        setContacts(res.data.contacts);
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) fetchContacts();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const res = await updateContactStatusApi(contactId, { status: newStatus });
      if (res.data.success) {
        toast(
          <CustomToast title="Status Updated" message="Contact status has been updated." type="success" />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
        fetchContacts();
      }
    } catch (error) {
      toast(
        <CustomToast title="Update Failed" message="Failed to update status." type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await deleteContactApi(contactId);
      if (res.data.success) {
        toast(
          <CustomToast title="Deleted" message="Inquiry has been deleted." type="success" />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
        setShowModal(false);
        fetchContacts();
      }
    } catch (error) {
      toast(
        <CustomToast title="Delete Failed" message="Failed to delete inquiry." type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim() || !selectedContact) return;
    try {
      const res = await addContactNoteApi(selectedContact._id, noteText);
      if (res.data.success) {
        toast(
          <CustomToast title="Note Added" message="Your note has been added." type="success" />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
        setNoteText('');
        setSelectedContact(res.data.contact);
      }
    } catch (error) {
      toast(
        <CustomToast title="Failed" message="Failed to add note." type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    }
  };

  const openContactDetail = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    in_progress: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    closed: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  };

  const priorityColors = {
    low: 'text-gray-400',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500'
  };

  const subjectLabels = {
    general: 'General',
    technical: 'Technical',
    doctor: 'Doctor Partnership',
    patient: 'Patient Support',
    media: 'Media & Press',
    emergency: 'Emergency'
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-med-dark dark:text-white">Contact Inquiries</h1>
          <p className="text-sm text-med-text-secondary dark:text-gray-400">Manage and respond to user inquiries</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1a2c2c] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-med-text-secondary dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-med-dark dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400">New</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.new}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.in_progress}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400">Resolved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Closed</p>
          <p className="text-2xl font-bold text-gray-500">{stats.closed}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a2c2c] rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or message..."
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
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filters.subject}
            onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#253636] border border-gray-200 dark:border-gray-700 text-med-dark dark:text-white"
          >
            <option value="">All Subjects</option>
            <option value="general">General</option>
            <option value="technical">Technical</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            <option value="media">Media</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a2c2c] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#253636]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-med-text-secondary dark:text-gray-400">Loading...</td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-med-text-secondary dark:text-gray-400">No inquiries found</td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-[#253636] transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-med-dark dark:text-white">{contact.name}</p>
                        <p className="text-sm text-med-text-secondary dark:text-gray-400">{contact.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm ${contact.priority === 'urgent' ? 'text-red-500 font-semibold' : 'text-med-text-secondary dark:text-gray-400'}`}>
                        {subjectLabels[contact.subject] || contact.subject}
                      </span>
                      {contact.priority === 'urgent' && (
                        <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">Urgent</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[contact.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-sm text-med-text-secondary dark:text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => openContactDetail(contact)}
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

      {showModal && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-med-dark dark:text-white">{selectedContact.name}</h2>
                <p className="text-med-text-secondary dark:text-gray-400">{selectedContact.email}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedContact.status]}`}>
                  {selectedContact.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-med-text-secondary dark:text-gray-400">
                  {subjectLabels[selectedContact.subject]}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 mb-2">Message</h3>
                <p className="text-med-dark dark:text-white bg-gray-50 dark:bg-[#253636] p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 mb-2">Add Note</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#253636] border border-gray-200 dark:border-gray-700 text-med-dark dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#0070ea]"
                  >
                    Add
                  </button>
                </div>
              </div>

              {selectedContact.adminNotes?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-med-text-secondary dark:text-gray-400 mb-2">Notes</h3>
                  <div className="space-y-2">
                    {selectedContact.adminNotes.map((note, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-[#253636] p-3 rounded-lg">
                        <p className="text-med-dark dark:text-white">{note.note}</p>
                        <p className="text-xs text-med-text-secondary dark:text-gray-400 mt-1">
                          {new Date(note.addedAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <button
                onClick={() => handleDelete(selectedContact._id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  fetchContacts();
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#0070ea]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
