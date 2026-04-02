import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings, cancelBooking } from "../services/bookingService";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock, FiXCircle, FiExternalLink, FiPackage, FiActivity } from "react-icons/fi";
import Footer from "../components/Footer";

const MyEvents = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUserBookings();
      setBookings(res?.bookings || []);
    } catch (e) {
      console.error("Failed to load bookings", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nowTs = Date.now();

  const upcoming = useMemo(
    () => bookings.filter((b) => new Date(b?.event?.date).getTime() >= nowTs && b.status !== 'canceled'),
    [bookings, nowTs]
  );

  const pastOrCanceled = useMemo(
    () => bookings.filter((b) => new Date(b?.event?.date).getTime() < nowTs || b.status === 'canceled'),
    [bookings, nowTs]
  );

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) return;
    try {
      setCancelingId(id);
      await cancelBooking(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || "Cancel failed");
    } finally {
      setCancelingId(null);
    }
  };

  const displayedBookings = activeTab === "upcoming" ? upcoming : pastOrCanceled;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#0f041a] text-white font-sans selection:bg-fuchsia-500 selection:text-white flex flex-col">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white bg-clip-text text-transparent">
                My Tickets
              </span>
            </h1>
            <p className="text-gray-400">Manage your upcoming experiences and booking history.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-1 rounded-xl flex gap-1">
            {["upcoming", "past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab === "past" ? "History" : "Upcoming"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-fuchsia-300">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-current mb-4"></div>
            <p className="animate-pulse">Syncing your calendar...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {displayedBookings.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-500">
                    <FiPackage size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No {activeTab} bookings</h3>
                <p className="text-gray-400 mb-6">Ready to find your next adventure?</p>
                <button 
                    onClick={() => navigate('/events')}
                    className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                    Explore Events
                </button>
              </motion.div>
            ) : (
              displayedBookings.map((booking) => (
                <BookingCard 
                    key={booking._id} 
                    booking={booking} 
                    handleCancel={handleCancel} 
                    cancelingId={cancelingId}
                    navigate={navigate}
                />
              ))
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const BookingCard = ({ booking, handleCancel, cancelingId, navigate }) => {
  const event = booking.event;
  const isCanceled = booking.status === "canceled";
  const dateObj = new Date(event.date);

  let statusColor = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  let statusText = "Confirmed";

  if (isCanceled) {
    statusColor = "bg-red-500/20 text-red-300 border-red-500/30";
    statusText = "Cancelled";
  } else if (dateObj < Date.now()) {
    statusColor = "bg-gray-500/20 text-gray-300 border-gray-500/30";
    statusText = "Completed";
  }

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      className="group relative overflow-hidden rounded-3xl bg-[#1a0b2e]/80 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/30 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
    >
        <div className="flex flex-col sm:flex-row h-full">
            <div className="sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                <img 
                    src={event.image || "https://via.placeholder.com/300"} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent sm:bg-gradient-to-t" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-sm font-bold">
                    ₹{event.price}
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between relative">
                <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#0f041a] rounded-full hidden sm:block" />

                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider w-fit mb-2 ${statusColor}`}>
                            {statusText}
                        </div>
                        <span className="text-xs text-gray-500 font-mono">ID: {booking._id.slice(-6)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-fuchsia-300 transition-colors">
                        {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <FiCalendar className="text-violet-400" />
                            <span>{dateObj.toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock className="text-pink-400" />
                            <span>{event.time || "Time TBA"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiMapPin className="text-emerald-400" />
                            <span className="line-clamp-1">{event.location || "Venue TBA"}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => navigate(`/booking/success?id=${booking._id}`)}
                        className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <FiExternalLink /> Details
                    </button>
                    
                    {!isCanceled && dateObj > Date.now() && (
                        <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelingId === booking._id}
                            className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-all flex items-center justify-center"
                        >
                            {cancelingId === booking._id ? <FiActivity className="animate-spin" /> : <FiXCircle size={18} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default MyEvents;
