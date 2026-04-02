import React from "react";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Send, 
  Heart,
  MapPin,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#05000a] text-gray-300 pt-20 pb-10 overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      
      {/* --- DECORATIVE ELEMENTS --- */}
      {/* Giant Watermark Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15vw] font-black leading-none text-white/[0.02] select-none pointer-events-none tracking-widest">
        UTSAV
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- TOP SECTION: CTA & NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16 border-b border-white/10 pb-12">
            <div className="max-w-md">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to celebrate?</h2>
                <p className="text-gray-400 mb-6">Join 50,000+ organizers creating unforgettable moments. Subscribe for venue drops and pro tips.</p>
                
                {/* Glass Input Field */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 pr-2 focus-within:border-purple-500/50 transition-colors">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="bg-transparent border-none outline-none text-white px-4 py-2 w-full placeholder:text-gray-600"
                    />
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:shadow-[0_0_15px_rgba(192,38,211,0.5)] transition-shadow">
                        <Send size={18} className="-ml-0.5 mt-0.5" />
                    </button>
                </div>
            </div>

            {/* Quick Contact Info */}
            <div className="flex flex-col gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Mail size={16} />
                    </div>
                    <div>
                        <p className="text-white font-medium">hello@utsav.com</p>
                        <p className="text-xs">Support Team</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <MapPin size={16} />
                    </div>
                    <div>
                        <p className="text-white font-medium">Indore, India</p>
                        <p className="text-xs">HQ Office</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- MIDDLE SECTION: LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
                <Link to="/" className="inline-block mb-6">
                    <h1 className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-black text-4xl tracking-tight">
                    Utsav<span className="text-purple-500">.</span>
                    </h1>
                </Link>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    Transforming the way India celebrates. Connect with premium venues, artists, and decorators in seconds.
                </p>
            </div>

            {/* Links Column 1 */}
            <div>
                <h3 className="text-white font-bold mb-6">Platform</h3>
                <ul className="space-y-4 text-sm">
                    {['Features', 'Sell Tickets', 'Event Registration', 'Explore Venues', 'Pricing'].map((item) => (
                        <li key={item}>
                            <Link to="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Links Column 2 */}
            <div>
                <h3 className="text-white font-bold mb-6">Company</h3>
                <ul className="space-y-4 text-sm">
                    {['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link to="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Links Column 3 */}
            <div>
                <h3 className="text-white font-bold mb-6">Legal</h3>
                <ul className="space-y-4 text-sm">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map((item) => (
                        <li key={item}>
                            <Link to="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
            
            <div className="text-sm text-gray-500 flex items-center gap-1">
                © {new Date().getFullYear()} Utsav Inc. Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by Bhupendra.
            </div>

            {/* Social Icons with Glow */}
            <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                    <a
                        key={index}
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                    >
                        <Icon size={18} />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;