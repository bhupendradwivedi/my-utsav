import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiType,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiImage,
  FiAlignLeft,
  FiUploadCloud,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";
import Footer from "../components/Footer";

const CreateEvent = () => {
  const { currentUser } = useAuth();
  const { addEvent, fetchEvents, loading } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    price: "",
    totalSeats: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.error("Enter event title");
    if (!formData.description.trim()) return toast.error("Enter description");
    if (!formData.venue.trim()) return toast.error("Enter venue");
    if (!formData.date) return toast.error("Select date & time");
    if (!formData.totalSeats) return toast.error("Enter seat count");
    if (!formData.price) return toast.error("Enter ticket price");
    if (!formData.image) return toast.error("Upload an event image");

    const payload = new FormData();
    Object.keys(formData).forEach((key) => payload.append(key, formData[key]));

    const data = await addEvent(payload);

    if (data?.success) {
      toast.success("Event created successfully!");
      await fetchEvents();
      navigate("/events");
    } else {
      toast.error(data?.message || "Something went wrong!");
    }
  };

  const ErrorScreen = ({ title, subtitle }) => (
    <div className="min-h-screen bg-[#0f041a] flex items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10" />
      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 mb-6">{subtitle}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );

  if (!currentUser)
    return (
      <ErrorScreen
        title="Login Required"
        subtitle="Please login to create an event."
      />
    );

  if (currentUser.role !== "organizer")
    return (
      <ErrorScreen
        title="Access Denied 🚫"
        subtitle="Only organizers can create events."
      />
    );

  return (
    <>
      <div className="min-h-screen bg-[#0f041a] pt-28 text-white font-sans selection:bg-fuchsia-500 selection:text-white flex justify-center items-center py-20 px-4 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">
              <span className="bg-gradient-to-r from-white via-fuchsia-200 to-violet-200 bg-clip-text text-transparent">
                Curate an Experience
              </span>
            </h1>
            <p className="text-gray-400">
              Fill in the details to launch your next big event.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.3)] p-8 md:p-12">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <div className="space-y-6">
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                    Event Title
                  </label>
                  <div className="relative">
                    <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                    <input
                      name="title"
                      placeholder="e.g. Neon Nights Music Festival"
                      onChange={handleChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-fuchsia-500/50 focus:bg-black/40 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                      Date & Time
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                      <input
                        type="datetime-local"
                        name="date"
                        onChange={handleChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-fuchsia-500/50 focus:bg-black/40 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                      Venue
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                      <input
                        name="venue"
                        placeholder="City or Address"
                        onChange={handleChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-fuchsia-500/50 focus:bg-black/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                      Price (₹)
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                      <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        onChange={handleChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-fuchsia-500/50 focus:bg-black/40 transition-all"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                      Total Seats
                    </label>
                    <div className="relative">
                      <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                      <input
                        type="number"
                        name="totalSeats"
                        placeholder="e.g. 150"
                        onChange={handleChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-fuchsia-500/50 focus:bg-black/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                    Description
                  </label>
                  <div className="relative">
                    <FiAlignLeft className="absolute left-4 top-6 text-gray-500 group-focus-within:text-fuchsia-400 transition-colors" />
                    <textarea
                      name="description"
                      rows={5}
                      placeholder="Tell people what makes this event special..."
                      onChange={handleChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-fuchsia-500/50 focus:bg-black/40 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-full">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-2">
                  <FiImage /> Cover Image
                </label>

                <div
                  onDrop={handleImageDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  className={`flex-grow min-h-[300px] relative rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group
                  ${
                    dragActive
                      ? "border-fuchsia-500 bg-fuchsia-500/10"
                      : "border-white/10 bg-black/20 hover:border-white/30 hover:bg-black/30"
                  }
                `}
                >
                  <input
                    type="file"
                    onChange={handleImageInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />

                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <p className="text-white font-bold">Click to Change</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6 pointer-events-none">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-fuchsia-400 group-hover:scale-110 transition-transform">
                        <FiUploadCloud size={32} />
                      </div>
                      <p className="text-gray-300 font-medium">
                        Drag & Drop Image
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        or click to browse
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-8 w-full py-5 rounded-xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-lg transition-all duration-300
                  ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] hover:-translate-y-1"
                  }
                `}
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" /> Creating Event...
                    </>
                  ) : (
                    <>
                      Publish Event <FiCheckCircle />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
