import { create } from 'zustand';

/**
 * @typedef {Object} AppointmentMock
 * @property {string} id
 * @property {string} time
 * @property {string} petName
 * @property {string} petBreed
 * @property {string} service
 * @property {string} ownerName
 * @property {string} avatar
 */

const useDashboardStore = create((set) => ({
  metrics: {
    revenue: 24500,
    appointmentsToday: 12,
    activeGigs: 3,
    rating: 4.8
  },
  upcomingAppointment: {
    id: "app_1",
    time: "14:30",
    petName: "Арчи",
    petBreed: "Вельш-корги",
    service: "Комплексный груминг",
    ownerName: "Елена В.",
    avatar: "🐶"
  },
  alerts: [
    { id: 1, type: "warning", message: "Подтвердите сертификат грумера до 20.05", date: "Сегодня" },
    { id: 2, type: "success", message: "Выплата 45 000 ₽ успешно переведена на счет", date: "Вчера" }
  ],
  isLoading: false,
  
  // mock a fetch
  loadData: async () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ isLoading: false });
    }, 800);
  }
}));

export default useDashboardStore;
