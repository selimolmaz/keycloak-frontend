import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import ProjectManagement from './pages/admin/ProjectManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import ContactMessages from './pages/admin/ContactMessages';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import ProjectsPage from './pages/public/ProjectsPage';
import GalleryPage from './pages/public/GalleryPage';
import ContactPage from './pages/public/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/public" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/public" replace />} />

        {/* Admin Routes with Navbar */}
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </>
        } />
        
        <Route path="/profile" element={
          <>
            <Navbar />
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </>
        } />
        
        <Route path="/admin" element={
          <>
            <Navbar />
            <ProtectedRoute requiredRole="ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          </>
        } />
        
        <Route path="/admin/projects" element={
          <>
            <Navbar />
            <ProtectedRoute requiredRole="ADMIN">
              <ProjectManagement />
            </ProtectedRoute>
          </>
        } />
        
        <Route path="/admin/gallery" element={
          <>
            <Navbar />
            <ProtectedRoute requiredRole="ADMIN">
              <GalleryManagement />
            </ProtectedRoute>
          </>
        } />
        
        <Route path="/admin/messages" element={
          <>
            <Navbar />
            <ProtectedRoute requiredRole="ADMIN">
              <ContactMessages />
            </ProtectedRoute>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;