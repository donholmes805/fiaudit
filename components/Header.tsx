

import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ShieldCheckIcon, MenuIcon, XIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`;
    
    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block px-3 py-2 rounded-md text-base font-medium ${
            isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`;
    
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    
    const handleLogout = () => {
        logout();
        closeMobileMenu();
        navigate('/');
    };

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <ReactRouterDOM.NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-white" onClick={closeMobileMenu}>
                            <ShieldCheckIcon className="h-8 w-8 text-indigo-400" />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-tight">Fito Audit</span>
                                <span className="text-xs text-gray-400 leading-tight">by Fito Technology, LLC</span>
                            </div>
                        </ReactRouterDOM.NavLink>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <ReactRouterDOM.NavLink to="/" className={navLinkClass}>Home</ReactRouterDOM.NavLink>
                                <ReactRouterDOM.NavLink to="/search" className={navLinkClass}>Search Reports</ReactRouterDOM.NavLink>
                                <ReactRouterDOM.NavLink to="/contact" className={navLinkClass}>Contact</ReactRouterDOM.NavLink>
                                {isAuthenticated ? (
                                    <>
                                        <ReactRouterDOM.NavLink to="/admin" className={navLinkClass}>Admin</ReactRouterDOM.NavLink>
                                        <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <ReactRouterDOM.NavLink to="/login" className={navLinkClass}>Admin Login</ReactRouterDOM.NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <XIcon className="block h-6 w-6" />
                            ) : (
                                <MenuIcon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu, show/hide based on menu state. */}
            {isMobileMenuOpen && (
                 <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <ReactRouterDOM.NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu}>Home</ReactRouterDOM.NavLink>
                        <ReactRouterDOM.NavLink to="/search" className={mobileNavLinkClass} onClick={closeMobileMenu}>Search Reports</ReactRouterDOM.NavLink>
                        <ReactRouterDOM.NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact</ReactRouterDOM.NavLink>
                        {isAuthenticated ? (
                            <>
                                <ReactRouterDOM.NavLink to="/admin" className={mobileNavLinkClass} onClick={closeMobileMenu}>Admin</ReactRouterDOM.NavLink>
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                                    Logout
                                </button>
                            </>
                        ) : (
                             <ReactRouterDOM.NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Admin Login</ReactRouterDOM.NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};