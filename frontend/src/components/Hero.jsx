import React from "react";
import {
  Cake,
  Church,
  Building2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Clock,
  Users,
  ArrowRight,
  Star,
  Play,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0a0118] text-white selection:bg-pink-500 selection:text-white font-sans overflow-hidden">

      {/* Background Lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 rounded-[100%] blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="relative z-10 space-y-8">

            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-purple-200 tracking-wide">
                Celebrating 10,000+ Stories
              </span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
              Make Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Moment
              </span>{" "}
              <span className="relative inline-block">
                Count.
                <svg
                  className="absolute w-full h-4 -bottom-2 left-0 text-yellow-400"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Your one-stop marketplace for premium venues, elite decorators,
              and unforgettable experiences across India.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <button
                onClick={() => navigate("/events")}
                className="relative group px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book an Event <ArrowRight size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium group">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play size={16} fill="currentColor" />
                </span>
                How it works
              </button>
            </div>

            
            <div className="flex items-center gap-4 text-sm text-gray-500 pt-6">
              <div className="flex -space-x-3">
                {[assets.p1, assets.p2, assets.p3, assets.p4].map((img, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0a0118] overflow-hidden"
                  >
                    <img
                      src={img}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>Trusted by 500+ Organizers</p>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl shadow-purple-900/50">
                <img
                  src={assets.d}
                  alt="Utsav Celebration"
                  className="w-full h-[600px] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-yellow-300 uppercase tracking-widest font-bold mb-1">
                        Trending Now
                      </p>
                      <p className="text-xl font-bold text-white">
                        Royal Jaipur Weddings
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Heart className="text-pink-500 fill-pink-500" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Star className="absolute -top-10 -right-10 text-yellow-400 w-16 h-16 animate-spin-slow opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-2">Curated for You</h2>
              <p className="text-gray-400">Explore venues by category</p>
            </div>
            <button
              onClick={() => navigate("/events")}
              className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 transition-colors"
            >
              View all categories <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Cake />,
                label: "Birthdays",
                sub: "150+ Venues",
                color: "bg-pink-500",
                span: "lg:col-span-1",
              },
              {
                icon: <Church />,
                label: "Weddings",
                sub: "Premium Halls",
                color: "bg-purple-600",
                span: "lg:col-span-2",
              },
              {
                icon: <Building2 />,
                label: "Corporate",
                sub: "Meeting Spaces",
                color: "bg-blue-600",
                span: "lg:col-span-1",
              },
              {
                icon: <GraduationCap />,
                label: "Parties",
                sub: "Nightlife & Fun",
                color: "bg-orange-500",
                span: "lg:col-span-4 md:col-span-2",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.span} group relative h-64 rounded-3xl overflow-hidden bg-[#130624] border border-white/5 cursor-pointer`}
              >
                <div
                  className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                    {item.label}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                    {item.sub}
                  </p>
                </div>

                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45">
                  <ArrowRight className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 border-y border-white/5 bg-[#05000a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <ShieldCheck />,
                title: "Verified Listings",
                desc: "Every venue is physically verified by our team.",
              },
              {
                icon: <Sparkles />,
                title: "Smart Decor",
                desc: "AI-suggested decor themes for your specific venue.",
              },
              {
                icon: <Clock />,
                title: "Instant Booking",
                desc: "Real-time availability. No more waiting for callbacks.",
              },
              {
                icon: <Users />,
                title: "Expert Support",
                desc: "24/7 concierge to help you plan the perfect event.",
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="relative pl-4 border-l-2 border-white/10 hover:border-purple-500 transition-colors duration-300"
              >
                <div className="text-purple-400 mb-3">
                  {React.cloneElement(feat.icon, { size: 32 })}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {feat.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 text-center">
        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10">
          <span className="block px-8 py-2 rounded-full bg-[#0a0118] text-gray-300 text-sm">
            Our Impact in Numbers
          </span>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {[
            { num: "10M+", label: "Happiness Delivered" },
            { num: "500+", label: "Premium Venues" },
            { num: "50+", label: "Cities Active" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
                {stat.num}
              </div>
              <div className="text-purple-400 font-medium uppercase tracking-widest text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
