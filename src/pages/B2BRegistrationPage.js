import React, {useState} from 'react';
import {Card} from '../components/ui/Card';
import {FileSignature, ShieldCheck, Wallet} from 'lucide-react';

const defaultForm = {
    companyName: '', inn: '', ogrn: '', contactName: '', email: '', phone: '', city: '',
    acceptOferta: false, acceptEscrow: false, acceptEdo: false
};

const B2BRegistrationPage = () => {
    const [form, setForm] = useState(defaultForm);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0">
                <h2 className="text-2xl font-bold tracking-tight">Подключение партнера Ozon PetCare</h2>
                <p className="mt-2 text-sm text-gray-400 max-w-2xl">
                    Получите доступ к аудитории Ozon, легальному эквайрингу с защитой от незаездов и электронному
                    документообороту.
                </p>
            </Card>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <Card className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Данные юридического лица</h3>
                        <input name="companyName" value={form.companyName} onChange={onChange} required
                               placeholder="Название компании (ООО / ИП)"
                               className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="inn" value={form.inn} onChange={onChange} required placeholder="ИНН"
                                   className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                            <input name="ogrn" value={form.ogrn} onChange={onChange} placeholder="ОГРН / ОГРНИП"
                                   className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                        </div>
                        <input name="city" value={form.city} onChange={onChange} required
                               placeholder="Фактический адрес объекта"
                               className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                    </Card>

                    <Card className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Контактное лицо</h3>
                        <input name="contactName" value={form.contactName} onChange={onChange} required
                               placeholder="ФИО руководителя"
                               className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                        <input name="phone" value={form.phone} onChange={onChange} required
                               placeholder="Мобильный телефон"
                               className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                        <input name="email" type="email" value={form.email} onChange={onChange} required
                               placeholder="Рабочий email"
                               className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"/>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="space-y-5 border-brand-200 bg-brand-50/30">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <ShieldCheck className="text-brand-600"/> Юридические соглашения
                        </h3>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="flex items-center h-5 mt-0.5">
                                <input type="checkbox" name="acceptOferta" checked={form.acceptOferta}
                                       onChange={onChange} required
                                       className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"/>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 group-hover:text-brand-700 transition-colors">Договор
                                    оферты и размещение на витрине Ozon</p>
                                <p className="text-xs text-gray-500 mt-0.5">Я соглашаюсь с правилами ранжирования и
                                    комиссией платформы (от 5% до 15% за успешный заказ).</p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="flex items-center h-5 mt-0.5">
                                <input type="checkbox" name="acceptEscrow" checked={form.acceptEscrow}
                                       onChange={onChange} required
                                       className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"/>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 group-hover:text-brand-700 flex items-center gap-1.5 transition-colors">
                                    <Wallet size={14} className="text-ozon-600"/> Подключить безопасную сделку Ozon Pay
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">Холдирование средств клиента при
                                    бронировании. Гарантия выплаты штрафа гостинице при отмене менее чем за 24 часа
                                    (No-show protection).</p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="flex items-center h-5 mt-0.5">
                                <input type="checkbox" name="acceptEdo" checked={form.acceptEdo} onChange={onChange}
                                       required
                                       className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"/>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 group-hover:text-brand-700 flex items-center gap-1.5 transition-colors">
                                    <FileSignature size={14} className="text-blue-600"/> Использование ПЭП для клиентов
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">Автоматическое формирование цифрового акта
                                    приема-передачи питомца. Электронный отказ от претензий, имеющий юридическую
                                    силу.</p>
                            </div>
                        </label>

                        <div className="pt-4 border-t border-brand-100">
                            <button type="submit"
                                    className="w-full rounded-xl bg-gray-900 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-black shadow-lg shadow-gray-900/20">
                                Подписать и отправить заявку
                            </button>
                        </div>
                    </Card>

                    {isSubmitted && (
                        <div
                            className="rounded-2xl bg-green-50 border border-green-200 p-5 flex gap-3 animate-in fade-in slide-in-from-bottom-4">
                            <ShieldCheck className="text-green-600 flex-shrink-0" size={24}/>
                            <div>
                                <h4 className="font-bold text-green-900">Заявка успешно отправлена</h4>
                                <p className="text-sm text-green-700 mt-1">
                                    Пакет документов для подписания через ЭДО отправлен на ваш email. Ожидайте звонка
                                    менеджера для верификации локации.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default B2BRegistrationPage;