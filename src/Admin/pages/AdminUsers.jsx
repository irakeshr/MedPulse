import React, { useEffect, useState } from "react";
import { DeleteUser, getAllUsers, userApprove } from "../../server/allApi";
import { formatDistanceToNow, isValid, differenceInMinutes } from "date-fns";
import CountUp from "../../../reactBitAnimation/CountUp";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";
import { Pagination, PaginationItem } from "@mui/material";
 
 

export default function AdminUsers() {
  const [SearchKey, setSearchKey] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [usersCount, setUsersCount] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 15,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);

  // Helper for Status Styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return {
          badge:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
          dot: "bg-green-600",
        };
      case "suspended":
        return {
          badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
          dot: "bg-red-600",
        };
      case "pending":
        return {
          badge:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
          dot: "bg-yellow-500 animate-pulse",
        };
      default:
        return { badge: "", dot: "" };
    }
  };

  // Helper for Role Icons
  const getRoleIcon = (role) => {
    switch (role) {
      case "Doctor":
        return "stethoscope";
      case "admin":
        return "shield";
      default:
        return "person";
    }
  };

  // START USER APPROVE
  const handleUserApprove = async (userId, status) => {
    try {
      const respond = await userApprove(userId, { status });
      if (respond.status === 200) {
        toast(
          <CustomToast
            title="Updated Status Successfully"
            message={respond?.data?.message}
            type="success"
          />
        );
      }
      fetchUsers(pagination.currentPage); // Refresh current page
    } catch (error) {
      toast(
        <CustomToast
          title=" Status Update Failed"
          message={error.response?.data?.message}
          type="error"
        />
      );
    }
  };

  // Function to fetch users with pagination
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      // Pass page and limit as query parameters
      const res = await getAllUsers(page, pagination.limit,SearchKey);

      if (res.status === 200) {
        setAllUsers(res.data.allUsers);
        setUsersCount(res.data.usersCount);
        setPagination(res.data.pagination);
        console.log("pagination from API:", res.data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1); // Load first page on mount
  }, [SearchKey]);

  // Handle page change
  const handlePageChange = (event, value) => {
    fetchUsers(value);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete user all data post,comment , ...etc
  const handleDeleteUser = async (userId, username) => {
    try {
      const respond = await DeleteUser(userId, { username });
      toast(
        <CustomToast
          title="Delete Completed"
          message={respond?.data?.message}
          type="success"
        />
      );
      fetchUsers(pagination.currentPage); // Refresh current page after deletion
    } catch (error) {
      toast(
        <CustomToast
          title="failed Deletion"
          message={error.response?.data?.message}
          type="error"
        />
      );
    }
  };

  // Calculate showing range
  const startItem = (pagination.currentPage - 1) * pagination.limit + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.totalCount
  );

  return (
     
      <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
        <div className="flex flex-1 h-[calc(100vh-72px)] overflow-hidden max-w-[1440px] mx-auto w-full">
          <main className="flex-1 flex flex-col w-full px-4 lg:px-8 py-8 gap-8 overflow-y-auto">
            {/* Page Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-med-dark dark:text-white">
                  User Management
                </h1>
                <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">
                  Manage user accounts, permissions, and view status.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white rounded-lg text-sm font-medium hover:bg-med-gray transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    download
                  </span>
                  Export List
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">
                    person_add
                  </span>
                  Add New User
                </button>
              </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">
                    <CountUp
                      to={usersCount?.totalCount || 0}
                      duration={2}
                      className="count-up-text"
                    />
                  </h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">
                    New This Month
                  </p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">
                    <CountUp
                      to={usersCount?.usersThisMonthCount || 0}
                      duration={2}
                      className="count-up-text"
                    />
                  </h3>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-600">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">
                    Suspended
                  </p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">
                    <CountUp
                      to={usersCount?.suspendedCount || 0}
                      duration={2}
                      className="count-up-text"
                    />
                  </h3>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600">
                  <span className="material-symbols-outlined">block</span>
                </div>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-6 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-med-text-secondary">
                      search
                    </span>
                  </div>
                  <input
                  onChange={(e)=>setSearchKey(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-[#e5e7eb] dark:border-[#2a3838] rounded-xl leading-5 bg-white dark:bg-[#253636] placeholder-med-text-secondary dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm dark:text-white transition duration-150 ease-in-out"
                    placeholder="Search by name, email, or user ID"
                    type="text"
                  />
                </div>
                <div className="lg:col-span-2">
                  <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-[#2a3838] focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-white dark:bg-[#253636] text-med-dark dark:text-white">
                    <option>Role: All</option>
                    <option>Patient</option>
                    <option>Doctor</option>
                    <option>Moderator</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-[#2a3838] focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-white dark:bg-[#253636] text-med-dark dark:text-white">
                    <option>Status: All</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <button className="w-full flex justify-center items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm text-sm font-medium rounded-xl text-med-dark dark:text-white bg-white dark:bg-[#253636] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      filter_list
                    </span>
                    More Filters
                  </button>
                </div>
              </div>
            </div>

            {/* User Table */}
            <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Joined Date</th>
                      <th className="px-6 py-4">Last Active</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a3838]">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      allUsers?.map((user) => (
                        <tr
                          key={user._id}
                          className={`hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors ${
                            user.status === "Suspended"
                              ? "bg-red-50/30 dark:bg-red-900/5"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {user.profileImage ? (
                                <div
                                  className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-100"
                                  style={{
                                    backgroundImage: `url(${user.profileImage})`,
                                  }}
                                ></div>
                              ) : (
                                <div
                                  className={`size-10 rounded-full flex items-center justify-center font-bold text-sm
                                  ${
                                    user.color === "purple"
                                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
                                      : ""
                                  }
                                  ${
                                    user.color === "orange"
                                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300"
                                      : ""
                                  }
                                  ${
                                    user.color === "teal"
                                      ? "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300"
                                      : ""
                                  }
                                `}
                                >
                                  {user.username.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-med-dark dark:text-white">
                                  {user.name}
                                </div>
                                <div className="text-xs text-med-text-secondary">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium 
                              ${
                                user.role === "admin"
                                  ? "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                  : user.role === "doctor"
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {getRoleIcon(user.role)}
                              </span>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                getStatusStyle(user.stats.approved).badge
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  getStatusStyle(user.stats.approved).dot
                                }`}
                              ></span>
                              {user.stats.approved}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-med-text-secondary">
                            {user.createdAt && isValid(new Date(user.createdAt))
                              ? formatDistanceToNow(new Date(user.createdAt), {
                                  addSuffix: true,
                                })
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 text-med-dark dark:text-gray-300">
                            {user.lastActive &&
                            isValid(new Date(user.lastActive)) ? (
                              differenceInMinutes(
                                new Date(),
                                new Date(user.lastActive)
                              ) <= 5 ? (
                                <span className="flex items-center gap-1">
                                  <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                                  Online
                                </span>
                              ) : (
                                formatDistanceToNow(
                                  new Date(user.lastActive),
                                  {
                                    addSuffix: true,
                                  }
                                )
                              )
                            ) : (
                              "N/A"
                            )}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {user.stats.approved === "pending" ? (
                                <button
                                  className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                  title="Approve"
                                  onClick={() =>
                                    handleUserApprove(user._id, "active")
                                  }
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    check_circle
                                  </span>
                                </button>
                              ) : user.stats.approved === "suspended" ? (
                                <button
                                  className="p-1.5 text-med-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                  title="undo suspend"
                                  onClick={() =>
                                    handleUserApprove(user._id, "active")
                                  }
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    undo
                                  </span>
                                </button>
                              ) : null}

                              {user.stats.approved === "suspended" ? (
                                <button
                                  onClick={() =>
                                    handleDeleteUser(user._id, user.username)
                                  }
                                  className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors"
                                  title="Delete User"
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    delete
                                  </span>
                                </button>
                              ) : user.stats.approved === "active" ? (
                                <button
                                  className="p-1.5 text-med-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Suspend User"
                                  onClick={() =>
                                    handleUserApprove(user._id, "suspended")
                                  }
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    block
                                  </span>
                                </button>
                              ) : (
                                <button
                                  className="p-1.5 text-med-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Suspend User"
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    block
                                  </span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Material-UI Pagination Footer */}
              <div className="px-6 py-4 border-t border-[#e5e7eb] dark:border-[#2a3838] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1a2c2c]">
                <p className="text-sm text-med-text-secondary">
                  Showing{" "}
                  <span className="font-medium text-med-dark dark:text-white">
                    {pagination.totalCount > 0 ? startItem : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-med-dark dark:text-white">
                    {endItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-med-dark dark:text-white">
                    {pagination.totalCount}
                  </span>{" "}
                  results
                </p>

                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="medium"
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      className={`${
                        item.selected
                          ? "bg-med-dark dark:bg-primary text-white dark:text-med-dark"
                          : "text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636]"
                      } rounded-lg border-none`}
                      components={{
                        first: () => (
                          <span className="material-symbols-outlined text-[20px]">
                            first_page
                          </span>
                        ),
                        last: () => (
                          <span className="material-symbols-outlined text-[20px]">
                            last_page
                          </span>
                        ),
                        previous: () => (
                          <span className="material-symbols-outlined text-[20px]">
                            chevron_left
                          </span>
                        ),
                        next: () => (
                          <span className="material-symbols-outlined text-[20px]">
                            chevron_right
                          </span>
                        ),
                      }}
                    />
                  )}
                 />
              </div>
            </div>
          </main>
        </div>
      </div>
     
  );
}