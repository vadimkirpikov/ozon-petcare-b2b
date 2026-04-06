import { create } from 'zustand';

const useProfileStore = create((set) => ({
    // Монетизационная часть
    subscription: {
        status: 'free', // 'free' | 'pro'
        expiresAt: null,
        features: {
            reducedCommission: false, // 5% вместо 15%
            topRanking: false, // Топ в поиске B2C
            advancedAnalytics: false,
            prioritySos: false
        }
    },

    activeModules: {
        dashboard: true,
        schedule: true,
        hotel: true,
        gigs: false,
        market: true,
        clients: true,
        sos: true,
        finance: true,
        pro: true // Вкладка управления подпиской
    },

    toggleModule: (moduleId) => set((state) => ({
        activeModules: {
            ...state.activeModules,[moduleId]: !state.activeModules[moduleId]
        }
    })),

    // Функция покупки тарифа PRO (мокаем запрос к эквайрингу)
    upgradeToPro: () => set({
        subscription: {
            status: 'pro',
            expiresAt: '2027-05-10',
            features: {
                reducedCommission: true,
                topRanking: true,
                advancedAnalytics: true,
                prioritySos: true
            }
        }
    })
}));

export default useProfileStore;