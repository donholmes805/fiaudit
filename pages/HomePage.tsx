


import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { get } from '@vercel/edge-config';
import { ShieldCheckIcon, ChevronRightIcon } from '../components/Icons';
import { ServiceType, serviceTypeDetails } from '../types';

const Feature: React.FC<{ icon: React.ReactNode, title: string, price: number, children: React.ReactNode }> = ({ icon, title, price, children }) => (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-3">
            {icon}
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 flex-grow">{children}</p>
        <div className="mt-4 text-right">
            <span className="text-sm font-semibold text-gray-300 bg-gray-800 px-3 py-1 rounded-full">
                Starts at ${price.toLocaleString()}
            </span>
        </div>
    </div>
);

const featureList: ServiceType[] = ['SMART_CONTRACT_AUDIT', 'L1_L2_AUDIT', 'PENETRATION_TEST', 'KYC_TEAM'];
const detailedServiceList: ServiceType[] = ['SMART_CONTRACT_AUDIT', 'L1_L2_AUDIT', 'PENETRATION_TEST', 'KYC_SINGLE'];

const DEFAULT_HERO_TITLE = "The AI-Powered Blockchain Security Suite";
const DEFAULT_HERO_SUBTITLE = "From smart contracts to full-stack penetration testing, Fito Audit leverages Fito AI to provide fast, extensive, and actionable security insights for your Web3 project.";


export const HomePage: React.FC = () => {
    const [heroTitle, setHeroTitle] = useState<string | undefined>(undefined);
    const [heroSubtitle, setHeroSubtitle] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchHeroContent = async () => {
            try {
                const [title, subtitle] = await Promise.all([
                    get<string>('home_hero_title'),
                    get<string>('home_hero_subtitle'),
                ]);
                setHeroTitle(title || DEFAULT_HERO_TITLE);
                setHeroSubtitle(subtitle || DEFAULT_HERO_SUBTITLE);
            } catch (error) {
                // This catch block executes during local development when Vercel Edge Config
                // is unavailable. This is expected, so we'll just fall back to the default
                // content without logging an error to the console.
                setHeroTitle(DEFAULT_HERO_TITLE);
                setHeroSubtitle(DEFAULT_HERO_SUBTITLE);
            }
        };
        fetchHeroContent();
    }, []);

    return (
        <div className="space-y-16 sm:space-y-24">
            {/* Hero Section */}
            <section className="text-center pt-16 pb-12">
                <ShieldCheckIcon className="w-24 h-24 text-indigo-400 mx-auto mb-4" />
                
                {heroTitle && heroSubtitle ? (
                    <>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                            {heroTitle}
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
                            {heroSubtitle}
                        </p>
                    </>
                ) : (
                    <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
                        <div className="h-10 bg-gray-700 rounded-md w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-700 rounded-md w-full mx-auto mt-6"></div>
                        <div className="h-4 bg-gray-700 rounded-md w-5/6 mx-auto"></div>
                    </div>
                )}

                <div className="mt-8 flex justify-center gap-4">
                    <ReactRouterDOM.Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-transform transform hover:scale-105"
                    >
                        Request a Service
                    </ReactRouterDOM.Link>
                    <ReactRouterDOM.Link
                        to="/search"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
                    >
                        Search Reports
                    </ReactRouterDOM.Link>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-center text-white mb-10">A Comprehensive Security Solution</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureList.map((key) => {
                        const service = serviceTypeDetails[key];
                        const Icon = service.icon;
                        return (
                            <Feature
                                key={key}
                                icon={
                                    <div className={`p-2 rounded-full ${service.iconBgColor}`}>
                                        <Icon className={`w-6 h-6 ${service.iconTextColor}`} />
                                    </div>
                                }
                                title={service.name}
                                price={service.price}
                            >
                                {service.description}
                            </Feature>
                        );
                    })}
                </div>
            </section>
            
            {/* Detailed Services Section */}
            <section id="learn-more" className="space-y-20 scroll-mt-20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Our Services in Detail</h2>
                    <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover how each of our AI-driven services provides a different layer of security for your project.
                    </p>
                </div>

                <div className="space-y-16">
                    {detailedServiceList.map((key, index) => {
                        const service = serviceTypeDetails[key];
                        return (
                        <div key={key} className={`flex flex-col md:flex-row gap-8 lg:gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                                <div className={`p-8 rounded-full ${service.iconBgColor}`}>
                                    <service.icon className={`w-24 h-24 ${service.iconTextColor}`} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                                    <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                                    <span className="text-sm font-semibold text-gray-200 bg-gray-800 px-3 py-1 rounded-full">
                                        Starts at ${service.price.toLocaleString()}
                                    </span>
                                </div>

                                <p className="text-gray-400 leading-relaxed">
                                    {service.longDescription}
                                </p>
                                <ReactRouterDOM.Link to="/contact" className="inline-flex items-center mt-4 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                                    Request this Service <ChevronRightIcon className="w-4 h-4 ml-1" />
                                </ReactRouterDOM.Link>
                            </div>
                        </div>
                    )})}
                </div>
            </section>
        </div>
    );
};