import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, MapPin, Search, ChevronRight, ShieldCheck,
    UserCheck, Home, User, Scissors, Activity, Building2,
    Stethoscope, Clock, Heart, Droplets, Wind
} from 'lucide-react';
import { cn } from '../components/ui/Card';

const mainCategories =[
    { id: 'grooming', title: 'Груминг', icon: Scissors, label: 'Популярно', color: 'bg-blue-50 text-blue-600' },
    { id: 'walking', title: 'Выгул', icon: Activity, label: '', color: 'bg-green-50 text-green-600' },
    { id: 'hotel', title: 'Зоогостиница', icon: Building2, label: 'Отпуск', color: 'bg-orange-50 text-orange-600' },
    { id: 'vet', title: 'Ветклиника', icon: Stethoscope, label: '', color: 'bg-red-50 text-red-600' },
];

export default function B2CMockupPage() {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('home');
    const[locationType, setLocationType] = useState('hub');

    const renderHome = () => (
        <div className="h-full bg-white flex flex-col">
            <div className="px-4 pt-12 pb-4 flex flex-col items-center border-b border-gray-100">
                <span className="text-xl font-black tracking-tight flex items-center gap-1">Ozon <span className="text-brand-600">PetCare</span></span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Услуга, клиника или мастер" className="w-full bg-gray-100 py-3.5 pl-12 pr-4 rounded-2xl font-medium focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    {mainCategories.map(cat => (
                        <button key={cat.id} onClick={() => setScreen('category')} className="bg-gray-50 rounded-3xl p-5 flex flex-col items-center text-center relative hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                            {cat.label && <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{cat.label}</span>}
                            <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-sm", cat.color)}>
                                <cat.icon size={24} />
                            </div>
                            <span className="font-semibold text-sm text-gray-900">{cat.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCategory = () => (
        <div className="h-full bg-white flex flex-col">
            <div className="px-4 pt-12 pb-4 flex items-center relative border-b border-gray-100 shadow-sm z-10 bg-white">
                <button onClick={() => setScreen('home')} className="absolute left-4 p-2 bg-gray-100 rounded-full"><ChevronLeft size={20} /></button>
                <h2 className="w-full text-center font-bold text-lg">Груминг</h2>
            </div>

            <div className="p-4 flex-1 overflow-y-auto hide-scrollbar space-y-4 bg-gray-50">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 flex flex-col text-center">
                    <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Droplets size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Комплексный уход</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed px-4">Алгоритм подберет лучшего профи рядом с вами.</p>
                    <button onClick={() => setScreen('booking')} className="w-full bg-brand-50 text-brand-700 font-bold py-4 rounded-2xl hover:bg-brand-100 transition-colors">
                        Найти мастера от 2000 ₽
                    </button>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 flex flex-col text-center">
                    <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wind size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Экспресс-линька</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed px-4">Профессиональный вычес шерсти.</p>
                    <button onClick={() => setScreen('booking')} className="w-full bg-brand-50 text-brand-700 font-bold py-4 rounded-2xl hover:bg-brand-100 transition-colors">
                        Найти мастера от 1500 ₽
                    </button>
                </div>
            </div>
        </div>
    );

    const renderBooking = () => (
        <div className="h-full bg-white flex flex-col relative">
            <div className="px-4 pt-12 pb-4 flex items-center relative bg-white z-10 shadow-sm">
                <button onClick={() => setScreen('category')} className="absolute left-4 p-2 bg-gray-100 rounded-full"><ChevronLeft size={20} /></button>
                <h2 className="w-full text-center font-bold text-lg">Оформление</h2>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
                <div className="bg-blue-50/50 border-b border-blue-100 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <UserCheck size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">Поиск специалиста...</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Назначим проверенного профи (⭐ 4.9+)</p>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Где оказать услугу?</h3>
                    <div className="flex flex-col gap-3">

                        {/* Ozon Hub Option (RECOMMENDED) */}
                        <button onClick={() => setLocationType('hub')} className={cn("flex items-start gap-4 p-4 rounded-2xl border-2 transition-all relative overflow-hidden text-left", locationType === 'hub' ? "bg-brand-50 border-brand-500 shadow-md" : "bg-white border-gray-200 hover:border-brand-200")}>
                            {locationType === 'hub' && <div className="absolute right-0 top-0 w-16 h-16 bg-brand-500 opacity-10 rounded-bl-full"></div>}
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1", locationType === 'hub' ? "bg-brand-600 text-white shadow-sm" : "bg-gray-100 text-gray-500")}><MapPin size={20} /></div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={cn("font-bold text-sm", locationType === 'hub' ? "text-brand-900" : "text-gray-900")}>В Ozon Hub</span>
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><ShieldCheck size={10} /> Рекомендуем</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-tight">Безопасная нейтральная территория. Оборудованный коворкинг.</p>
                                {locationType === 'hub' && <p className="text-xs font-bold text-brand-700 mt-2 bg-white px-2 py-1 rounded-md inline-block border border-brand-200 shadow-sm">Ближайший: ул. Ленина, 14 (300 м)</p>}
                            </div>
                        </button>

                        {/* Home Option */}
                        <button onClick={() => setLocationType('home')} className={cn("flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left", locationType === 'home' ? "bg-gray-50 border-gray-900" : "bg-white border-gray-200")}>
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1", locationType === 'home' ? "bg-gray-900 text-white shadow-sm" : "bg-gray-100 text-gray-500")}><Home size={20} /></div>
                            <div>
                                <span className="font-bold text-sm text-gray-900 mb-1 block">К себе домой</span>
                                <p className="text-xs text-gray-500 leading-tight">Мастер приедет по вашему адресу со своим инструментом. Грязь останется у вас.</p>
                            </div>
                        </button>

                        {/* Master Option */}
                        <button onClick={() => setLocationType('master')} className={cn("flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left", locationType === 'master' ? "bg-gray-50 border-gray-900" : "bg-white border-gray-200")}>
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1", locationType === 'master' ? "bg-gray-900 text-white shadow-sm" : "bg-gray-100 text-gray-500")}><User size={20} /></div>
                            <div>
                                <span className="font-bold text-sm text-gray-900 mb-1 block">Домой к мастеру</span>
                                <p className="text-xs text-gray-500 leading-tight">Точный адрес определится после назначения специалиста алгоритмом.</p>
                            </div>
                        </button>

                    </div>

                    <div className="mt-6">
                        <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm"><Heart size={20} /></div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Питомец: Арчи</p>
                                    <p className="text-xs text-gray-500">Корги • Ozon Pet ID</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100">
                <div className="flex justify-between items-end mb-4 px-2">
                    <div>
                        <p className="text-xs text-gray-500 font-medium">К оплате (Ozon Pay)</p>
                        <p className="text-2xl font-black text-gray-900">2 000 ₽</p>
                    </div>
                </div>
                <button className="w-full bg-brand-600 active:bg-brand-700 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-brand-500/30 transition-transform active:scale-95">
                    {locationType === 'hub' ? 'Забронировать Hub и Мастера' : 'Вызвать мастера'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans relative">
            <button onClick={() => navigate('/partner/dashboard')} className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                <ChevronLeft size={16} /> Закрыть демо
            </button>

            <div className="w-full max-w-[400px] h-[800px] bg-black rounded-[3rem] p-3 shadow-2xl relative border-4 border-gray-800">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-3xl z-50"></div>
                    {screen === 'home' && renderHome()}
                    {screen === 'category' && renderCategory()}
                    {screen === 'booking' && renderBooking()}
                </div>
            </div>

            <div className="hidden lg:block ml-16 max-w-sm text-gray-400">
                <h2 className="text-3xl font-black text-white mb-4">Авто-назначение и выбор локации</h2>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 space-y-4">
                    <div>
                        <h3 className="text-brand-400 font-bold mb-1">1. Исполнитель не важен</h3>
                        <p className="text-sm">Алгоритм сам назначает проверенного профи, обеспечивая 100% заполняемость для фрилансеров Ozon.</p>
                    </div>
                    <div>
                        <h3 className="text-green-400 font-bold mb-1">2. Ozon Hub — в приоритете</h3>
                        <p className="text-sm">Выбор локации спроектирован так, чтобы клиент с вероятностью 90% выбрал безопасную <b>нейтральную территорию</b>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}