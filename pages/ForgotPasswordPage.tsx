

import React, { useState, FormEvent } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ShieldCheckIcon } from '../components/Icons';

export const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // UI-only implementation, as we can't send emails.
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <ShieldCheckIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                     <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
                     <p className="text-gray-400 mt-2">Enter your email to receive a recovery link.</p>
                </div>
                <div className="bg-gray-900 shadow-md rounded-xl border border-gray-800 px-8 pt-6 pb-8 mb-4">
                    {submitted ? (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-green-400">Recovery Email Sent</h2>
                            <p className="text-gray-300 mt-2">If an account exists for {email}, you will receive password reset instructions.</p>
                            <p className="text-xs text-gray-500 mt-4">(Note: This is a UI demonstration. No email has actually been sent.)</p>
                            <ReactRouterDOM.Link to="/login" className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                Back to Login
                            </ReactRouterDOM.Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500"
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                                    Send Recovery Link
                                </button>
                            </div>
                            <div className="text-center mt-6">
                                <ReactRouterDOM.Link to="/login" className="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-white">
                                    Remembered your password? Login
                                </ReactRouterDOM.Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};