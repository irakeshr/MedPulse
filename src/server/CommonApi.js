import axios from "axios";
 

export const CommonApi = async (httpMethod, url, reqBody) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: token ? `Bearer ${token}` : "one",
  };

  const configReq = {
    method: httpMethod,
    url,
    data: reqBody,
    headers,
  };
  console.log(configReq)
  return await axios(configReq)
    .then((res) => {
      return res;
    })
    .catch((err) => {
       throw err
    });
};
