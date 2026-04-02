import api from "../config/axiosInstance";

export const activeUser = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error) {
    console.log("An error occured in activeUser", error);
  }
};

export const registerUser = async (formdata) => {
    const {data} = await api.post("/auth/register", formdata);
    return data;
};

export const loginUser = async (formdata) => {
  try {
    const {data} = await api.post("/auth/login", formdata);
    return data;
  } catch (error) {
    console.log("An error occured in loginUser", error);
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.log("An error occured in logoutUser", error);
  }
};
