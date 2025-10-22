import { createContext, useContext, useState, ReactNode } from "react";

type Units = 'metric' | 'imperial';

type SettingsContextType = {
    units: Units;
    setUnits: (units: Units) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [units, setUnits] = useState<Units>('metric');

    return (
        <SettingsContext.Provider value={{ units, setUnits }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}