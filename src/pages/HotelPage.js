import React, {useEffect} from 'react';
import useHotelStore from '../store/useHotelStore';
import useProfileStore from '../store/useProfileStore';
import {Card, cn} from '../components/ui/Card';
import {Badge} from '../components/ui/Badge';
import {ShieldCheck, Thermometer, X} from 'lucide-react';

const DAYS = Array.from({length: 15}, (_, i) => i + 8);

const getStatusColors = (status, source) => {
    if (source === 'ozon') return 'bg-ozon-50 border-ozon-300 text-ozon-900 shadow-sm';
    switch (status) {
        case 'checked-in':
            return 'bg-green-100 border-green-300 text-green-800';
        case 'pending':
            return 'bg-orange-100 border-orange-300 text-orange-800';
        default:
            return 'bg-gray-100 border-gray-300 text-gray-800';
    }
};

const HotelPage = () => {
    const {bookings, occupancyRate, isLoading, loadData, selectedBooking, setSelectedBooking} = useHotelStore();
    const {activeModules, subscription} = useProfileStore();

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (!activeModules.hotel) {
        // Upsell экран, если модуль выключен (оставили из прошлого ответа)
        return <div className="text-center p-20">Модуль отключен. Подключите в настройках.</div>;
    }

    const rooms = [
        {id: 'vip_1', name: 'Вольер VIP #1', hasClimate: true},
        {id: 'std_1', name: 'Стандарт #1', hasClimate: false},
        {id: 'std_2', name: 'Стандарт #2', hasClimate: false},
        {id: 'cat_1', name: 'Кошачий блок А', hasClimate: false},
    ];

    if (isLoading) {
        return (
            <div className="animate-pulse flex flex-col gap-4">
                <div className="h-8 w-64 bg-gray-200 rounded"></div>
                <div className="h-[600px] w-full bg-gray-200 rounded-2xl"></div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] relative overflow-hidden">

            <div
                className={cn("flex-1 flex flex-col transition-all duration-300", selectedBooking ? "pr-[400px]" : "")}>
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold tracking-tight text-gray-900">Управление номерным
                                фондом</h2>
                            {subscription.status === 'pro' &&
                                <Badge variant="ozon" icon="premium">PRO-инвентарь</Badge>}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            Загрузка (Май):
                            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full"
                                     style={{width: `${occupancyRate}%`}}></div>
                            </div>
                            <span className="font-semibold text-gray-700">{occupancyRate}%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Controls... */}
                    </div>
                </div>

                <Card className="flex-1 overflow-hidden p-0 rounded-2xl flex flex-col">
                    <div className="flex border-b border-gray-200 bg-gray-50 relative z-10 flex-shrink-0">
                        <div
                            className="w-64 border-r border-gray-200 p-4 font-semibold text-sm text-gray-700 flex-shrink-0 flex items-center bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)] z-20">
                            Номер / Вольер
                        </div>
                        <div className="flex-1 flex overflow-hidden">
                            {DAYS.map(day => (
                                <div key={day}
                                     className={cn("flex-1 min-w-[80px] p-2 text-center text-sm border-r border-gray-200 border-dashed", [9, 10, 16, 17].includes(day) ? "bg-gray-100 text-gray-500 font-medium" : "text-gray-900 font-semibold")}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
                        {rooms.map(room => (
                            <div key={room.id}
                                 className="flex border-b border-gray-100 h-20 group hover:bg-gray-50/50 transition-colors">
                                <div
                                    className="w-64 border-r border-gray-200 p-4 flex-shrink-0 flex items-center justify-between bg-white group-hover:bg-gray-50/50 transition-colors z-20 relative">
                                    <span className="font-medium text-sm text-gray-900">{room.name}</span>
                                    <div className="flex gap-1.5 text-gray-400">
                                        {/* УБРАЛИ КАМЕРУ, ОСТАВИЛИ КЛИМАТ */}
                                        {room.hasClimate && <Thermometer size={14} className="text-orange-500"
                                                                         title="Климат-контроль"/>}
                                    </div>
                                </div>

                                <div className="flex-1 flex relative">
                                    {DAYS.map(day => <div key={day}
                                                          className={cn("flex-1 min-w-[80px] border-r border-gray-200 border-dashed", [9, 10, 16, 17].includes(day) && "bg-gray-50")}/>)}
                                    {bookings.filter(b => b.roomId === room.id).map(booking => {
                                        const checkInIdx = DAYS.indexOf(Number(booking.checkIn));
                                        const checkOutIdx = DAYS.indexOf(Number(booking.checkOut));
                                        if (checkInIdx === -1 || checkOutIdx === -1) return null;
                                        const leftPercent = (checkInIdx / DAYS.length) * 100;
                                        const widthPercent = ((checkOutIdx - checkInIdx) / DAYS.length) * 100;

                                        return (
                                            <div key={booking.id} onClick={() => setSelectedBooking(booking)}
                                                 className={cn("absolute top-2 bottom-2 rounded-xl border p-2 shadow-sm text-xs cursor-pointer hover:shadow-md transition-all overflow-hidden flex flex-col justify-center", getStatusColors(booking.status, booking.source))}
                                                 style={{
                                                     left: `calc(${leftPercent}% + 4px)`,
                                                     width: `calc(${widthPercent}% - 8px)`
                                                 }}>
                                                <div className="flex items-center gap-1">
                                                    {booking.source === 'ozon' &&
                                                        <ShieldCheck size={12} className="text-ozon-600"/>}
                                                    <span className="font-bold truncate">{booking.petName}</span>
                                                </div>
                                                <div className="text-[10px] opacity-80 truncate mt-0.5">Ozon Pay</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Drawer */}
            <div
                className={cn("absolute top-0 right-0 bottom-0 w-[400px] bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 flex flex-col z-20", selectedBooking ? "translate-x-0" : "translate-x-full")}>
                {selectedBooking && (
                    <>
                        <div
                            className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <span className="font-bold text-gray-900">Бронирование</span>
                            <button onClick={() => setSelectedBooking(null)}
                                    className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500"><X size={18}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedBooking.petName}</h2>
                                <div className="mt-3">
                                    {selectedBooking.source === 'ozon' ?
                                        <Badge icon="ozon" variant="ozon">Сделка Ozon Pay</Badge> :
                                        <Badge variant="default">Создано вручную</Badge>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase">Финансы (Удержания Ozon)</h3>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Сумма чека:</span>
                                        <span
                                            className="font-bold text-gray-900">{selectedBooking.financials.total} ₽</span>
                                    </div>
                                    <div
                                        className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                                        <span className="text-gray-600">Комиссия экосистемы:</span>
                                        <span
                                            className="font-bold text-red-600">- {selectedBooking.financials.ozonFee} ₽</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pt-1">
                                        <span className="text-gray-900 font-bold">К выплате:</span>
                                        <span
                                            className="font-bold text-green-600 text-lg">{selectedBooking.financials.total - selectedBooking.financials.ozonFee} ₽</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HotelPage;