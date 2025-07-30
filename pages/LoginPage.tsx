

import React, { useState, FormEvent } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheckIcon } from '../components/Icons';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                if (result.needs2FA) {
                    navigate('/verify-2fa');
                } else {
                    navigate('/admin');
                }
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            console.error("Login process failed", err);
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <ShieldCheckIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                     <h1 className="text-3xl font-bold text-white">Admin Login</h1>
                     <p className="text-gray-400 mt-2">Access the Fito Audit Dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-xl border border-gray-800 px-8 pt-6 pb-8 mb-4">
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md relative mb-6" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-indigo-800 disabled:cursor-not-allowed" type="submit" disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                     <div className="text-center mt-6">
                        <ReactRouterDOM.Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-300">
                            Forgot Password?
                        </ReactRouterDOM.Link>
                    </div>
                </form>
            </div>
        </div>
    );
};