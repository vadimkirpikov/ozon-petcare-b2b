import React from 'react';
import useClientStore from '../store/useClientStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, X, Clock, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '../components/ui/Card';

const ClientsPage = () => {
  const { clients, searchQuery, selectedClient, setSearchQuery, setSelectedClient } = useClientStore();

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery) ||
    c.petName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] relative overflow-hidden">
      
      {/* Main Content (Table) */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        selectedClient ? "pr-[400px]" : ""
      )}>
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">База клиентов</h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Поиск по телефону или питомцу..." 
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
                 className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white w-72 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans" 
               />
             </div>
          </div>
        </div>

        <Card className="flex-1 overflow-hidden p-0 rounded-2xl flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <tr>
                <th className="px-6 py-4">Клиент / Телефон</th>
                <th className="px-6 py-4">Питомец</th>
                <th className="px-6 py-4">Последний визит</th>
                <th className="px-6 py-4 text-right">Выручка</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 overflow-y-auto">
              {filtered.map(client => (
                <tr 
                  key={client.id} 
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-brand-50/30 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{client.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                        {client.petBreed.includes('Кот') || client.petBreed.includes('Мейн') ? '🐈' : '🐶'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                          {client.petName} {client.isPremium && <Badge icon="premium" variant="ozon" className="ml-1 scale-75 origin-left">Ozon</Badge>}
                        </div>
                        <div className="text-xs text-gray-500">{client.petBreed} • {client.age}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client.lastVisit}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-gray-900">{client.ltv.toLocaleString()} ₽</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={4} className="text-center py-10 text-gray-500">
                     Пациенты не найдены
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Drawer */}
      <div className={cn(
        "absolute top-0 right-0 bottom-0 w-[400px] bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col z-20",
        selectedClient ? "translate-x-0" : "translate-x-full"
      )}>
        {selectedClient && (
          <>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="font-bold text-gray-900">Pet ID Card</span>
              <button 
                onClick={() => setSelectedClient(null)}
                className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
               
               {/* Header Info */}
               <div className="flex flex-col items-center text-center mb-6">
                 <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-5xl mb-3 shadow-sm border border-gray-200">
                   {selectedClient.petBreed.includes('Кот') || selectedClient.petBreed.includes('Мейн') ? '🐈' : '🐶'}
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900">{selectedClient.petName}</h2>
                 <p className="text-sm text-gray-500 mt-1">{selectedClient.petBreed} • {selectedClient.age}</p>
                 {selectedClient.isPremium && (
                   <span className="text-xs font-semibold text-ozon-600 bg-ozon-50 px-2 py-0.5 rounded-full mt-2">Клиент из Ozon SuperApp</span>
                 )}
               </div>

               {/* Alerts */}
               {selectedClient.allergies.length > 0 && (
                 <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex gap-3 text-red-700">
                   <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
                   <div>
                     <p className="font-semibold text-sm mb-1">Опасные аллергии!</p>
                     <p className="text-sm">{selectedClient.allergies.join(', ')}</p>
                   </div>
                 </div>
               )}

               {/* Owner Info */}
               <div className="mb-6">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Владелец</h3>
                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                   <p className="font-semibold text-gray-900">{selectedClient.name}</p>
                   <p className="text-sm text-gray-600 mt-1">{selectedClient.phone}</p>
                 </div>
               </div>

               {/* Tabs placeholder effect */}
               <div className="border-b border-gray-200 flex gap-6 mb-4">
                 <div className="pb-3 border-b-2 border-brand-600 font-semibold text-sm text-brand-700">История визитов</div>
                 <div className="pb-3 font-semibold text-sm text-gray-500 hover:text-gray-700 cursor-pointer">Файлы (2)</div>
               </div>

               {/* Timeline */}
               <div className="flex flex-col gap-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent pt-2">
                 <div className="relative flex items-start w-full">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 border border-brand-200 text-brand-600 z-10 shrink-0">
                      <Clock size={12} />
                    </div>
                    <div className="ml-4 w-full">
                      <h4 className="text-sm font-bold text-gray-900">Осмотр и Вакцинация</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{selectedClient.lastVisit}</p>
                    </div>
                 </div>
                 <div className="relative flex items-start w-full opacity-60">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-gray-500 z-10 shrink-0">
                      <Clock size={12} />
                    </div>
                    <div className="ml-4 w-full">
                      <h4 className="text-sm font-bold text-gray-900">Первичный прием</h4>
                      <p className="text-xs text-gray-500 mt-0.5">20.01.2025</p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white">
              <button className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                <FileText size={16} />
                Добавить заключение
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default ClientsPage;
