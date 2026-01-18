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
export const tokenValidation = async () => {
  return await CommonApi("GET", `${SERVER_URL}/auth/validate-token`);
};

// user api

export const updateProfile = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/user/update-profile`, reqBody);
};
export const getUserProfile = async () => {
  return await CommonApi("GET", `${SERVER_URL}/user/get-profile`);
};

// post api

export const userPost = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/posts/user-post`, reqBody);
};
export const getPost = async (searchKey) => {
  return await CommonApi("GET", `${SERVER_URL}/posts/get-post?search=${searchKey}`);
};

export const likePostApi = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/posts/like-unlike`, reqBody);
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
  return await CommonApi("GET",`${SERVER_URL}/doctor/get-profile`);
};

export const checkDoctorStatus= async()=>{
  return await CommonApi("GET",`${SERVER_URL}/doctor/doctor-status`)
}
export const getDoctorPosts= async()=>{
  return await CommonApi("GET",`${SERVER_URL}/doctor/get-doctor-posts`)
}
export const doctorPostResponse= async()=>{
  return await CommonApi("POST",`${SERVER_URL}/doctor/get-doctor-posts`)
}

// Admin ApiCalls

export const getAllDoctorsProfile=async()=>{
  return await CommonApi ("GET",`${SERVER_URL}/admin/get-all-doctor-profile`)
}