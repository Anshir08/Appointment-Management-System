import { useEffect, useState } from "react";
import Login from "./pages/Login";
import RegisterPatient from "./pages/RegisterPatient";
import AdminDashboard from "./pages/Admin/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Home from "./pages/Home";
import ViewAppointments from "./pages/ViewAppointments";
import BookAppointment from "./pages/BookAppointment";
import CreateDoctor from "./pages/Admin/CreateDoctor";
import CreateAppointmentForPatient from "./pages/Admin/CreateAppointment";
import UpdateUser from "./pages/Admin/UpdateUser";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getMyProfile } from "./redux/services/auth";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyProfile());
    }, [dispatch]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPatient />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={<Home />} />
                <Route
                    path="/appointments/book/doctor/:id"
                    element={<BookAppointment />}
                />

                {/* Protected User Routes */}
                <Route element={<ProtectedRoute isAdmin={false} />}>
                    <Route
                        path="/appointments/view"
                        element={<ViewAppointments />}
                    />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute isAdmin={true} />}>
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route
                        path="/admin/create-doctor"
                        element={<CreateDoctor />}
                    />
                    <Route
                        path="/admin/create-appointment"
                        element={<CreateAppointmentForPatient />}
                    />
                    <Route
                        path="/admin/update-user/:id"
                        element={<UpdateUser />}
                    />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
