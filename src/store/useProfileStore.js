import { create } from 'zustand';

const useProfileStore = create((set) => ({
    activeModules: {
        dashboard: true,
        schedule: true,
        hotel: true,
        gigs: false,
        market: true,
        clients: true,
        sos: true,
        finance: true
    },

    toggleModule: (moduleId) => set((state) => ({
        activeModules: {
            ...state.activeModules, [moduleId]: !state.activeModules[moduleId]
        }
    }))
}));

export default useProfileStore;