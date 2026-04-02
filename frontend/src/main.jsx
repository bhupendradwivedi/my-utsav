import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EventProvider } from "./context/EventContext.jsx";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <EventProvider>
      <RouterProvider router={AppRoutes} />
      <ToastContainer position="top-right" hideProgressBar={false} />
    </EventProvider>
  </AuthProvider>
);
