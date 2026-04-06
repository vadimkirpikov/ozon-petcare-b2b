import React, { useState } from 'react';
import useScheduleStore from '../store/useScheduleStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Users, Clock } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { BillingModal } from '../components/schedule/BillingModal';

const HOURS = Array.from({ length: 13 }, (_, i) => i + 9); // 9 to 21

const SchedulePage = () => {
  const { appointments } = useScheduleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endingAppointment, setEndingAppointment] = useState(null);

  // Helper to place item in grid. 1 hour = 60px height.
  // 9:00 starts at top 0.
  const getStyleForTime = (timeStr, durationStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    const top = (h - 9) * 60 + (m / 60) * 60;
    const height = (durationStr / 60) * 60;
    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronLeft size={18} /></button>
            <div className="px-3 py-1 flex items-center gap-2 font-medium text-sm text-gray-800">
              <CalendarIcon size={16} className="text-brand-500" />
              Сегодня, 10 Мая
            </div>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronRight size={18} /></button>
          </div>
          
          <div className="bg-gray-100 p-1 rounded-xl flex text-sm font-medium">
            <button className="bg-white shadow-sm px-4 py-1.5 rounded-lg text-gray-900">День</button>
            <button className="px-4 py-1.5 rounded-lg text-gray-500 hover:text-gray-900">Неделя</button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50">
            <Users size={16} /> Все врачи
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 shadow-sm transition-colors"
          >
            <Plus size={16} /> Новая запись
          </button>
        </div>
      </div>

      {/* Grid */}
      <Card className="flex-1 overflow-auto p-0 rounded-2xl relative hide-scrollbar border-gray-200 flex flex-col">
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10 flex text-sm font-medium text-gray-500 text-center">
          <div className="w-20 border-r border-gray-200 py-3">Время</div>
          <div className="flex-1 border-r border-gray-200 py-3 bg-white text-gray-900 shadow-sm">Кабинет 1 (Терапия)</div>
          <div className="flex-1 py-3 bg-white text-gray-900 shadow-sm">Кабинет 2 (Груминг)</div>
        </div>

        <div className="flex flex-1 relative min-h-[780px]">
          {/* Time Column */}
          <div className="w-20 border-r border-gray-200 flex flex-col bg-gray-50 absolute left-0 top-0 bottom-0 z-10">
            {HOURS.map(hour => (
              <div key={hour} className="h-[60px] border-b border-gray-200 flex items-start justify-center pt-2 text-xs text-gray-500 font-medium">
                {`${hour}:00`}
              </div>
            ))}
          </div>

          {/* Doctors Columns wrapper */}
          <div className="flex-1 flex ml-20 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
              {HOURS.map(hour => (
                <div key={hour} className="h-[60px] border-b border-gray-100 border-dashed w-full" />
              ))}
            </div>

            {/* Cabinet 1 */}
            <div className="flex-1 border-r border-gray-100 relative">
              {appointments
                  .filter(a => ['1','2'].includes(a.id))
                  .map(appointment => (
                <div 
                  key={appointment.id}
                  className="absolute left-2 right-2 bg-brand-50 border border-brand-200 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:border-brand-300 transition-all cursor-pointer overflow-hidden z-20 group flex flex-col"
                  style={getStyleForTime(appointment.time, appointment.durationMinutes)}
                >
                  <div className="flex-1">
                    <div className="text-xs font-bold text-brand-900 group-hover:text-brand-700">{appointment.title}</div>
                    <div className="text-[10px] text-brand-600 mt-0.5 max-h-4 truncate">{appointment.service}</div>
                    <div className="text-[10px] text-brand-500 mt-1 flex gap-1 items-center">
                      <Clock size={10} /> {appointment.time} — {appointment.durationMinutes} мин
                    </div>
                  </div>
                  <div className="mt-auto pt-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-bottom-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEndingAppointment(appointment); }}
                      className="w-full text-center bg-brand-600 text-white text-[10px] font-bold py-1 rounded shadow-sm hover:bg-brand-700 transition"
                    >
                      Завершить прием
                    </button>
                  </div>
                  {appointment.isOzon && (
                    <div className="absolute top-2 right-2">
                       <Badge icon="ozon" variant="ozon" className="px-1.5 py-0">Ozon</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Cabinet 2 */}
            <div className="flex-1 relative">
             {appointments
                 .filter(a => ['3'].includes(a.id))
                 .map(appointment => (
               <div 
                 key={appointment.id}
                 className="absolute left-2 right-2 bg-purple-50 border border-purple-200 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer overflow-hidden z-10 group"
                 style={getStyleForTime(appointment.time, appointment.durationMinutes)}
               >
                 <div className="text-xs font-bold text-purple-900 group-hover:text-purple-700">{appointment.title}</div>
                 <div className="text-[10px] text-purple-700 mt-0.5">{appointment.service}</div>
                 <div className="text-[10px] text-purple-600 mt-1 flex gap-1 items-center">
                    <Clock size={10} /> {appointment.time} — {appointment.durationMinutes} мин
                 </div>
               </div>
             ))}
            </div>
          </div>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Новая запись"
        description="Создание визита для пациента"
      >
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Клиент / Питомец</label>
            <input type="text" placeholder="Поиск по кличке или телефону..." className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Время</label>
              <input type="time" defaultValue="14:00" className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            </div>
             <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Специалист</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none">
                <option>Кабинет 1 (Терапия)</option>
                <option>Кабинет 2 (Груминг)</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-brand-600 text-white rounded-xl py-2.5 font-medium mt-2 hover:bg-brand-700 transition-colors">
            Сохранить визит
          </button>
        </div>
      </Modal>

      <BillingModal
          isOpen={!!endingAppointment}
          onClose={() => setEndingAppointment(null)}
          appointmentInfo={endingAppointment}
      />

    </div>
  );
};

export default SchedulePage;
