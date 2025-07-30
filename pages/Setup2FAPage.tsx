

import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import QRCode from 'qrcode';
import { useAuth } from '../contexts/AuthContext';

export const Setup2FAPage: React.FC = () => {
    const { generate2FASecret, enable2FA } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();
    
    const [secret, setSecret] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const qrCodeRef = useRef<HTMLCanvasElement>(null);
    const hasGenerated = useRef(false);

    useEffect(() => {
        if (!hasGenerated.current) {
            const { secret: newSecret, uri } = generate2FASecret();
            setSecret(newSecret);
            if (qrCodeRef.current) {
                QRCode.toCanvas(qrCodeRef.current, uri, { width: 256, errorCorrectionLevel: 'H' }, (err) => {
                    if (err) console.error('QR Code generation failed:', err);
                });
            }
            hasGenerated.current = true;
        }
    }, [generate2FASecret]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!token || token.length !== 6 || !/^\d{6}$/.test(token)) {
            setError('Please enter a valid 6-digit code.');
            return;
        }
        const success = enable2FA(secret, token);
        if (success) {
            navigate('/admin');
        } else {
            setError('The verification code is incorrect. Please check your app and try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white text-center mb-2">Set Up Two-Factor Authentication</h1>
            <p className="text-gray-400 text-center mb-8">Scan the QR code with your authenticator app (e.g., Google Authenticator, Authy).</p>
            
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-6">
                <div className="flex flex-col items-center">
                   <canvas ref={qrCodeRef} className="rounded-lg bg-white p-2 border-4 border-gray-700"></canvas>
                   <p className="mt-4 text-gray-300 font-mono bg-gray-800 px-3 py-2 rounded-md text-center break-all">
                       {secret}
                   </p>
                   <p className="mt-2 text-sm text-gray-500">
                       If you can't scan, enter this key manually.
                   </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                     {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center" role="alert">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="token" className="block text-sm font-medium text-gray-300 mb-1 text-center">Enter verification code from app</label>
                        <input
                            id="token"
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            maxLength={6}
                            autoComplete="one-time-code"
                            className="w-full text-center text-3xl tracking-[0.3em] bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                        Verify & Enable 2FA
                    </button>
                </form>
            </div>
        </div>
    );
};