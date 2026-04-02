import React, { useEffect, useState } from "react";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiArrowRight, FiFilter } from "react-icons/fi";
import Footer from "../components/Footer";

const AllEvents = () => {
  const { events, loading, error, fetchEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredEvents(filtered);
  }, [events, searchTerm, sortOrder]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative min-h-screen bg-[#0f041a] text-white overflow-hidden font-sans selection:bg-pink-500 selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-16 relative">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
          >
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(192,132,252,0.5)]">
              Discover Utsav
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Immerse yourself in the celebration. Find, book, and experience the most electrifying events happening around you.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-20 bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search events, vibes, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-white pl-12 pr-4 py-4 outline-none placeholder-gray-500 font-medium"
            />
          </div>

          <div className="hidden md:block w-[1px] bg-white/10 my-2"></div>

          <div className="relative min-w-[200px]">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-transparent text-white pl-10 pr-8 py-4 outline-none appearance-none cursor-pointer font-semibold hover:bg-white/5 transition-colors rounded-xl"
            >
              <option value="asc" className="bg-[#1a0b2e] text-gray-200">Date: Sooner</option>
              <option value="desc" className="bg-[#1a0b2e] text-gray-200">Date: Later</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-sm">▼</div>
          </div>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
            <p className="text-red-400 text-xl font-bold">Oops! Something went wrong.</p>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-20 opacity-60">
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {filteredEvents.map((event) => {
            const eventDate = new Date(event.date);
            const dateStr = eventDate.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
            const yearStr = eventDate.getFullYear();

            return (
              <motion.div
                key={event._id}
                variants={cardVariants}
                className="group relative bg-[#1a0b2e]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-fuchsia-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(219,39,119,0.2)] flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] to-transparent opacity-60 z-10" />
                  
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl text-center shadow-xl">
                    <span className="block text-xs font-bold text-fuchsia-300 uppercase tracking-wider">{yearStr}</span>
                    <span className="block text-xl font-black text-white">{dateStr}</span>
                  </div>

                  <img
                    src={event.image || "https://via.placeholder.com/400x300"}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-fuchsia-300 transition-colors leading-tight line-clamp-1">
                    {event.title}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-violet-300 mb-4 text-sm font-medium">
                    <FiCalendar />
                    <span>{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <p className="text-gray-400 line-clamp-2 mb-8 leading-relaxed text-sm flex-grow">
                    {event.description}
                  </p>

                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300 shadow-lg hover:shadow-fuchsia-600/40 active:scale-95"
                  >
                    View Details <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AllEvents;
