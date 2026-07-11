import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Giveaways from "./pages/Giveaways";
import GiveawayDetails from "./pages/GiveawayDetails";
import Winners from "./pages/Winners";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// User Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyEntries from "./pages/MyEntries";
import Notifications from "./pages/Notifications";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminGiveaways from "./pages/AdminGiveaways";
import AdminEntries from "./pages/AdminEntries";
import AdminUsers from "./pages/AdminUsers";
import AdminWinners from "./pages/AdminWinners";
import AdminReports from "./pages/AdminReports";
import AdminNotifications from "./pages/AdminNotifications";
import AdminSettings from "./pages/AdminSettings";

// Error
import NotFound from "./pages/NotFound";


function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen flex flex-col bg-slate-100">

        <Navbar />


        <main className="flex-1">

          <Routes>


            {/* PUBLIC ROUTES */}

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/giveaways" element={<Giveaways />} />

            <Route 
              path="/giveaways/:id" 
              element={<GiveawayDetails />} 
            />

            <Route 
              path="/winners" 
              element={<Winners />} 
            />



            {/* AUTH ROUTES */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route 
              path="/forgot-password" 
              element={<ForgotPassword />} 
            />

            <Route 
              path="/reset-password" 
              element={<ResetPassword />} 
            />



            {/* USER ROUTES */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />


            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />


            <Route
              path="/my-entries"
              element={
                <ProtectedRoute>
                  <MyEntries />
                </ProtectedRoute>
              }
            />


            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />



            {/* ADMIN ROUTES */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/giveaways"
              element={
                <ProtectedRoute adminOnly>
                  <AdminGiveaways />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/entries"
              element={
                <ProtectedRoute adminOnly>
                  <AdminEntries />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/users"
              element={
                <ProtectedRoute adminOnly>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/winners"
              element={
                <ProtectedRoute adminOnly>
                  <AdminWinners />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute adminOnly>
                  <AdminReports />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute adminOnly>
                  <AdminNotifications />
                </ProtectedRoute>
              }
            />


            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute adminOnly>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />



            {/* 404 */}

            <Route 
              path="*" 
              element={<NotFound />} 
            />


          </Routes>

        </main>


        <Footer />

      </div>

    </BrowserRouter>

  );

}


export default App;