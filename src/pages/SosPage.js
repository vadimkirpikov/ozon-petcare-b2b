import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PhoneCall, Mic, MicOff, Video, VideoOff, PhoneOff, Send, MessageSquareHeart } from 'lucide-react';
import { cn } from '../components/ui/Card';

const SosPage = () => {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // simulate call arriving
  const toggleDuty = () => {
    const newState = !isOnDuty;
    setIsOnDuty(newState);
    if(newState && !inCall) {
        setTimeout(() => setInCall(true), 2000);
    } else {
        setInCall(false);
    }
  };

  const endCall = () => {
    setInCall(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Status Bar Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Экстренный хаб и Телемед</h2>
          <p className="text-sm text-gray-500 mt-0.5">Дежурный врач: Елена В.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={cn("text-sm font-semibold", isOnDuty ? "text-green-600" : "text-gray-500")}>
            {isOnDuty ? "Дежурство активно" : "Дежурство отключено"}
          </span>
          <button 
            onClick={toggleDuty}
            className={cn(
              "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2",
              isOnDuty ? "bg-green-500 ring-green-100" : "bg-gray-200 ring-transparent"
            )}
          >
            <span className={cn(
              "inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm",
              isOnDuty ? "translate-x-7" : "translate-x-1"
            )} />
          </button>
        </div>
      </div>

      {!isOnDuty && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
           <PhoneCall size={64} className="text-gray-300 mb-4" />
           <h3 className="text-lg font-bold text-gray-700">Ожидание вызовов</h3>
           <p className="text-sm text-gray-500 text-center max-w-sm mt-2">
             Включите ползунок "Дежурство активно", чтобы начать принимать экстренные видео-звонки из Ozon SuperApp.
           </p>
        </div>
      )}

      {isOnDuty && !inCall && (
        <div className="flex-1 flex flex-col items-center justify-center bg-green-50/30 rounded-2xl border-2 border-dashed border-green-200">
           <div className="relative">
             <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
             <div className="relative w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                <PhoneCall size={32} />
             </div>
           </div>
           <h3 className="text-lg font-bold text-gray-800 mt-6">Вы на линии</h3>
           <p className="text-sm text-gray-500 mt-1">Ожидаем соединение...</p>
        </div>
      )}

      {isOnDuty && inCall && (
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Video Mock */}
          <div className="flex-1 bg-gray-900 rounded-2xl relative overflow-hidden flex flex-col">
             <div className="absolute top-4 left-4 z-10 flex gap-2">
               <Badge variant="destructive" className="animate-pulse px-3">🔴 LIVE SOS</Badge>
               <span className="bg-black/50 backdrop-blur-md text-white text-xs font-mono px-2 py-1 rounded-lg">00:03:45</span>
             </div>

             <div className="flex-1 flex items-center justify-center">
               {camOn ? (
                 <div className="text-center">
                   <div className="w-32 h-32 rounded-full border-4 border-gray-700 border-dashed mx-auto mb-4 flex items-center justify-center text-4xl bg-gray-800">
                      🐶
                   </div>
                   <p className="text-gray-400 font-medium">Ожидание видео от клиента (Степан)</p>
                 </div>
               ) : (
                 <VideoOff size={48} className="text-gray-700" />
               )}
             </div>

             {/* WebRTC Controls */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-lg px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl border border-gray-700">
               <button 
                 onClick={() => setMicOn(!micOn)}
                 className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-colors", micOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500 text-white")}
               >
                 {micOn ? <Mic size={20} /> : <MicOff size={20} />}
               </button>
               <button 
                 onClick={() => setCamOn(!camOn)}
                 className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-colors", camOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500 text-white")}
               >
                 {camOn ? <Video size={20} /> : <VideoOff size={20} />}
               </button>
               <button 
                 onClick={endCall}
                 className="w-16 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors ml-2"
               >
                 <PhoneOff size={20} />
               </button>
             </div>
          </div>

          {/* Right Info Panel */}
          <Card className="w-80 flex flex-col p-4 bg-white overflow-y-auto hide-scrollbar">
             <div className="text-center mb-6">
               <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-3xl mb-2">🐶</div>
               <h3 className="font-bold text-gray-900 text-lg">Барни</h3>
               <p className="text-xs text-gray-500">Золотистый ретривер • 3 мес.</p>
             </div>

             <div className="bg-red-50 text-red-700 p-3 rounded-xl mb-6 text-sm">
                <span className="font-bold block mb-1">🆘 Причина вызова:</span>
                Щенок проглотил кусок пластиковой игрушки 10 минут назад.
             </div>

             <h4 className="font-bold text-gray-900 text-sm mb-3">Быстрые рекомендации</h4>
             <div className="flex flex-col gap-2">
                <button className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm text-left transition-colors group">
                  <span className="font-medium text-gray-700 group-hover:text-brand-600">Наблюдение за ЖКТ</span>
                  <Send size={14} className="text-gray-400 group-hover:text-brand-500" />
                </button>
                <button className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm text-left transition-colors group">
                  <span className="font-medium text-gray-700 group-hover:text-brand-600">Как вызвать рвоту</span>
                  <Send size={14} className="text-gray-400 group-hover:text-brand-500" />
                </button>
                <button className="flex items-center justify-between p-3 bg-brand-50 border border-brand-100 rounded-xl hover:bg-brand-100 text-sm text-left transition-colors group mt-2">
                  <span className="font-bold text-brand-700 flex items-center gap-2"><MessageSquareHeart size={16} /> Направить в клинику</span>
                </button>
             </div>
          </Card>
        </div>
      )}

    </div>
  );
};

export default SosPage;
