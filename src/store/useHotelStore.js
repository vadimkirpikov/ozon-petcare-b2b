import { create } from 'zustand';

const mockHotelBookings =[
  {
    id: 'hb_001',
    roomId: 'vip_1',
    roomName: 'Вольер VIP #1',
    petName: 'Барсик (Мейн-кун)',
    checkIn: '10',
    checkOut: '15',
    status: 'checked-in',
    ownerPhone: '+7 999 123 45 67',
    source: 'ozon',
    financials: {
      total: 7500,
      ozonFee: 375, // Комиссия экосистемы 5% (PRO тариф)
      paymentStatus: 'hold',
      guarantee: true
    },
    legal: {
      contractSigned: true,
      liabilityWaiver: true
    },
    specialRequests: 'Кормить 3 раза в день, влажный корм',
    hasClimate: true
  },
  {
    id: 'hb_002',
    roomId: 'std_1',
    roomName: 'Вольер Стандарт',
    petName: 'Рекс (Овчарка)',
    checkIn: '12',
    checkOut: '14',
    status: 'pending',
    ownerPhone: '+7 900 000 00 00',
    source: 'direct',
    financials: {
      total: 3000,
      ozonFee: 0,
      paymentStatus: 'unpaid',
      guarantee: false
    },
    legal: {
      contractSigned: false,
      liabilityWaiver: false
    },
    specialRequests: 'Агрессия к котам',
    hasClimate: false
  }
];

const useHotelStore = create((set) => ({
  bookings: mockHotelBookings,
  occupancyRate: 65,
  isLoading: false,
  selectedBooking: null,
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  loadData: async () => {
    set({ isLoading: true });
    setTimeout(() => set({ isLoading: false }), 800);
  }
}));

export default useHotelStore;