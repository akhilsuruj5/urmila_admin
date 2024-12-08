import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLogin from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Placeholder for admin dashboard
import ProtectedRoute from "./components/ProtectedRoute"; // Protect admin routes
import Signup from "./pages/Signup";
import AdminVerifyEmail from "./pages/AdminVerifyEmail";
import SignupSuccess from "./pages/SignupSuccess";
import HomePage from "./pages/HomePage";
import UserManagement from "./pages/UserManagement";
import RegistrationsPage from "./pages/RegistrationsPage";
import OfferingsPage from "./pages/OfferingsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import { AuthProvider } from "./context/AuthContext";
import TeamPage from "./pages/TeamPage";

const App = () => {
  return (
    
    <Router>
      <AuthProvider>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/signup-verify" element={<ProtectedRoute><SignupSuccess /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/registrations" element={<ProtectedRoute><RegistrationsPage /></ProtectedRoute>} />
        <Route path="/offerings" element={<ProtectedRoute><OfferingsPage /></ProtectedRoute>} />
        <Route path="/testimonials" element={<ProtectedRoute><TestimonialsPage /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/verify-account/:token"
          element={
            <ProtectedRoute>
              <AdminVerifyEmail />
            </ProtectedRoute>
          }
          />
      </Routes>
          </AuthProvider>
    </Router>
  );
};

export default App;
