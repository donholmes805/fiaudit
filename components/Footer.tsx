import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { CreditCardIcon, CryptoIcon } from './Icons';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                
                <div className="mb-6">
                    <h3 className="text-gray-400 font-semibold tracking-wider uppercase mb-3">We Accept</h3>
                    <div className="flex justify-center items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-400">
                            <img src="https://fitotechnology.com/wp-content/uploads/2025/07/paypal-32.png" alt="PayPal" className="w-6 h-6 object-contain" />
                            <span>PayPal</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <CreditCardIcon className="w-6 h-6 text-green-400" />
                            <span>Bank Cards</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <CryptoIcon className="w-6 h-6 text-yellow-400" />
                            <span>Crypto</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 my-6"></div>

                <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap mb-4">
                    <a href="https://fitotechnology.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Fito Technology, LLC</a>
                    <a href="https://fitochain.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Fitochain</a>
                    <a href="https://x.com/fitochain" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">X</a>
                    <a href="https://t.me/fitochain" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Telegram</a>
                </div>
                <p className="mb-3">Fito Audit by Fito Technology, LLC 2025 &copy; Copyright. All Rights Reserved.</p>
                <p className="text-xs text-gray-600 max-w-3xl mx-auto">
                    Disclaimer: An audit by Fito AI is a technical assessment and not a financial endorsement or guarantee against fraud. Fito Technology, LLC is not liable for the actions of projects or individuals using our services. All payments are final and non-refundable.
                </p>
            </div>
        </footer>
    );
};