import { create } from 'zustand';

const mockGigs = [
  {
    id: 'gig_1',
    title: 'Срочный выгул',
    description: 'Нужно выгулять корги 40 минут. Собака активная.',
    reward: 500,
    distancePx: 800,
    urgency: 'high',
    deadline: 'Через 15 мин',
    petSnapshot: { name: 'Стив', breed: 'Корги', avatarUrl: '🐶' }
  },
  {
    id: 'gig_2',
    title: 'Дневной ситтинг',
    description: 'Посидеть с щенком добермана с 14:00 до 18:00.',
    reward: 2000,
    distancePx: 2500,
    urgency: 'medium',
    deadline: 'Завтра 14:00',
    petSnapshot: { name: 'Рокки', breed: 'Доберман', avatarUrl: '🐕' }
  }
];

const useGigStore = create((set) => ({
  gigs: mockGigs,
  isOnline: false,
  toggleOnline: () => set((state) => {
    const newState = !state.isOnline;
    if (newState) {
      // Simulate real-time gigs arriving finding mock gigs
      setTimeout(() => {
        set((s) => ({
          gigs: [{
            id: 'gig_3',
            title: 'Инъекция коту',
            description: 'Срочно сделать укол назначенного препарата',
            reward: 800,
            distancePx: 300,
            urgency: 'sos',
            deadline: 'Сейчас',
            petSnapshot: { name: 'Луна', breed: 'Дворняга', avatarUrl: '🐈' }
          }, ...s.gigs]
        }));
      }, 1500);
    }
    return { isOnline: newState };
  }),
}));

export default useGigStore;
