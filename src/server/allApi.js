import SERVER_URL from "./ServerURL";
import { CommonApi } from "./CommonApi";

export const userRegister = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/register`, reqBody);
};
export const userLogin = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/login`, reqBody);
};
export const userGoogleLogin = async (reqBody) => {
  return await CommonApi("POST", `${SERVER_URL}/auth/googleLogin`, reqBody);
};
export const tokenValidation =async()=>{
  return await CommonApi("GET", `${SERVER_URL}/auth/validate-token`);

}
export const userPost =async(reqBody)=>{
  return await CommonApi("POST", `${SERVER_URL}/user/user-post`,reqBody);

}