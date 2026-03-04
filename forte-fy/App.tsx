
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DesktopApp from './DesktopApp';
import MobileApp from './mobile/MobileApp';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { useIsMobile } from './hooks/useIsMobile';

const App: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Landing Page */}
        <Route 
          path="/" 
          element={isMobile ? <MobileApp key="mobile" /> : <DesktopApp key="desktop" />} 
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        
        {/* Redirects */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
