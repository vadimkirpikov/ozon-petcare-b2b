import React from 'react';
import useProfileStore from '../store/useProfileStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Crown, CheckCircle2, TrendingUp, Percent, Star, ShieldCheck } from 'lucide-react';
import { cn } from '../components/ui/Card';

const ProSubscriptionPage = () => {
    const { subscription, upgradeToPro } = useProfileStore();
    const isPro = subscription.status === 'pro';

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-10">

            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-12 text-white shadow-2xl border border-gray-800">
                <div className="absolute top-0 right-0 w-96 h-96 bg-ozon-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <Badge variant="ozon" className="mb-4 bg-ozon-500/20 text-ozon-300 border-ozon-500/30">Для бизнеса</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-3">
                            Ozon PetCare <span className="text-ozon-400">PRO</span> <Crown className="text-ozon-400" size={40} />
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            Максимизируйте выручку вашего бизнеса. Сниженная комиссия Ozon, приоритет в выдаче клиентского приложения и расширенная аналитика продаж.
                        </p>

                        {!isPro ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={upgradeToPro}
                                    className="bg-ozon-500 hover:bg-ozon-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
                                >
                                    Подключить за 2 990 ₽ / мес
                                </button>
                                <p className="text-sm text-gray-500">Списание с баланса Ozon Pay</p>
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-xl">
                                <ShieldCheck size={24} />
                                <div>
                                    <p className="font-bold">Подписка активна</p>
                                    <p className="text-xs text-green-500/70">Следующее списание 10 мая 2027</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Сравнение выгоды */}
                    {!isPro && (
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-full md:w-80 flex flex-col gap-4">
                            <h3 className="font-bold text-white text-center">Окупаемость тарифа</h3>
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="text-gray-400">Комиссия экосистемы</span>
                                <span className="font-bold text-red-400 line-through">15%</span>
                                <span className="font-bold text-green-400">5%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="text-gray-400">Бронирования / мес</span>
                                <span className="font-bold text-white">~50</span>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs text-gray-400 text-center mb-1">Экономия на комиссиях:</p>
                                <p className="text-2xl font-bold text-ozon-400 text-center">+ 18 500 ₽</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Grid */}
            <h2 className="text-2xl font-bold text-gray-900 px-2 mt-4">Что дает подписка экосистеме?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Card className={cn("p-6 transition-colors", isPro && "border-ozon-300 bg-ozon-50/30")}>
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                        <Percent size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Сниженный Take Rate</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Вместо базовой комиссии 15% за бронирование через Ozon, вы платите всего 5%. Экономия начинается с первой продажи.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-green-500" /> Транзакции через Ozon Pay</li>
                        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-green-500" /> Вывод средств 0%</li>
                    </ul>
                </Card>

                <Card className={cn("p-6 transition-colors", isPro && "border-ozon-300 bg-ozon-50/30")}>
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                        <Star size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Приоритет в выдаче B2C</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Ваша клиника или гостиница будет отображаться с бейджем «Рекомендуем» на первых местах в Ozon SuperApp.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-green-500" /> x3 больше просмотров профиля</li>
                        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-green-500" /> Выделение цветом на карте</li>
                    </ul>
                </Card>

                <Card className={cn("p-6 transition-colors", isPro && "border-ozon-300 bg-ozon-50/30")}>
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Retail Media & Аналитика</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Доступ к тепловым картам Ozon: смотрите, где живут ваши клиенты и какие товары они покупают.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-green-500" /> Запуск гео-рекламы (Push)</li>
                        <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-green-500" /> Анализ цен конкурентов</li>
                    </ul>
                </Card>

            </div>
        </div>
    );
};

export default ProSubscriptionPage;