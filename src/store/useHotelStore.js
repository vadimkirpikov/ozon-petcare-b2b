import { create } from 'zustand';

const mockHotelBookings = [
  {
    id: 'hb_001',
    roomId: 'vip_1',
    roomName: 'Вольер VIP #1',
    petName: 'Барсик',
    checkIn: '10', // Simplified for demo to day of month
    checkOut: '15',
    status: 'checked-in',
    ownerPhone: '+7 999 123 45 67',
    specialRequests: 'Кормить 3 раза в день, влажный корм',
    hasCamera: true,
    hasClimate: true
  },
  {
    id: 'hb_002',
    roomId: 'std_1',
    roomName: 'Вольер Стандарт',
    petName: 'Рекс',
    checkIn: '12',
    checkOut: '14',
    status: 'pending',
    ownerPhone: '+7 900 000 00 00',
    specialRequests: 'Нет',
    hasCamera: false,
    hasClimate: false
  }
];

const useHotelStore = create((set) => ({
  bookings: mockHotelBookings,
  occupancyRate: 65,
  isLoading: false,
  loadData: async () => {
    set({ isLoading: true });
    setTimeout(() => set({ isLoading: false }), 800);
  }
}));

export default useHotelStore;
