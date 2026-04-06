import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Wallet, CheckCircle2 } from 'lucide-react';
import useProfileStore from '../../store/useProfileStore';

export const BillingModal = ({ isOpen, onClose, appointmentInfo }) => {
    const { subscription } = useProfileStore();
    const feePercent = subscription.status === 'pro' ? 5 : 15;
    const basePrice = appointmentInfo?.durationMinutes === 90 ? 2500 : 1200;
    const ozonFee = (basePrice * feePercent) / 100;
    const finalPayout = basePrice - ozonFee;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => !open && onClose()}
            title="Завершение приема"
            description={`Пациент: ${appointmentInfo?.petName || 'Неизвестно'} • ${appointmentInfo?.service || ''}`}
        >
            <div className="flex flex-col gap-6 mt-4">

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                    <label className="text-sm font-bold text-gray-900 block mb-2">Итоговая сумма чека (₽)</label>
                    <input
                        type="number"
                        defaultValue={basePrice}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-xl font-bold shadow-sm"
                    />
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Wallet size={18} className="text-brand-600" />
                        <h4 className="font-bold text-gray-900">Детализация Ozon Pay</h4>
                        {subscription.status === 'pro' && <Badge variant="ozon" icon="premium" className="ml-auto text-[10px] py-0 h-5">PRO Тариф</Badge>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Оплата от клиента</span>
                            <span className="font-medium">{basePrice} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-blue-200/50 pb-3">
                            <span className="text-gray-600">Комиссия экосистемы ({feePercent}%)</span>
                            <span className="font-medium text-red-500">- {ozonFee} ₽</span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="font-bold text-gray-900">Зачисление на р/с</span>
                            <span className="font-bold text-green-600 text-lg">{finalPayout} ₽</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all hover:shadow-lg flex justify-center items-center gap-2"
                >
                    <CheckCircle2 size={20} />
                    Выставить счет и завершить
                </button>
            </div>
        </Modal>
    );
};