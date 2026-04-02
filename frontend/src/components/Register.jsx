import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, User, Briefcase } from "lucide-react";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (formData) => {
    setLoading(true);

    try {
      const data = await registerUser(formData);

      if (data?.success) {
        toast.success("Account created successfully");

        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        toast.info(data?.message || "Request could not be processed");
      }

      reset();
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 bg-[#0a0118] text-white font-sans overflow-hidden">
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[150px] -z-10 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/25 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pink-600/15 rounded-full blur-[180px] -z-10 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl bg-[#130624]/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl shadow-purple-900/50">
        <h1 className="text-5xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
          Create Account
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Join us and start exploring amazing events!
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder=" "
                className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20 focus:border-pink-500"
                } text-white placeholder-gray-400 outline-none transition-all duration-300`}
              />
              <label
                htmlFor="name"
                className={`absolute left-0 -top-5 text-sm ${
                  errors.name ? "text-red-400" : "text-gray-400"
                } transition-all duration-300 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 
                  peer-focus:-top-5 peer-focus:text-sm ${
                    errors.name
                      ? "peer-focus:text-red-400"
                      : "peer-focus:text-pink-500"
                  }`}
              >
                Full Name
              </label>
              <User
                className={`absolute right-3 top-3.5 h-5 w-5 ${
                  errors.name ? "text-red-400" : "text-gray-500"
                } peer-focus:text-pink-500 transition-colors duration-300`}
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${
                  errors.role
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20 focus:border-pink-500"
                } text-white outline-none appearance-none transition-all duration-300`}
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                  hidden
                  className="bg-gray-900 text-gray-500"
                >
                  Select Role
                </option>
                <option value="user" className="bg-gray-900">
                  User
                </option>
                <option value="admin" className="bg-gray-900">
                  Admin
                </option>
                <option value="organizer" className="bg-gray-900">
                  Organizer
                </option>
              </select>
              <label
                htmlFor="role"
                className={`absolute left-0 -top-5 text-sm ${
                  errors.role ? "text-red-400" : "text-gray-400"
                } transition-all duration-300 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 
                  peer-focus:-top-5 peer-focus:text-sm ${
                    errors.role
                      ? "peer-focus:text-red-400"
                      : "peer-focus:text-pink-500"
                  }`}
              >
                Your Role
              </label>
              <Briefcase
                className={`absolute right-3 top-3.5 h-5 w-5 ${
                  errors.role ? "text-red-400" : "text-gray-500"
                } peer-focus:text-pink-500 transition-colors duration-300`}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <div className="h-0 w-0 border-x-4 border-x-transparent border-t-[6px] border-t-gray-400"></div>
              </div>
              {errors.role && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder=" "
              className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/20 focus:border-pink-500"
              } text-white placeholder-gray-400 outline-none transition-all duration-300`}
            />
            <label
              htmlFor="email"
              className={`absolute left-0 -top-5 text-sm ${
                errors.email ? "text-red-400" : "text-gray-400"
              } transition-all duration-300 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 
                peer-focus:-top-5 peer-focus:text-sm ${
                  errors.email
                    ? "peer-focus:text-red-400"
                    : "peer-focus:text-pink-500"
                }`}
            >
              Email Address
            </label>
            <Mail
              className={`absolute right-3 top-3.5 h-5 w-5 ${
                errors.email ? "text-red-400" : "text-gray-500"
              } peer-focus:text-pink-500 transition-colors duration-300`}
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder=" "
              className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/20 focus:border-pink-500"
              } text-white placeholder-gray-400 outline-none transition-all duration-300`}
            />
            <label
              htmlFor="password"
              className={`absolute left-0 -top-5 text-sm ${
                errors.password ? "text-red-400" : "text-gray-400"
              } transition-all duration-300 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 
                peer-focus:-top-5 peer-focus:text-sm ${
                  errors.password
                    ? "peer-focus:text-red-400"
                    : "peer-focus:text-pink-500"
                }`}
            >
              Password
            </label>
            <Lock
              className={`absolute right-3 top-3.5 h-5 w-5 ${
                errors.password ? "text-red-400" : "text-gray-500"
              } peer-focus:text-pink-500 transition-colors duration-300`}
            />
            {errors.password && (
              <p className="text-sm text-red-400 mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 
            shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] 
            hover:-translate-y-0.5 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                "Register Now"
              )}
            </span>
            {/* Shine Effect Overlay */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
          </button>

          {/* Redirect Text */}
          <p className="text-center text-gray-300 text-sm pt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-400 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
