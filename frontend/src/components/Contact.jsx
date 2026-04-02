import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0118] text-white selection:bg-pink-500 selection:text-white font-sans overflow-x-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 rounded-[100%] blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="relative z-10 space-y-8">
            <h1 className="text-6xl sm:text-7xl font-black leading-[0.95] tracking-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Touch.
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Have a question, a proposal, or just want to say hello?
              Our team is ready to help you craft your next unforgettable event.
            </p>

            <div className="space-y-8 pt-8">
              <div className="relative pl-6 border-l-2 border-white/10 hover:border-purple-500 transition-colors duration-300">
                <div className="text-purple-400 mb-3">
                  <Mail size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Email Us</h4>
                <p className="text-lg text-gray-400 break-all">hello@utsav.com</p>
                <p className="text-sm text-gray-500">For general inquiries</p>
              </div>

              <div className="relative pl-6 border-l-2 border-white/10 hover:border-purple-500 transition-colors duration-300">
                <div className="text-purple-400 mb-3">
                  <Phone size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Call Us</h4>
                <p className="text-lg text-gray-400">+91 987 654 3210</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9am - 6pm IST</p>
              </div>

              <div className="relative pl-6 border-l-2 border-white/10 hover:border-purple-500 transition-colors duration-300">
                <div className="text-purple-400 mb-3">
                  <MapPin size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Our Office</h4>
                <p className="text-lg text-gray-400">123 Event Plaza, Cyber City, Bhopal, MP</p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-8 lg:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-purple-900/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                    placeholder="yourname"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                    placeholder="Booking Inquiry for a Wedding"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell us more about your event..."
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full relative group px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message <ArrowRight size={20} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
