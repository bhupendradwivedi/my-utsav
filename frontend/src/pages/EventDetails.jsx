import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { createOrder, verifyPayment } from "../services/paymentService";
import { createBooking } from "../services/bookingService";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiArrowLeft,
  FiTag,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import Footer from "../components/Footer";

const EventDetails = () => {
  const { id } = useParams();
  const { selectedEvent, loading, error, fetchEventById } = useEvents();
  const navigate = useNavigate();

  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (id) fetchEventById(id);
  }, [id]);

  const handlePayment = async (price, eventId) => {
    setProcessingPayment(true);
    try {
      const { success, order } = await createOrder(price, eventId);
      if (!success || !order) {
        alert("Payment initiation failed ❌");
        setProcessingPayment(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Utsav Booking",
        description: `Booking for ${selectedEvent?.title}`,
        order_id: order.id,
        theme: { color: "#d946ef" },
        handler: async function (response) {
          try {
            const res = await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (res.success) {
              await createBooking(eventId);
              navigate("/booking/success");
            } else alert("❌ Payment verification failed.");
          } catch (err) {
            alert("Something went wrong in verification");
          } finally {
            setProcessingPayment(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", () => {
        alert("Payment failed ❌");
        setProcessingPayment(false);
      });
    } catch (error) {
      alert("Something went wrong initiating payment.");
      setProcessingPayment(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading || !selectedEvent) {
    return (
      <div className="min-h-screen bg-[#0f041a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-fuchsia-200 animate-pulse font-medium">
            Loading Experience...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f041a] flex items-center justify-center">
        <div className="p-8 bg-white/5 border border-red-500/30 rounded-2xl backdrop-blur-xl text-center">
          <p className="text-red-400 text-xl font-bold mb-2">
            Unable to load event
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-[#0f041a] text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden -z-10 opacity-30">
          <img
            src={selectedEvent.image}
            className="w-full h-full object-cover blur-[100px] scale-110"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f041a]/50 via-[#0f041a]/80 to-[#0f041a]" />
        </div>

        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
          >
            <FiArrowLeft /> <span>Back</span>
          </button>
        </nav>

        <div className="container mx-auto px-6 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 h-fit sticky top-24"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {selectedEvent.category && (
                  <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2">
                    <FiTag className="text-fuchsia-400 text-xs" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {selectedEvent.category}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 bg-gradient-to-br from-white via-fuchsia-100 to-fuchsia-300 bg-clip-text text-transparent">
                {selectedEvent.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="text-3xl font-bold text-fuchsia-400">
                  ₹{selectedEvent.price}
                </div>
                <div className="text-sm text-gray-400 border-l border-gray-600 pl-4">
                  per person
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-violet-500/20 text-violet-300 rounded-xl">
                    <FiCalendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(selectedEvent.date).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-pink-500/20 text-pink-300 rounded-xl">
                    <FiClock size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-lg font-semibold">
                      {selectedEvent.time || "TBA"}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-lg font-semibold">
                      {selectedEvent.location || "Online / To Be Announced"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-white mb-3">
                  About Event
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="sticky bottom-4 z-20 lg:static">
                <button
                  onClick={() =>
                    handlePayment(selectedEvent.price, selectedEvent._id)
                  }
                  disabled={processingPayment}
                  className={`w-full md:w-auto md:px-12 py-4 rounded-2xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(217,70,239,0.4)] transition-all duration-300
                ${
                  processingPayment
                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                    : "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(217,70,239,0.6)]"
                }`}
                >
                  {processingPayment ? (
                    <>
                      <FiLoader className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Book Ticket Now <FiCheckCircle />
                    </>
                  )}
                </button>

                <p className="text-center md:text-left text-xs text-gray-500 mt-3 flex items-center justify-center md:justify-start gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                  Secure Payment by Razorpay
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetails;
