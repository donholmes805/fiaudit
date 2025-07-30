


import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuditProvider } from './contexts/AuditContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SubmitPage } from './pages/SubmitPage';
import { ReportPage } from './pages/ReportPage';
import { AdminPage } from './pages/AdminPage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { Setup2FAPage } from './pages/Setup2FAPage';
import { Verify2FAPage } from './pages/Verify2FAPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
    return (
        <AuditProvider>
            <div className="min-h-screen flex flex-col bg-gray-900">
                <Header />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <ReactRouterDOM.Routes>
                        <ReactRouterDOM.Route path="/" element={<HomePage />} />
                        <ReactRouterDOM.Route path="/search" element={<SearchPage />} />
                        <ReactRouterDOM.Route path="/report/:id" element={<ReportPage />} />
                        <ReactRouterDOM.Route path="/contact" element={<ContactPage />} />
                        <ReactRouterDOM.Route path="/login" element={<LoginPage />} />
                        <ReactRouterDOM.Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <ReactRouterDOM.Route path="/verify-2fa" element={<Verify2FAPage />} />
                        
                        <ReactRouterDOM.Route 
                            path="/submit" 
                            element={
                                <ProtectedRoute>
                                    <SubmitPage />
                                </ProtectedRoute>
                            } 
                        />
                        <ReactRouterDOM.Route 
                            path="/admin" 
                            element={
                                <ProtectedRoute>
                                    <AdminPage />
                                </ProtectedRoute>
                            } 
                        />
                        <ReactRouterDOM.Route 
                            path="/setup-2fa" 
                            element={
                                <ProtectedRoute>
                                    <Setup2FAPage />
                                </ProtectedRoute>
                            } 
                        />
                        
                        <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" replace />} />
                    </ReactRouterDOM.Routes>
                </main>
                <Footer />
            </div>
        </AuditProvider>
    )
}

const App: React.FC = () => {
  return (
    <ReactRouterDOM.HashRouter>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;