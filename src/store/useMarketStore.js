import { create } from 'zustand';

const mockListings = [
  { id: '1', name: 'Симба', type: 'cat', breed: 'Мейн-кун', status: 'new', avatarUrl: '🐈' },
  { id: '2', name: 'Арчи', type: 'dog', breed: 'Корги', status: 'interview', avatarUrl: '🐶' },
  { id: '3', name: 'Рекс', type: 'dog', breed: 'Овчарка', status: 'reserved', avatarUrl: '🐕' },
];

const useMarketStore = create((set) => ({
  listings: mockListings,
  isLoading: false,
  moveListing: (id, newStatus) => set((state) => ({
    listings: state.listings.map(l => l.id === id ? { ...l, status: newStatus } : l)
  }))
}));

export default useMarketStore;
