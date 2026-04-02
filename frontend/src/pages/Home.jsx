import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#1d0e33] via-[#3f0a67] to-[#1d0e33] text-white flex flex-col overflow-hidden">

        
        <div className="animate-fadeIn flex-grow">
          <Hero />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
