import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error';

type ToastConfig = {
    message: string;
    type: ToastType;
    duration?: number;
};

type ToastContextType = {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastConfig | null>(null);
    const [visible, setVisible] = useState(false);

    const showToast = useCallback((
        message: string,
        type: ToastType = 'success',
        duration: number = 3000
    ) => {
        setToast({ message, type, duration });
        setVisible(true);

        // Auto-hide after duration
        setTimeout(() => {
            hideToast();
        }, duration);
    }, []);

    const hideToast = useCallback(() => {
        setVisible(false);
        // Clear toast after animation completes
        setTimeout(() => {
            setToast(null);
        }, 300);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toast && (
                <FavoritesToast
                    message={toast.message}
                    type={toast.type}
                    visible={visible}
                    onHide={hideToast}
                />
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

import FavoritesToast from '@/components/favorites-toast';