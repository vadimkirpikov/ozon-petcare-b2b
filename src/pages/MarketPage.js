import React, { useState } from 'react';
import useMarketStore from '../store/useMarketStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ShieldCheck, UploadCloud, Search } from 'lucide-react';

const COLUMNS =[
    { id: 'new', title: 'Новые отклики', color: 'bg-blue-50/50' },
    { id: 'interview', title: 'Собеседование', color: 'bg-yellow-50/50' },
    { id: 'reserved', title: 'Забронирован (Аванс)', color: 'bg-purple-50/50' },
];

const KanbanItem = ({ listing, dragOverlay }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: listing.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white p-3 rounded-xl border border-gray-100 shadow-sm mb-3 cursor-grab hover:border-brand-300 transition-colors ${dragOverlay ? 'shadow-xl scale-105' : ''}`}
        >
            <div className="flex gap-3 items-center">
                <div className="text-3xl bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    {listing.avatarUrl}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{listing.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{listing.breed}</p>
                    <div className="mt-1">
                        <Badge variant="outline" className="px-1.5 py-0 text-[10px] bg-gray-50">Лид: Мария В.</Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MarketPage = () => {
    const { listings, moveListing } = useMarketStore();
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragStart = (event) => setActiveId(event.active.id);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) { setActiveId(null); return; }

        const activeItem = listings.find(l => l.id === active.id);
        const overId = over.id;
        if (COLUMNS.find(c => c.id === overId)) {
            if(activeItem && activeItem.status !== overId) moveListing(active.id, overId);
        } else {
            const overItem = listings.find(l => l.id === overId);
            if(activeItem && overItem && activeItem.status !== overItem.status) {
                moveListing(active.id, overItem.status);
            }
        }
        setActiveId(null);
    };

    const activeItem = listings.find(l => l.id === activeId);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">

            {/* Адаптировано: на мобилке элементы встают друг под друга */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 flex-shrink-0 gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">Пристройство питомцев</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Поиск анкеты..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white" />
                    </div>
                    <button className="bg-brand-600 text-white px-4 py-2 text-sm font-medium rounded-xl hover:bg-brand-700 whitespace-nowrap text-center">
                        Добавить помет
                    </button>
                </div>
            </div>

            {/* Адаптировано: колонки на десктопе, блоки друг под другом на мобилке */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 flex-shrink-0">
                <Card className="flex-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gradient-to-r from-blue-50 to-white hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">KYC Верификация питомника</h3>
                        <p className="text-xs text-gray-500">Загрузите метрику РКФ для получения бейджа "Проверенный Заводчик Ozon".</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <Badge variant="warning">Ожидает сканов</Badge>
                    </div>
                </Card>

                <Card className="w-full md:w-64 flex flex-row md:flex-col justify-center items-center gap-3 border-dashed border-2 hover:bg-gray-50 cursor-pointer transition-colors text-center py-6 md:py-0">
                    <UploadCloud size={24} className="text-gray-400 md:mb-2" />
                    <span className="text-sm font-medium text-gray-600">Загрузить документы</span>
                </Card>
            </div>

            <h3 className="text-lg font-semibold tracking-tight mb-4">Воронка продаж</h3>

            {/* Адаптировано: четкий скролл Kanban-доски вправо */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden hide-scrollbar">
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="flex gap-4 h-full w-max pb-4 px-1">

                        {COLUMNS.map(col => {
                            const columnListings = listings.filter(l => l.status === col.id);
                            return (
                                <div key={col.id} className={`w-[280px] sm:w-80 rounded-2xl flex flex-col pt-3 pb-2 flex-shrink-0 ${col.color} border border-gray-100/50`}>
                                    <div className="px-4 mb-3 flex items-center justify-between">
                                        <span className="font-semibold text-gray-800 text-sm">{col.title}</span>
                                        <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-gray-500 shadow-sm border border-gray-100">{columnListings.length}</span>
                                    </div>
                                    <div className="flex-1 px-2.5 overflow-y-auto hide-scrollbar">
                                        <SortableContext items={columnListings.map(l => l.id)}>
                                            {columnListings.map(listing => <KanbanItem key={listing.id} listing={listing} />)}
                                        </SortableContext>
                                        <div id={col.id} className="h-20 w-full mb-2 border-2 border-transparent" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <DragOverlay>{activeItem ? <KanbanItem listing={activeItem} dragOverlay /> : null}</DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default MarketPage;