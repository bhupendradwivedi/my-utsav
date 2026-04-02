import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // instant jump, no animation
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;