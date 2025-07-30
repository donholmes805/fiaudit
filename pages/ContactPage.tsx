
import React from 'react';
import { MailIcon, TelegramIcon, ChevronRightIcon } from '../components/Icons';

export const ContactPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-gray-800 rounded-full border-2 border-gray-700">
                    <MailIcon className="h-8 w-8 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mt-4">Contact Us</h1>
                <p className="mt-2 text-gray-400 max-w-3xl mx-auto">
                    Ready to secure your project? Reach out to us directly through one of the methods below for a prompt response. We're here to help with service requests, custom quotes, or any questions you may have.
                </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
                 <a 
                    href="https://t.me/fitowolf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-gray-800 p-5 rounded-lg border border-transparent hover:border-indigo-500 hover:bg-gray-800/50 transition-all duration-300"
                    aria-label="Contact us on Telegram"
                >
                    <div className="flex-shrink-0 bg-blue-900/50 p-3 rounded-full">
                        <TelegramIcon className="w-7 h-7 text-blue-400"/>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">Contact on Telegram</h2>
                        <p className="text-gray-400 text-sm">For the fastest response, send a message to @fitowolf.</p>
                    </div>
                    <ChevronRightIcon className="flex-shrink-0 w-6 h-6 text-gray-500 ml-auto group-hover:text-white transition-colors" />
                </a>

                <a 
                    href="mailto:audit@fitotechnology.com"
                    className="group flex items-center gap-4 bg-gray-800 p-5 rounded-lg border border-transparent hover:border-indigo-500 hover:bg-gray-800/50 transition-all duration-300"
                    aria-label="Send us an email"
                >
                    <div className="flex-shrink-0 bg-green-900/50 p-3 rounded-full">
                        <MailIcon className="w-7 h-7 text-green-400"/>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">Send an Email</h2>
                        <p className="text-gray-400 text-sm">audit@fitotechnology.com</p>
                    </div>
                    <ChevronRightIcon className="flex-shrink-0 w-6 h-6 text-gray-500 ml-auto group-hover:text-white transition-colors" />
                </a>
            </div>
            
             <div className="text-center mt-10 text-gray-400">
                <h3 className="font-semibold text-white text-lg">Business Hours</h3>
                <p>Monday - Friday</p>
                <p>9:00 AM - 5:00 PM (EST)</p>
            </div>
        </div>
    );
};
