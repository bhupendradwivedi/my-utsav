import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Added Ticket icon for My Bookings
import { Menu, X, Sparkles, User, LogOut, ChevronRight, ChevronDown, Ticket } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Browse Events", link: "/events" },
    { label: "Create Event", link: "/createEvent" },
    { label: "About", link: "/about" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out border-b ${
        scrolled
          ? "bg-[#0a0118]/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        <Link to="/" className="relative group flex items-center gap-2">
          <div className="absolute -inset-2 bg-purple-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <img
            className="relative h-17 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            src={assets.logo}
            alt="Utsav Logo"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 pl-1 pr-4 py-1 rounded-full border transition-all duration-300 ${
                  isProfileOpen 
                    ? "bg-white/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="w-18 px-4 h-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-inner border border-white/20">
                    {currentUser.name ? currentUser.name : <User size={16}/>}
                </div>
                
                <div className="flex items-center gap-2">
                  <ChevronDown 
                    size={14} 
                    className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} 
                  />
                </div>
              </button>

              <div
                className={`absolute right-0 mt-4 w-64 bg-[#130624]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 origin-top-right ${
                  isProfileOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
                }`}
              >
                <div className="p-5 border-b border-white/10 bg-white/5">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Signed in as</p>
                  <p className="text-white font-bold text-lg truncate">{currentUser.name || "Guest User"}</p>
                  <p className="text-sm text-gray-400 truncate">{currentUser.email}</p>
                </div>

                <div className="p-2 flex flex-col gap-1">
                  {/* My Profile Button */}
                  <button 
                    onClick={() => { navigate("/myprofile"); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all text-left group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                       <User size={18} />
                    </div>
                    <span className="text-sm font-medium">My Profile</span>
                  </button>

                  {/* My Bookings Button - Added Feature */}
                  <button 
                    onClick={() => { navigate("/myevents"); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all text-left group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                       <Ticket size={18} />
                    </div>
                    <span className="text-sm font-medium">My Bookings</span>
                  </button>

                  <div className="h-px w-full bg-white/5 my-1"></div>

                  {/* Sign Out Button */}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left group"
                  >
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-colors">
                       <LogOut size={18} />
                    </div>
                    <span className="text-sm font-bold">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white text-sm font-bold overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <Sparkles size={14} className="animate-pulse" />
                </span>
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden relative z-50 p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#0a0118]/98 backdrop-blur-2xl z-40 transition-all duration-500 flex flex-col justify-center items-center space-y-8 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full px-8">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-medium transition-colors flex items-center gap-3 ${
                  isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
              <ChevronRight size={16} className="opacity-50" />
            </NavLink>
          ))}
          {/* Mobile "My Bookings" link if logged in */}
          {currentUser && (
             <NavLink
             to="/myevents"
             onClick={() => setIsOpen(false)}
             className="text-2xl font-medium text-gray-400 hover:text-white flex items-center gap-3"
           >
             My Bookings
             <ChevronRight size={16} className="opacity-50" />
           </NavLink>
          )}
        </div>

        <div className="w-full max-w-xs border-t border-white/10 pt-8 flex flex-col gap-4">
          {currentUser ? (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20"
            >
              <LogOut size={20} /> Logout ({currentUser.name?.split(" ")[0]})
            </button>
          ) : (
            <>
              <button
                onClick={() => { navigate("/login"); setIsOpen(false); }}
                className="w-full py-4 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => { navigate("/register"); setIsOpen(false); }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;