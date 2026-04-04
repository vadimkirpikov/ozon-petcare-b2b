import React from 'react';
import useGigStore from '../store/useGigStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Navigation, Map as MapIcon } from 'lucide-react';
import { cn } from '../components/ui/Card';

const GigsPage = () => {
  const { gigs, isOnline, toggleOnline } = useGigStore();

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      
      {/* Left panel: List */}
      <div className="w-[40%] flex flex-col pt-2 min-w-[320px]">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Радар заявок</h2>
            <p className="text-sm text-gray-500 mt-1">Доступно рядом: {gigs.length}</p>
          </div>
          
          <button 
            onClick={toggleOnline}
            className={cn(
              "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2",
              isOnline ? "bg-green-500 ring-green-100" : "bg-gray-200 ring-transparent"
            )}
          >
            <span className={cn(
              "inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm",
              isOnline ? "translate-x-7" : "translate-x-1"
            )} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar flex flex-col gap-3">
          {gigs.map(gig => (
            <Card key={gig.id} className="p-4 hover:border-brand-300 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {gig.title}
                </div>
                {gig.urgency === 'sos' && <Badge variant="destructive" className="animate-pulse">СОС-вызов</Badge>}
                {gig.urgency === 'high' && <Badge variant="warning">Срочно</Badge>}
                {gig.urgency === 'medium' && <Badge variant="default">{gig.deadline}</Badge>}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                  {gig.petSnapshot.avatarUrl}
                </div>
                <div>
                   <p className="text-sm font-medium text-gray-800">{gig.petSnapshot.name}</p>
                   <p className="text-xs text-gray-500">{gig.petSnapshot.breed}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{gig.description}</p>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold text-gray-900">{gig.reward} ₽</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Navigation size={12} className="text-brand-500" />
                    {gig.distancePx} м
                  </div>
                </div>
                
                <button className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
                  Взять в работу
                </button>
              </div>
            </Card>
          ))}
          {gigs.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              <MapIcon size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Рядом пока нет заявок</p>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Map Mock */}
      <Card className="flex-1 overflow-hidden p-0 rounded-2xl relative bg-blue-50 border-blue-100 flex items-center justify-center">
        {/* Fake Map Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent bg-[length:20px_20px]"></div>
        
        {isOnline && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/10 rounded-full animate-ping"></div>
        )}
        
        <div className="z-10 group relative flex flex-col items-center">
          <div className={cn(
            "w-12 h-12 bg-white rounded-full shadow-lg border-4 flex items-center justify-center transition-all z-20",
            isOnline ? "border-green-500 shadow-green-500/20" : "border-gray-300"
          )}>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xl">👩</div>
          </div>
          <div className="absolute top-full mt-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Вы здесь
          </div>
        </div>

        {/* Pinned mock gigs */}
        {gigs.map((gig, idx) => {
          if(idx > 3) return null;
          // Random looking positions for demo
          const positions = [
            { top: '25%', left: '30%' },
            { top: '60%', right: '20%' },
            { bottom: '20%', left: '40%' },
            { top: '40%', right: '40%' },
          ];
          const pos = positions[idx];
          return (
            <div key={`pin-${gig.id}`} className="absolute z-10" style={pos}>
               <div className="w-8 h-8 bg-white rounded-full shadow-md border-2 border-brand-500 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-sm">{gig.petSnapshot.avatarUrl}</span>
                  <div className="absolute left-full ml-2 w-max bg-white rounded-lg p-2 shadow-lg border border-gray-100 hidden group-hover:block z-30 pointer-events-none">
                    <p className="font-bold text-xs">{gig.reward} ₽</p>
                    <p className="text-[10px] text-gray-500">{gig.title}</p>
                  </div>
               </div>
            </div>
          )
        })}

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-gray-100">
           <p className="text-xs font-semibold text-gray-700 block mb-1">Статус сканирования</p>
           <p className="text-[10px] text-gray-500 flex items-center gap-1">
             <span className={cn("inline-block w-2 h-2 rounded-full", isOnline ? "bg-green-500" : "bg-gray-300")}></span>
             {isOnline ? "Вы на линии. Ищем заявки..." : "Офлайн"}
           </p>
        </div>
      </Card>

    </div>
  );
};

export default GigsPage;
