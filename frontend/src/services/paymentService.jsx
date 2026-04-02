
import api from "../config/axiosInstance";


export const createOrder = async (price,eventId) => {
 
  
  try {
    const { data } = await api.post("/payment/create",{price,eventId});
    return data; 
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};


export const verifyPayment = async (paymentData) => {
  try {
    const { data } = await api.post("/payment/verify", paymentData);
    return data; 
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};
