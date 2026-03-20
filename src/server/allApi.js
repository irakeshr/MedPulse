import SERVER_URL from "./ServerURL";
import { CommonApi } from "./CommonApi";

// auth api

export const userRegister = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/register`, reqBody);
};
export const userLogin = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/login`, reqBody);
};
export const userGoogleLogin = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/googleLogin`, reqBody);
};

// OTP Auth APIs
export const sendOTPApi = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/otp/send-otp`, reqBody);
};

export const verifyOTPApi = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/otp/verify-otp`, reqBody);
};

export const resendOTPApi = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/otp/resend-otp`, reqBody);
};

export const tokenValidation = async () => {
  return await CommonApi("GET", `${SERVER_URL}/auth/validate-token`);
};
export const setUserRole = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/set-user-role`, reqBody);
};

// user api

export const updateProfile = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/user/update-profile`, reqBody);
};
export const getUserProfile = async () => {
  return await CommonApi("GET", `${SERVER_URL}/user/get-profile`);
};
export const fetchAllDoctors = async (queryParams = '') => {
  return await CommonApi("GET", `${SERVER_URL}/user/get-allDoctors${queryParams}`);
};
export const fetchOneDoctor = async (doctorId) => {
  return await CommonApi("GET", `${SERVER_URL}/user/${doctorId}/get-OneDoctor`);
};

// post api

export const userPost = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/posts/user-post`, reqBody);
};
export const getMyPostsApi = async () => {
  return await CommonApi("GET", `${SERVER_URL}/posts/my-posts`);
};

export const getPost = async (searchKey) => {
  return await CommonApi("GET", `${SERVER_URL}/posts/get-post?search=${searchKey}`);
};

export const deletePostApi = async (postId) => {
  return await CommonApi("DELETE", `${SERVER_URL}/posts/${postId}`);
};

export const editPostApi = async (postId, data) => {
  return await CommonApi("PUT", `${SERVER_URL}/posts/${postId}`, data, {
    "Content-Type": "multipart/form-data",
  });
};

export const likePostApi = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/posts/like-unlike`, reqBody);
};

export const toggleSavePostApi = async (postId) => {
  return await CommonApi("POST", `${SERVER_URL}/user/save-post/${postId}`);
};

export const getSavedPostsApi = async () => {
    return await CommonApi("GET", `${SERVER_URL}/user/saved-posts`);
};

export const createComment = async (postId, reqBody) => {
  return await CommonApi(
    "POST",
    `${SERVER_URL}/posts/${postId}/comments`,
    reqBody
  );
};

export const getCommentsByPost = async (postId) => {
  return await CommonApi("POST", `${SERVER_URL}/posts/${postId}/get-comments`);
};


// Doctor Related Api

export const PostUserDetails = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/profile`, reqBody);
};

export const getDoctorProfile = async () => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/get-profile`);
};

export const checkDoctorStatus = async () => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/doctor-status`)
}
export const getDoctorPosts = async () => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/get-doctor-posts`)
}
export const doctorPostResponse = async () => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/get-doctor-posts`)
}

// Admin ApiCalls

export const getAllDoctorsProfile = async () => {
  return await CommonApi("GET", `${SERVER_URL}/admin/get-all-doctor-profile`)
}
export const getAllUsers = async (page = 1, limit = 15, SearchKey = "", filters = {}) => {
  //  query parameters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(SearchKey && { search: SearchKey }),
    ...filters // role, status, etc.
  }).toString();

  return await CommonApi("GET", `${SERVER_URL}/admin/get-all-users-profile?${queryParams}`);
};
export const userApprove = async (userId, reqBody) => {
  return await CommonApi("PUT", `${SERVER_URL}/admin/${userId}/user-approve`, reqBody)
}
export const DeleteUser = async (userId, reqBody) => {
  return await CommonApi("DELETE", `${SERVER_URL}/admin/${userId}/delete-user`, reqBody)
}

export const VerifyDoctor = async (doctorId, reqBody) => {
  return await CommonApi("PUT", `${SERVER_URL}/admin/${doctorId}/doctor-verify`, reqBody)
}


export const fetchDoctorSlots = async (doctorId, date) => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/get-slots?doctorId=${doctorId}&date=${date}`);
};

