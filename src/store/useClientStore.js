import { create } from 'zustand';

const mockClients = [
  { id: 'c1', name: 'Елена Васильева', phone: '+7 (999) 111-22-33', isPremium: true, petName: 'Арчи', petBreed: 'Корги', lastVisit: '10.05.2026', ltv: 15400, age: '2 года', allergies: ['Курица', 'Говядина'] },
  { id: 'c2', name: 'Иван Петров', phone: '+7 (900) 222-33-44', isPremium: false, petName: 'Барсик', petBreed: 'Дворовая', lastVisit: '01.04.2026', ltv: 3200, age: '5 лет', allergies: [] }
];

const useClientStore = create((set) => ({
  clients: mockClients,
  searchQuery: '',
  selectedClient: null,
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedClient: (c) => set({ selectedClient: c }),
}));

export default useClientStore;
