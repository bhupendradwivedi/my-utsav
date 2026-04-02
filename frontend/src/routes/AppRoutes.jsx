import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import RootLayout from "../layout/RootLayout";
import About from "../pages/About";
import MyProfile from "../pages/MyProfile";
import AllEvents from "../pages/AllEvents";
import BookingSuccess from "../pages/BookingSuccess";
import EventDetails from "../pages/EventDetails";
import MyEvents from "../pages/MyEvents";
import CreateEvent from "../pages/createEvent";
import ProtectedRoute from "../components/ProtectedRoute";
import Contact from "../components/Contact";

export const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC ROUTES OUTSIDE ROOTLAYOUT */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ROOTLAYOUT FOR REST OF THE APP */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="events" element={<AllEvents />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="myevents" element={<MyEvents />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="booking/success" element={<BookingSuccess />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Route>
    </>
  )
);