export const createDoctorSlots = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/create-slots`, reqBody);
};

export const bookAppointment = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/book-slot`, reqBody);
};

export const toggleSlotBlock = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/toggle-slot-block`, reqBody);
};

export const cancelBooking = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/cancel-booking`, reqBody);
};

export const editBooking = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/edit-booking`, reqBody);
};

export const getUpcomingAppointments = async () => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/upcoming-appointments`);
};

export const getAvailableDates = async (doctorId) => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/available-dates?doctorId=${doctorId}`);
};

// Payment API

export const createCheckoutSession = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/payment/create-checkout-session`, reqBody);
};

export const getPaymentDetails = async (sessionId) => {
  return await CommonApi("GET", `${SERVER_URL}/payment/${sessionId}`);
};

export const verifyPaymentStatus = async (sessionId) => {
  return await CommonApi("GET", `${SERVER_URL}/payment/${sessionId}`);
};

// Doctor Saved Cases API
export const getSolvedCasesApi = async () => {
  return await CommonApi("GET", `${SERVER_URL}/doctor/solved-cases`);
};

export const saveCaseApi = async (postId) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/save-case/${postId}`);
};

export const removeCaseApi = async (postId) => {
  return await CommonApi("DELETE", `${SERVER_URL}/doctor/remove-case/${postId}`);
};

export const respondToPostApi = async (postId, content) => {
  return await CommonApi("POST", `${SERVER_URL}/doctor/posts/${postId}/respond`, { content });
};

export const resolvePostApi = async (postId) => {
  return await CommonApi("PUT", `${SERVER_URL}/doctor/posts/${postId}/resolve`);
};

// Career APIs
export const getAllCareersApi = async (queryParams = '') => {
  return await CommonApi("GET", `${SERVER_URL}/careers${queryParams}`);
};

export const getCareerByIdApi = async (careerId) => {
  return await CommonApi("GET", `${SERVER_URL}/careers/${careerId}`);
};

export const applyToCareerApi = async (careerId, applicationData) => {
  return await CommonApi("POST", `${SERVER_URL}/careers/${careerId}/apply`, applicationData);
};

export const getAllCareersAdminApi = async () => {
  return await CommonApi("GET", `${SERVER_URL}/careers/admin/all`);
};

export const createCareerApi = async (careerData) => {
  return await CommonApi("POST", `${SERVER_URL}/careers`, careerData);
};

export const updateCareerApi = async (careerId, careerData) => {
  return await CommonApi("PUT", `${SERVER_URL}/careers/${careerId}`, careerData);
};

export const deleteCareerApi = async (careerId) => {
  return await CommonApi("DELETE", `${SERVER_URL}/careers/${careerId}`);
};

export const getCareerApplicationsApi = async (careerId) => {
  return await CommonApi("GET", `${SERVER_URL}/careers/${careerId}/applications`);
};

export const updateApplicationStatusApi = async (careerId, applicationId, status) => {
  return await CommonApi("PUT", `${SERVER_URL}/careers/${careerId}/applications/${applicationId}`, { status });
};

export const deleteApplicationApi = async (careerId, applicationId) => {
  return await CommonApi("DELETE", `${SERVER_URL}/careers/${careerId}/applications/${applicationId}`);
};

// Contact Form APIs
export const submitContactApi = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/contact/submit`, reqBody);
};

export const getAllContactsApi = async (queryParams = '') => {
  return await CommonApi("GET", `${SERVER_URL}/contact/admin/all${queryParams}`);
};

export const getContactByIdApi = async (contactId) => {
  return await CommonApi("GET", `${SERVER_URL}/contact/admin/${contactId}`);
};

export const updateContactStatusApi = async (contactId, reqBody) => {
  return await CommonApi("PUT", `${SERVER_URL}/contact/admin/${contactId}`, reqBody);
};

export const addContactNoteApi = async (contactId, note) => {
  return await CommonApi("POST", `${SERVER_URL}/contact/admin/${contactId}/notes`, { note });
};

export const deleteContactApi = async (contactId) => {
  return await CommonApi("DELETE", `${SERVER_URL}/contact/admin/${contactId}`);
};

export const getAllJobApplicationsApi = async (queryParams = '') => {
  return await CommonApi("GET", `${SERVER_URL}/contact/admin/applications/all${queryParams}`);
};
