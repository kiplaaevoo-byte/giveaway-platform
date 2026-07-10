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

// Admin
import AdminDashboard from "./pages/AdminDashboard";

// Error Page
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">

        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>

            {/* ================= PUBLIC ================= */}

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/giveaways" element={<Giveaways />} />

            <Route
              path="/giveaways/:id"
              element={<GiveawayDetails />}
            />

            <Route path="/winners" element={<Winners />} />

            {/* ================= AUTH ================= */}

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

            {/* ================= USER ================= */}

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

            {/* ================= ADMIN ================= */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ================= 404 ================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </main>

        {/* Footer */}

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;