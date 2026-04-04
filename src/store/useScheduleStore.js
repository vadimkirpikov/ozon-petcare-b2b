import { create } from 'zustand';

/**
 * @typedef {Object} ScheduleAppointment
 * @property {string} id
 * @property {string} title
 * @property {string} time
 * @property {number} durationMinutes
 * @property {string} service
 * @property {boolean} isOzon
 * @property {string} status
 */

const mockAppointments = [
  { id: '1', title: 'Арчи (Корги)', time: '10:00', durationMinutes: 60, service: 'Стрижка когтей', isOzon: true, status: 'confirmed' },
  { id: '2', title: 'Барсик (Мейн-кун)', time: '11:00', durationMinutes: 90, service: 'Вакцинация', isOzon: false, status: 'confirmed' },
  { id: '3', title: 'Рекс (Овчарка)', time: '14:30', durationMinutes: 60, service: 'Осмотр', isOzon: true, status: 'completed' },
];

const useScheduleStore = create((set) => ({
  appointments: mockAppointments,
  isLoading: false,
  
  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment]
  })),

  moveAppointment: (id, newTime) => set((state) => ({
    appointments: state.appointments.map(app => 
      app.id === id ? { ...app, time: newTime } : app
    )
  })),

  loadData: async () => {
    set({ isLoading: true });
    setTimeout(() => set({ isLoading: false }), 800);
  }
}));

export default useScheduleStore;
