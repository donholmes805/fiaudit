

import React, { useState, FormEvent, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheckIcon } from '../components/Icons';

export const Verify2FAPage: React.FC = () => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const { verify2FAToken, logout } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();
    
    // Redirect if user lands here without passing password check
    useEffect(() => {
        const authAttempt = window.sessionStorage.getItem('fito_audit_auth_attempt');
        if (authAttempt !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        const success = verify2FAToken(token);
        if (success) {
            navigate('/admin');
        } else {
            setError('Invalid verification code. Please try again.');
        }
    };
    
    const handleCancel = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <ShieldCheckIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                     <h1 className="text-3xl font-bold text-white">Two-Factor Verification</h1>
                     <p className="text-gray-400 mt-2">Enter the code from your authenticator app.</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-xl border border-gray-800 px-8 pt-6 pb-8 mb-4">
                     {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md relative mb-6" role="alert">
                            <span>{error}</span>
                        </div>
                    )}
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="token">
                            6-Digit Verification Code
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-800 border-gray-700 text-white text-center text-3xl tracking-[0.3em] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500"
                            id="token"
                            type="text"
                            placeholder="123456"
                            autoComplete="one-time-code"
                            value={token}
                            onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                            Verify
                        </button>
                        <button onClick={handleCancel} type="button" className="text-gray-400 hover:text-white text-sm font-medium">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};