import api from "../config/axiosInstance";

export const createBooking = async (eventId) => {
  console.log(eventId);
  
  const res = await api.post("/booking",{eventId});
  return res.data;
};

export const getUserBookings = async () => {
  const res = await api.get("/booking");
  return res.data;
};

export const getBookingById = async (id) => {
  const res = await api.get(`/booking/${id}`);
  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await api.delete(`/booking/${id}`);
  return res.data;
};
