import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, ShieldCheck, Crown } from "lucide-react";

const MyProfile = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      console.log("User not logged in");
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0a0118] flex items-center justify-center text-white">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
          <ShieldCheck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0118] text-white font-sans overflow-hidden flex items-center justify-center p-6 pt-32">

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[350px] md:h-[500px] bg-purple-600/20 rounded-[100%] blur-[120px] -z-10 mix-blend-screen"></div>
      <div className="fixed bottom-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-indigo-900/20 rounded-full blur-[100px] -z-10"></div>

      <div className="relative w-full max-w-3xl px-2 sm:px-4">

        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-20 animate-pulse"></div>

        <div className="relative bg-[#130624]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">

          <div className="relative h-40 sm:h-48 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>

          <div className="px-6 sm:px-10 pb-12 -mt-20 relative z-10">

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">

              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[3px] shadow-lg">
                <div className="w-full h-full rounded-full bg-[#0a0118] flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-200">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold mb-1">
                  {currentUser.name}
                </h1>
                <p className="text-purple-300 flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active Member
                </p>
              </div>

              <button className="px-6 py-2 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-lg font-semibold break-all">{currentUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                    {currentUser.role === "admin" ? <Crown size={24} /> : <ShieldCheck size={24} />}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Role</p>
                    <p className="text-lg font-semibold capitalize">{currentUser.role}</p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 mt-4 p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5 flex flex-col sm:flex-row justify-between text-center sm:text-left gap-6">
                <div>
                  <span className="text-gray-400 text-sm">Member Since</span>
                  <span className="block font-medium mt-1">November 2023</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Events Booked</span>
                  <span className="block font-medium mt-1">0</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="block text-green-400 font-medium mt-1">Online</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
