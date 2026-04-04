import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, Users, MapPin, Star, AlertCircle, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import useDashboardStore from '../store/useDashboardStore';

const DashboardPage = () => {
  const { metrics, upcomingAppointment, alerts, isLoading, loadData } = useDashboardStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="h-28 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
          Доброе утро, Елена 👋
        </h2>
        <p className="text-gray-500 text-sm">
          У вас <span className="font-semibold text-gray-700">2 новые записи</span> и <span className="font-semibold text-red-600">1 экстренный вызов</span>.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Выручка за день</span>
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.revenue.toLocaleString()} ₽</div>
            <div className="text-xs font-medium text-green-600 bg-green-50 inline-block px-1.5 py-0.5 rounded">+12% к прошлой неделе</div>
          </div>
        </Card>
        
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Записи сегодня</span>
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <Users size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.appointmentsToday}</div>
            <div className="text-xs font-medium text-gray-500">8 из 10 слотов занято</div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Биржа заявок</span>
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <MapPin size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.activeGigs}</div>
            <div className="text-xs font-medium text-gray-500">Доступно рядом с вами</div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between border-ozon-100 bg-gradient-to-br from-white to-ozon-50/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Рейтинг Ozon</span>
            <div className="w-8 h-8 rounded-full bg-ozon-100 flex items-center justify-center text-ozon-600">
              <Star size={16} fill="currentColor" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.rating} <span className="text-sm text-gray-400">/ 5.0</span></div>
            <Badge icon="premium" variant="ozon" className="mt-1">Premium Partner</Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Live Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-tight">Сейчас на приеме</h3>
          {upcomingAppointment && (
            <div className="bg-white border-l-4 border-brand-500 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-10 opacity-50"></div>
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{upcomingAppointment.avatar}</div>
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-gray-900">
                      {upcomingAppointment.petName} <span className="text-base font-normal text-gray-500">· {upcomingAppointment.petBreed}</span>
                    </h4>
                    <p className="text-sm font-medium text-brand-600 mt-0.5">{upcomingAppointment.service}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <Clock size={14} />
                      {upcomingAppointment.time}
                      <span className="mx-1">•</span>
                      Владелец: {upcomingAppointment.ownerName}
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Открыть медкарту <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Center - Alerts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-tight">Action Center</h3>
          
          <div className="flex flex-col gap-3">
            {alerts.map(alert => (
              <Card key={alert.id} className="p-4 flex gap-3 items-start cursor-pointer hover:border-blue-200">
                {alert.type === 'warning' ? (
                  <AlertCircle className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                ) : (
                  <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-snug">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
