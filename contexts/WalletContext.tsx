import React, { ReactNode } from 'react';

// This context is deprecated as wallet and user functionality has been removed.
// It is left in place as an empty shell to prevent import errors from other
// deprecated components that have not been removed from the filesystem.

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

export const useAppState = () => {
    // Return a dummy object to prevent crashes in any remaining dead code.
    return {
        user: null,
        addToast: () => {},
    };
};
