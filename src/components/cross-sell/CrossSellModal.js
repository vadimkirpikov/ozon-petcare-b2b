import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Search, Sparkles, Check, ChevronRight } from 'lucide-react';
import { cn } from '../ui/Card';

const mockProducts = [
  { id: 1, name: 'Фурминатор для собак (Large)', price: 1250, commission: 85, img: '🪮' },
  { id: 2, name: 'Успокаивающие капли "Анти-Стресс"', price: 450, commission: 45, img: '💧' },
  { id: 3, name: 'Лососевое масло (Омега-3)', price: 890, commission: 60, img: '🐟' },
];

export const CrossSellModal = ({ isOpen, onClose, appointmentInfo }) => {
  const [recommendedId, setRecommendedId] = useState(null);

  const handleRecommend = (id) => {
    setRecommendedId(id);
    // Simulate push to B2C app
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="Оформить визит"
      description={`Пациент: ${appointmentInfo?.petName || 'Неизвестно'} • Услуга: ${appointmentInfo?.service || ''}`}
    >
      <div className="flex flex-col gap-5 mt-2">
        
        {/* Payment Input */}
        <div>
           <label className="text-sm font-medium text-gray-700 block mb-1">Сумма за услуги (₽)</label>
           <input 
             type="number" 
             defaultValue={appointmentInfo?.durationMinutes === 90 ? '2500' : '1200'}
             className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-lg font-bold" 
           />
        </div>

        {/* Ozon Recommendations Module */}
        <div className="bg-gradient-to-b from-ozon-50/50 to-white border border-ozon-100 rounded-2xl p-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-ozon-100 rounded-bl-full opacity-30 -z-10"></div>
           
           <div className="flex items-center gap-2 mb-3">
             <Sparkles size={18} className="text-ozon-500" />
             <h4 className="font-bold text-gray-900 tracking-tight">Умные рекомендации Ozon</h4>
             <Badge variant="ozon" className="ml-auto text-[10px] py-0 px-2 h-5">Доп. доход</Badge>
           </div>
           
           <p className="text-xs text-gray-600 mb-3">
             На основе диагноза алгоритм подобрал сопутствующие товары. Клиент получит Push и скидку в приложении.
           </p>

           <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Поиск по 1.5 млн+ товаров..." className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white" />
           </div>

           <div className="flex flex-col gap-2">
             {mockProducts.map(product => {
               const isRecomended = recommendedId === product.id;
               return (
                 <div key={product.id} className={cn(
                   "flex items-center gap-3 p-2 rounded-xl transition-all border",
                   isRecomended ? "bg-green-50 border-green-200" : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                 )}>
                   <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{product.img}</div>
                   <div className="flex-1 min-w-0">
                     <h5 className="text-xs font-bold text-gray-900 truncate">{product.name}</h5>
                     <div className="flex items-center gap-2 mt-0.5">
                       <span className="text-xs font-semibold text-gray-700">{product.price} ₽</span>
                       <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                         + {product.commission} ₽ вам
                       </span>
                     </div>
                   </div>
                   {isRecomended ? (
                     <div className="text-green-600 px-2 flex items-center gap-1 text-xs font-bold">
                       <Check size={14} /> Отправлено
                     </div>
                   ) : (
                     <button 
                       onClick={() => handleRecommend(product.id)}
                       className="px-3 py-1.5 bg-ozon-50 text-ozon-700 text-xs font-bold rounded-lg hover:bg-ozon-100 transition-colors"
                     >
                       Рекомендовать
                     </button>
                   )}
                 </div>
               )
             })}
           </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors flex justify-center items-center gap-2"
        >
          Завершить прием <ChevronRight size={18} />
        </button>

      </div>
    </Modal>
  );
};
