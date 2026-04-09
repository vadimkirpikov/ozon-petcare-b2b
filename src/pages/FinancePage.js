import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn } from '../components/ui/Card';

const revData =[
    { name: 'Янв', 'Офлайн услуги': 40000, 'Телемедицина': 2400 },
    { name: 'Фев', 'Офлайн услуги': 30000, 'Телемедицина': 1398 },
    { name: 'Мар', 'Офлайн услуги': 20000, 'Телемедицина': 9800 },
    { name: 'Апр', 'Офлайн услуги': 27800, 'Телемедицина': 3908 },
    { name: 'Май', 'Офлайн услуги': 18900, 'Телемедицина': 4800 },
    { name: 'Июн', 'Офлайн услуги': 23900, 'Телемедицина': 3800 },
];

const pieData =[
    { name: 'Офлайн приемы', value: 85 },
    { name: 'Онлайн консультации (SOS)', value: 15 },
];
const COLORS = ['#2563eb', '#10b981'];

const transactions =[
    { id: 1, type: 'withdraw', desc: 'Еженедельный транш выплат на р/с', amount: -150000, date: '12.05.2026', status: 'Выполнено' },
    { id: 2, type: 'income', desc: 'Оплата услуг (Ozon Pay)', amount: 8400, date: '11.05.2026', status: 'Заморожено' },
    { id: 3, type: 'telemed', desc: 'Телемед: Консультация 20 мин', amount: 1450, date: '10.05.2026', status: 'Выполнено' },
];

const FinancePage = () => {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Финансы и Аналитика</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border-0 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                            <Wallet className="text-white" size={24} />
                        </div>
                        <Badge className="bg-white/10 text-white border-0 py-1">Ozon Pay В2В</Badge>
                    </div>

                    {/* Адаптировано: flex-col на мобилке, flex-row на десктопе */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Доступно к выводу на р/с</p>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">142 500,00 ₽</h3>
                        </div>
                        <button className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 sm:py-2.5 rounded-xl font-bold transition-colors text-center">
                            Вывести средства
                        </button>
                    </div>
                </Card>

                <Card className="flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-700">Выручка: Телемедицина</h4>
                        <Activity className="text-green-500" size={20} />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">14 500 ₽</div>
                        <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-1">
                            <ArrowUpRight size={16} /> +24% с прошлого месяца
                        </p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                    <h4 className="font-bold text-gray-900 mb-6 font-sans">Динамика выручки</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Bar dataKey="Офлайн услуги" stackId="a" fill="#2563eb" radius={[0, 0, 4, 4]} barSize={32} />
                                <Bar dataKey="Телемедицина" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h4 className="font-bold text-gray-900 mb-2 font-sans">Структура дохода</h4>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                            <span className="text-xl font-bold text-gray-900">100%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        {pieData.map((d, i) => (
                            <div key={d.name} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></span>
                                    <span className="text-gray-600">{d.name}</span>
                                </div>
                                <span className="font-semibold text-gray-900">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <h3 className="text-lg font-bold tracking-tight mt-2">История операций</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Адаптировано: скролл таблицы по горизонтали на мобилке */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-600">Дата</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-600">Описание</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-600">Статус</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Сумма</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {transactions.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-600">{t.date}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            t.type === 'withdraw' ? 'bg-gray-100 text-gray-600' :
                                                t.type === 'telemed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                        )}>
                                            {t.type === 'withdraw' ? <ArrowDownRight size={16} /> :
                                                t.type === 'telemed' ? <Activity size={14} /> : <ArrowUpRight size={16} />}
                                        </div>
                                        <span className="font-medium text-gray-900">{t.desc}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {t.status === 'Выполнено' ? <Badge variant="success">Выполнено</Badge> : <Badge variant="warning">Заморожено</Badge>}
                                </td>
                                <td className={cn("px-6 py-4 text-right font-bold whitespace-nowrap", t.amount > 0 ? "text-green-600" : "text-gray-900")}>
                                    {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} ₽
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinancePage;