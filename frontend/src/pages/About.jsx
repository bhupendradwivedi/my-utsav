import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiStar, FiUsers, FiGlobe, FiArrowRight, FiHeart } from "react-icons/fi";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

//aboutpage--

const About = () => {
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Verified Network",
      desc: "Every vendor and venue is rigorously vetted for quality, safety, and trust.",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: "Curated Experiences",
      desc: "We don't just list events; we craft premium themes and unique setups.",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-400/10"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Host-First Approach",
      desc: "Seamless tools for organizers to manage crowds and bookings effortlessly.",
      color: "text-violet-400",
      bg: "bg-violet-400/10"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Pan-India Presence",
      desc: "Expanding rapidly across major metro cities to bring the celebration to you.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f041a] text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-hidden">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 pt-24 pb-20 relative"
      >
        
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-fuchsia-300 text-xs font-bold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
            <FiHeart className="fill-fuchsia-500 text-fuchsia-500" /> The Heart of Celebration
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
            Plan Royally. <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white bg-clip-text text-transparent">
              Celebrate Beautifully.
            </span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Utsav is your luxury event discovery hub. We bridge the gap between premium venues, top-tier artists, and people looking for unforgettable nights.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative mb-24">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-20 blur-2xl -z-10 rounded-3xl transform scale-95" />
            
            <div className="bg-[#1a0b2e]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    To democratize luxury experiences. Whether it’s an underground gig, a massive festival, or an intimate workshop, we ensure it's accessible, transparent, and spectacularly managed.
                </p>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-fuchsia-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="border-t border-white/10 pt-16 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { value: "500+", label: "Verified Partners" },
                    { value: "50+", label: "Cities Covered" },
                    { value: "100k+", label: "Tickets Sold" },
                    { value: "4.9/5", label: "User Rating" },
                ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <span className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</span>
                        <span className="text-sm text-fuchsia-300/80 font-bold uppercase tracking-widest">{stat.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-[#0f041a] font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Get in Touch <FiArrowRight />
          </Link>
        </motion.div>

      </motion.div>
      <Footer />
    </div>
  );
};

export default About;
