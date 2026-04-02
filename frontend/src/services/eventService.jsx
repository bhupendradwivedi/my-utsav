import api from "../config/axiosInstance";


export const getEvents = async () => {
  const res = await api.get("/event");
  return res.data;
};

export const getEventById = async (id) => {
  const res = await api.get(`/event/${id}`);
  return res.data;
};

export const createEvent = async (eventData) => {
  try {
    const { data } = await api.post("/event/create", eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, 
    });
    return data;
  } catch (error) {
    console.error("Error in createEvent service:", error);
    return { success: false, message: error?.response?.data?.message || "Server Error" };
  }
};

export const deleteEventById = async (id) => {
  const res = await api.delete(`/event/${id}`);
  return res.data;
};
