import axios from "axios";
// ---axiosinstance
const api = axios.create({

   baseURL:" https://my-utsav.onrender.com/api",
  withCredentials:true
});

export default api;
