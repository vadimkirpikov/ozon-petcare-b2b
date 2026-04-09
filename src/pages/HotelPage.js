import React, { useEffect } from 'react';
import useHotelStore from '../store/useHotelStore';
import useProfileStore from '../store/useProfileStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Thermometer, ChevronLeft, ChevronRight, ShieldCheck, X, Building2 } from 'lucide-react';
import { cn } from '../components/ui/Card';

const DAYS = Array.from({ length: 15 }, (_, i) => i + 8);

const getStatusColors = (status, source) => {
    if (source === 'ozon') return 'bg-ozon-50 border-ozon-300 text-ozon-900 shadow-sm';
    switch (status) {
        case 'checked-in': return 'bg-green-100 border-green-300 text-green-800';
        case 'pending': return 'bg-orange-100 border-orange-300 text-orange-800';
        default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
};

const HotelPage = () => {
    const { bookings, occupancyRate, isLoading, loadData, selectedBooking, setSelectedBooking } = useHotelStore();
    const { activeModules } = useProfileStore();

    useEffect(() => { loadData(); }, [loadData]);

    if (!activeModules.hotel) {
        return (
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4">
                <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6"><Building2 size={40} /></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Модуль отключен</h2>
                <p className="text-gray-500 text-sm">Подключите в настройках профиля.</p>
            </div>
        );
    }

    const rooms =[
        { id: 'vip_1', name: 'VIP #1', hasClimate: true },
        { id: 'std_1', name: 'Стандарт 1', hasClimate: false },
        { id: 'std_2', name: 'Стандарт 2', hasClimate: false },
    ];

    if (isLoading) return <div className="animate-pulse flex flex-col gap-4 p-4"><div className="h-8 w-64 bg-gray-200 rounded"></div><div className="h-[400px] w-full bg-gray-200 rounded-2xl"></div></div>;

    return (
        <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] relative overflow-hidden">
            {selectedBooking && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSelectedBooking(null)} />}
            <div className={cn("flex-1 flex flex-col transition-all duration-300 w-full", selectedBooking ? "md:pr-[400px]" : "")}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 flex-shrink-0 gap-3">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">Номерной фонд</h2>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            Загрузка:
                            <div className="w-24 sm:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
                            </div>
                            <span className="font-semibold text-gray-700">{occupancyRate}%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-max">
                        <button className="p-1 sm:p-1.5 hover:bg-gray-50 rounded-lg"><ChevronLeft size={16} /></button>
                        <div className="px-2 sm:px-3 py-1 font-medium text-xs sm:text-sm text-gray-800">Май 2026</div>
                        <button className="p-1 sm:p-1.5 hover:bg-gray-50 rounded-lg"><ChevronRight size={16} /></button>
                    </div>
                </div>

                <Card className="flex-1 overflow-hidden p-0 rounded-2xl flex flex-col">
                    <div className="flex-1 overflow-auto flex flex-col relative hide-scrollbar">
                        <div className="flex border-b border-gray-200 bg-gray-50 w-max min-w-full sticky top-0 z-20">
                            <div className="w-28 sm:w-48 border-r border-gray-200 p-2 sm:p-4 font-semibold text-xs sm:text-sm text-gray-700 sticky left-0 bg-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-30 flex items-center">
                                Номер
                            </div>
                            <div className="flex flex-1">
                                {DAYS.map(day => (
                                    <div key={day} className={cn("w-12 sm:w-20 p-1 sm:p-2 text-center text-xs sm:text-sm border-r border-gray-200 border-dashed shrink-0",[9, 10, 16, 17].includes(day) ? "bg-gray-100 text-gray-500" : "text-gray-900 font-semibold")}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col w-max min-w-full">
                            {rooms.map(room => (
                                <div key={room.id} className="flex border-b border-gray-100 h-16 sm:h-20 group hover:bg-gray-50/50">
                                    <div className="w-28 sm:w-48 border-r border-gray-200 p-2 sm:p-4 sticky left-0 bg-white group-hover:bg-gray-50/50 z-20 flex flex-col justify-center shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                        <span className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-1">{room.name}</span>
                                        {room.hasClimate && <Thermometer size={12} className="text-orange-500 mt-1" />}
                                    </div>
                                    <div className="flex flex-1 relative">
                                        {DAYS.map(day => <div key={day} className={cn("w-12 sm:w-20 border-r border-gray-200 border-dashed shrink-0",[9, 10, 16, 17].includes(day) && "bg-gray-50")} />)}
                                        {bookings.filter(b => b.roomId === room.id).map(booking => {
                                            const checkInIdx = DAYS.indexOf(Number(booking.checkIn));
                                            const checkOutIdx = DAYS.indexOf(Number(booking.checkOut));
                                            if (checkInIdx === -1 || checkOutIdx === -1) return null;
                                            const leftPercent = (checkInIdx / DAYS.length) * 100;
                                            const widthPercent = ((checkOutIdx - checkInIdx) / DAYS.length) * 100;

                                            return (
                                                <div key={booking.id} onClick={() => setSelectedBooking(booking)} className={cn("absolute top-1 sm:top-2 bottom-1 sm:bottom-2 rounded-lg sm:rounded-xl border p-1 sm:p-2 shadow-sm text-[10px] sm:text-xs cursor-pointer overflow-hidden flex flex-col justify-center", getStatusColors(booking.status, booking.source))} style={{ left: `calc(${leftPercent}% + 2px)`, width: `calc(${widthPercent}% - 4px)` }}>
                                                    <div className="flex items-center gap-1">
                                                        {booking.source === 'ozon' && <ShieldCheck size={10} className="text-ozon-600 hidden sm:block" />}
                                                        <span className="font-bold truncate">{booking.petName}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            <div className={cn("fixed md:absolute top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 flex flex-col z-40 md:z-20", selectedBooking ? "translate-x-0" : "translate-x-full")}>
                {selectedBooking && (
                    <>
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <span className="font-bold text-gray-900 text-sm">Бронирование</span>
                            <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-200 rounded-lg text-gray-500"><X size={18} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedBooking.petName}</h2>
                                <div className="mt-2">
                                    {selectedBooking.source === 'ozon' ? <Badge icon="ozon" variant="ozon">Ozon Pay</Badge> : <Badge variant="default">Прямая бронь</Badge>}
                                </div>
                            </div>

                            {selectedBooking.source === 'ozon' && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
                                    <h3 className="text-xs font-bold text-gray-900 uppercase">Финансы</h3>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Сумма:</span>
                                        <span className="font-bold text-gray-900">{selectedBooking.financials.total} ₽</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                                        <span className="text-gray-600">Комиссия экосистемы:</span>
                                        <span className="font-bold text-red-600">- {selectedBooking.financials.ozonFee} ₽</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-gray-900 font-bold text-sm">К выплате:</span>
                                        <span className="font-bold text-green-600 text-lg">{selectedBooking.financials.total - selectedBooking.financials.ozonFee} ₽</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HotelPage;