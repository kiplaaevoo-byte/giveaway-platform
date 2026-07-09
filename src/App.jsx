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
import Winners from "./pages/Winners";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Admin
import AdminDashboard from "./pages/AdminDashboard";

// Error Page
import NotFound from "./pages/NotFound";

// Temporary Forgot Password Page
function ForgotPassword() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">
          Forgot Password
        </h1>

        <p className="text-gray-600">
          Password reset functionality will be added in the next update.
        </p>
      </div>
    </div>
  );
}

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

            <Route path="/winners" element={<Winners />} />

            {/* ================= AUTH ================= */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
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

            <Route path="*" element={<NotFound />} />

          </Routes>

        </main>

        {/* Footer */}

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;