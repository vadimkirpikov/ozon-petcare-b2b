import React, { useEffect } from 'react';
import useHotelStore from '../store/useHotelStore';
import { Card } from '../components/ui/Card';
import { Camera, Thermometer, ChevronLeft, ChevronRight, Settings2 } from 'lucide-react';
import { cn } from '../components/ui/Card';

const DAYS = Array.from({ length: 15 }, (_, i) => i + 8); // 8th to 22nd

const getStatusColors = (status) => {
  switch (status) {
    case 'checked-in': return 'bg-green-100 border-green-300 text-green-800';
    case 'confirmed': return 'bg-blue-100 border-blue-300 text-blue-800';
    case 'pending': return 'bg-orange-100 border-orange-300 text-orange-800';
    default: return 'bg-gray-100 border-gray-300 text-gray-800';
  }
};

const HotelPage = () => {
  const { bookings, occupancyRate, isLoading, loadData } = useHotelStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  // group bookings by room
  const rooms = [
    { id: 'vip_1', name: 'Вольер VIP #1', hasCamera: true, hasClimate: true },
    { id: 'std_1', name: 'Стандарт #1', hasCamera: false, hasClimate: false },
    { id: 'std_2', name: 'Стандарт #2', hasCamera: false, hasClimate: false },
    { id: 'cat_1', name: 'Кошачий блок А', hasCamera: true, hasClimate: false },
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
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header & Occupancy */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Управление номерным фондом</h2>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            Загрузка номеров (Май):
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
            </div>
            <span className="font-semibold text-gray-700">{occupancyRate}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronLeft size={18} /></button>
            <div className="px-3 py-1 font-medium text-sm text-gray-800">Май 2026</div>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronRight size={18} /></button>
          </div>
          <button className="p-2 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 shadow-sm text-gray-500">
            <Settings2 size={18} />
          </button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden p-0 rounded-2xl flex flex-col">
        {/* Table Header */}
        <div className="flex border-b border-gray-200 bg-gray-50 relative z-10 flex-shrink-0">
          <div className="w-64 border-r border-gray-200 p-4 font-semibold text-sm text-gray-700 flex-shrink-0 flex items-center bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)] z-20">
            Номер / Вольер
          </div>
          <div className="flex-1 flex overflow-hidden">
            {DAYS.map(day => {
              const isWeekend = [9, 10, 16, 17].includes(day); // mock weekends
              return (
                <div key={day} className={cn(
                  "flex-1 min-w-[80px] p-2 text-center text-sm border-r border-gray-200 border-dashed",
                  isWeekend ? "bg-gray-100 text-gray-500 font-medium" : "text-gray-900 font-semibold"
                )}>
                  {day} <span className="block text-[10px] text-gray-400 font-normal">мая</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gantt Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {rooms.map(room => (
            <div key={room.id} className="flex border-b border-gray-100 h-20 group hover:bg-gray-50/50 transition-colors">
              
              {/* Left Column (Sticky conceptually) */}
              <div className="w-64 border-r border-gray-200 p-4 flex-shrink-0 flex items-center justify-between bg-white group-hover:bg-gray-50/50 transition-colors z-20 relative">
                <span className="font-medium text-sm text-gray-900">{room.name}</span>
                <div className="flex gap-1.5 text-gray-400">
                  {room.hasCamera && <Camera size={14} className="text-blue-500" />}
                  {room.hasClimate && <Thermometer size={14} className="text-orange-500" />}
                </div>
              </div>

              {/* Days Grid & Bars */}
              <div className="flex-1 flex relative">
                {/* Vertical lines */}
                {DAYS.map(day => {
                  const isWeekend = [9, 10, 16, 17].includes(day);
                  return (
                    <div key={day} className={cn(
                      "flex-1 min-w-[80px] border-r border-gray-200 border-dashed",
                      isWeekend && "bg-gray-50"
                    )} />
                  );
                })}

                {/* Render Bookings for this room, absolutely positioned based on day index */}
                {bookings.filter(b => b.roomId === room.id).map(booking => {
                  const checkInIdx = DAYS.indexOf(Number(booking.checkIn));
                  const checkOutIdx = DAYS.indexOf(Number(booking.checkOut));
                  
                  if (checkInIdx === -1 || checkOutIdx === -1) return null;

                  const leftPercent = (checkInIdx / DAYS.length) * 100;
                  const widthPercent = ((checkOutIdx - checkInIdx) / DAYS.length) * 100;

                  return (
                    <div 
                      key={booking.id}
                      className={cn(
                        "absolute top-2 bottom-2 rounded-xl border p-2 shadow-sm text-xs cursor-pointer hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-center",
                        getStatusColors(booking.status)
                      )}
                      style={{ 
                        left: `calc(${leftPercent}% + 4px)`, 
                        width: `calc(${widthPercent}% - 8px)` 
                      }}
                    >
                      <div className="font-bold truncate">{booking.petName}</div>
                      <div className="text-[10px] opacity-80 truncate">{booking.ownerPhone}</div>
                    </div>
                  );
                })}

              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HotelPage;
