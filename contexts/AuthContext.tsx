
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import * as OTPAuth from 'otpauth';
import { get } from '@vercel/edge-config';

// State definitions
interface AuthContextType {
    isAuthenticated: boolean;
    is2FAEnabled: boolean;
    login: (email?: string, password?: string) => Promise<{ success: boolean; needs2FA: boolean }>;
    logout: () => void;
    verify2FAToken: (token: string) => boolean;
    generate2FASecret: () => { secret: string; uri: string };
    enable2FA: (secret: string, token: string) => boolean;
    disable2FA: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants
const AUTH_STORAGE_KEY = 'fito_audit_auth_session';
const TFA_SECRET_KEY = 'fito_audit_2fa_secret';
const TFA_ENABLED_KEY = 'fito_audit_2fa_enabled';
const AUTH_ATTEMPT_KEY = 'fito_audit_auth_attempt'; // For multi-step login

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Check initial authenticated state (fully logged in)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        try {
            return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
        } catch {
            return false;
        }
    });

    // Check if 2FA is configured for the account
    const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(() => {
        try {
            return window.localStorage.getItem(TFA_ENABLED_KEY) === 'true';
        } catch {
            return false;
        }
    });

    const clearSession = () => {
        setIsAuthenticated(false);
        try {
            window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
            window.sessionStorage.removeItem(AUTH_ATTEMPT_KEY);
        } catch (error) {
            console.error("Failed to clear session storage", error);
        }
    };

    const login = async (email?: string, password?: string): Promise<{ success: boolean; needs2FA: boolean }> => {
        let adminEmail, adminPassword;
        
        try {
            // Fetch credentials from Edge Config
            [adminEmail, adminPassword] = await Promise.all([
                get<string>('admin_email'),
                get<string>('admin_password')
            ]);
        } catch (error) {
            console.warn('Could not fetch from Edge Config, using fallback. This is expected in local development.');
        }

        // Use fetched credentials or fallback to original hardcoded values
        const effectiveAdminEmail = adminEmail || 'donholmes805@gmail.com';
        const effectiveAdminPassword = adminPassword || 'Atchison7378$';


        if (email === effectiveAdminEmail && password === effectiveAdminPassword) {
            if (is2FAEnabled) {
                try {
                    // Set a temporary flag indicating password step is complete
                    window.sessionStorage.setItem(AUTH_ATTEMPT_KEY, 'true');
                } catch (error) {
                    console.error("Failed to save auth attempt to sessionStorage", error);
                }
                return { success: true, needs2FA: true };
            } else {
                // No 2FA, log in directly
                try {
                    window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
                } catch (error) {
                    console.error("Failed to save auth state to sessionStorage", error);
                }
                setIsAuthenticated(true);
                return { success: true, needs2FA: false };
            }
        }
        return { success: false, needs2FA: false };
    };

    const logout = () => {
        clearSession();
    };

    const verify2FAToken = (token: string): boolean => {
        try {
            // Must have passed password check first
            const authAttempt = window.sessionStorage.getItem(AUTH_ATTEMPT_KEY);
            if (authAttempt !== 'true') return false;

            const secret = window.localStorage.getItem(TFA_SECRET_KEY);
            if (!secret) return false;

            const totp = new OTPAuth.TOTP({
                issuer: 'FitoAudit',
                label: 'Admin',
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: secret,
            });

            const delta = totp.validate({ token, window: 1 });
            if (delta !== null) {
                // Token is valid, complete login
                window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
                window.sessionStorage.removeItem(AUTH_ATTEMPT_KEY);
                setIsAuthenticated(true);
                return true;
            }
        } catch (error) {
            console.error("Error verifying 2FA token:", error);
        }
        return false;
    };
    
    const generate2FASecret = useCallback(() => {
        const totp = new OTPAuth.TOTP({
            issuer: 'FitoAudit',
            label: 'donholmes805@gmail.com',
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
        });
        const secret = totp.secret.base32;
        const uri = totp.toString();
        return { secret, uri };
    }, []);

    const enable2FA = useCallback((secret: string, token: string): boolean => {
        try {
            const totp = new OTPAuth.TOTP({
                issuer: 'FitoAudit',
                label: 'Admin',
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: secret,
            });

            const delta = totp.validate({ token, window: 1 });

            if (delta !== null) {
                window.localStorage.setItem(TFA_SECRET_KEY, secret);
                window.localStorage.setItem(TFA_ENABLED_KEY, 'true');
                setIs2FAEnabled(true);
                return true;
            }
        } catch (error) {
            console.error("Error enabling 2FA:", error);
        }
        return false;
    }, []);

    const disable2FA = useCallback(() => {
        try {
            window.localStorage.removeItem(TFA_SECRET_KEY);
            window.localStorage.removeItem(TFA_ENABLED_KEY);
            setIs2FAEnabled(false);
        } catch (error) {
            console.error("Error disabling 2FA:", error);
        }
    }, []);

    const value = { isAuthenticated, is2FAEnabled, login, logout, verify2FAToken, generate2FASecret, enable2FA, disable2FA };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
