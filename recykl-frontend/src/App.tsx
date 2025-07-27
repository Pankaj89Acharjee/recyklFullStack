import type { ReactNode, FC } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginPage } from './components/LoginPage';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AllDevicesPage from './pages/AllDevicesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterPage } from './components/Register';

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <LoginPage />;
};

export default function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider>
        <AuthProvider>
          <div className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
              />

              <Route path="/allDevices" element={
                <ProtectedRoute>
                  <AllDevicesPage />
                </ProtectedRoute>
              }
              />
            </Routes>

          </div>
        </AuthProvider>
      </ThemeProvider>
    </>

  )
}