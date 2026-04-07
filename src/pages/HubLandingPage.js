import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2, ShieldCheck, MapPin, ArrowRight, Scissors,
    Key, Sparkles, UserCheck, XCircle, CheckCircle2,
    Wallet, DoorOpen, TrendingUp, Briefcase
} from 'lucide-react';
import { cn } from '../components/ui/Card';

const HubLandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-brand-500 selection:text-white">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-gray-900 tracking-tight">Ozon <span className="text-brand-600">PetCare</span></span>
                    <span className="bg-brand-50 text-brand-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Hub</span>
                </div>
                <button onClick={() => navigate('/partner/dashboard')} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
                    <DoorOpen size={16} /> В B2B портал
                </button>
            </header>

            {/* Hero Section: Общая концепция экосистемы */}
            <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-blue-50/50 to-transparent relative overflow-hidden">
                <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-brand-400 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 mb-6 shadow-sm">
                            <Sparkles size={16} className="text-brand-500" />
                            Сеть умных коворкингов
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
                            Новый стандарт <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-ozon-500">pet-услуг</span> от Ozon
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Мы объединяем мастеров, ищущих комфортное место для работы, и инвесторов, готовых предоставлять помещения для пассивного дохода.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <button onClick={() => scrollToSection('for-masters')} className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                                <Scissors size={20} /> Я Мастер
                            </button>
                            <button onClick={() => scrollToSection('for-investors')} className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                                <Building2 size={20} /> Я Инвестор
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-lg relative">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">Ozon Hub #4012</h3>
                                    <p className="text-sm text-brand-600 font-semibold flex items-center gap-1 mt-1"><MapPin size={14}/> Доступно 24/7</p>
                                </div>
                                <ShieldCheck size={28} className="text-green-500" />
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-5 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><UserCheck size={20} /></div>
                                    <div className="text-sm"><span className="font-bold text-gray-900 block">Верифицированный вход</span>Смарт-замок по пин-коду</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center"><Briefcase size={20} /></div>
                                    <div className="text-sm"><span className="font-bold text-gray-900 block">Проф. оборудование</span>Груминг-стол, ванна, фен</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 1: FOR MASTERS (Оказание услуг) */}
            <section id="for-masters" className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 text-gray-900 rounded-2xl flex items-center justify-center mb-4">
                            <Scissors size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Для исполнителей: работа на нейтральной территории</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Квартиры не предназначены для стрижки животных. Бронируйте слоты в Ozon Hub и работайте в профессиональных условиях без риска для себя и клиентов.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 opacity-70">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <XCircle className="text-red-500" size={24} /> У клиента дома
                            </h3>
                            <p className="text-sm text-gray-600">Клиенту приходится пускать постороннего в дом. Остается много грязи. Мастеру тяжело работать без спец. стола и правильного освещения.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 opacity-70">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <XCircle className="text-orange-500" size={24} /> У себя дома
                            </h3>
                            <p className="text-sm text-gray-600">Вы пускаете чужих людей в свое личное пространство. Соседи жалуются на лай. Клиент сомневается в санитарии и боится инфекций.</p>
                        </div>

                        <div className="bg-brand-50 p-8 rounded-3xl border border-brand-300 shadow-lg relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-500 opacity-10 rounded-full blur-xl"></div>
                            <h3 className="text-xl font-bold text-brand-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="text-brand-600" size={28} /> В Ozon Hub
                            </h3>
                            <p className="text-sm text-brand-800 font-medium">
                                Стерильно, безопасно. Вход по пин-коду. Отличное освещение, мощная вытяжка, профессиональная ванна. Клиент доверяет экосистеме.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 2: FOR INVESTORS (Открытие Хаба) */}
            <section id="for-investors" className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
                <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-800 text-ozon-400 border border-gray-700 rounded-2xl flex items-center justify-center mb-4">
                            <Building2 size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Для партнеров: откройте Ozon Hub</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Зарабатывайте как ПВЗ, только на услугах. Сдавайте оборудованные мини-помещения, а алгоритмы Ozon автоматически заполнят их мастерами.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-gray-500 transition-colors">
                            <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-ozon-400 mb-6 shadow-inner">
                                <MapPin size={24} />
                            </div>
                            <h4 className="text-xl font-bold mb-2">1. Аренда помещения</h4>
                            <p className="text-gray-400 text-sm">Находите площадь от 15 кв.м. Делаете базовый ремонт по брендбуку Ozon и ставите стол и ванну.</p>
                        </div>

                        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-gray-500 transition-colors">
                            <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-brand-400 mb-6 shadow-inner">
                                <Key size={24} />
                            </div>
                            <h4 className="text-xl font-bold mb-2">2. Умный замок (IoT)</h4>
                            <p className="text-gray-400 text-sm">Интеграция с Ozon API. Двери открываются автоматически по пин-кодам из приложения. Персонал не нужен.</p>
                        </div>

                        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-gray-500 transition-colors">
                            <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-green-400 mb-6 shadow-inner">
                                <TrendingUp size={24} />
                            </div>
                            <h4 className="text-xl font-bold mb-2">3. Пассивный доход</h4>
                            <p className="text-gray-400 text-sm">Вы получаете до 800 ₽ за каждый час аренды вашей точки. Все транзакции проходят через Ozon Pay.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Wallet className="text-brand-600" size={32} />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Белая экономика и защита</h2>
                    <p className="text-lg text-gray-500 mb-10">
                        Оплата услуг жестко привязана к Ozon Escrow. Это исключает наличный расчет в обход платформы и гарантирует легальность каждой сделки в Hub'е.
                    </p>
                    <button className="bg-brand-600 hover:bg-brand-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-lg transition-all hover:-translate-y-1 inline-flex items-center gap-3 mx-auto">
                        Оставить заявку на подключение <ArrowRight size={24} />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default HubLandingPage;