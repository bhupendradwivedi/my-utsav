import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion"; // Added for consistency
import Footer from "../components/Footer";

const BookingSuccess = () => {
  const [sp] = useSearchParams();
  const id = sp.get("id");

  // Animation variants to match About 
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0f041a] pt-25 text-white font-sans selection:bg-fuchsia-500 selection:text-white flex flex-col justify-between overflow-hidden relative">
      
      {/* Background Ambient Glows (Matches About Page) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-lg"
        >
          {/* Glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 blur-2xl -z-10 rounded-3xl transform scale-105" />
          
          {/* Glassmorphism Card */}
          <div className="bg-[#1a0b2e]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl">
            
            {/* Success Icon with Glow */}
            <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Booking <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Confirmed!</span>
            </h1>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Thank you! Your royal experience has been secured. Get ready to celebrate beautifully.
            </p>

            {/* Booking ID Badge */}
            {id && (
              <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-lg mb-8">
                <span className="text-sm text-gray-400 uppercase tracking-widest mr-2">Booking ID:</span>
                <span className="text-fuchsia-300 font-mono font-bold">{id}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/events" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] transition-all duration-300 hover:scale-105"
              >
                Browse More
              </Link>
              
              <Link 
                to="/myevents" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
              >
                My Bookings
              </Link>
            </div>

          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSuccess;