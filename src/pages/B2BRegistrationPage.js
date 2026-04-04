import React, { useState } from 'react';
import { Card } from '../components/ui/Card';

const defaultForm = {
  companyName: '',
  inn: '',
  ogrn: '',
  contactName: '',
  email: '',
  phone: '',
  city: '',
  website: '',
  petServices: ''
};

const B2BRegistrationPage = () => {
  const [form, setForm] = useState(defaultForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-brand-50 to-ozon-50">
        <h2 className="text-2xl font-bold text-gray-900">B2B регистрация партнера</h2>
        <p className="mt-2 text-sm text-gray-600">
          Локальная форма подключения для ветклиник, отелей, грумеров и сервисов для животных.
        </p>
      </Card>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Данные компании</h3>
          <input
            name="companyName"
            value={form.companyName}
            onChange={onChange}
            required
            placeholder="Название компании"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            name="inn"
            value={form.inn}
            onChange={onChange}
            required
            placeholder="ИНН"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            name="ogrn"
            value={form.ogrn}
            onChange={onChange}
            placeholder="ОГРН / ОГРНИП"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="Город"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            name="website"
            value={form.website}
            onChange={onChange}
            placeholder="Сайт (необязательно)"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </Card>

        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Контакт и профиль</h3>
          <input
            name="contactName"
            value={form.contactName}
            onChange={onChange}
            required
            placeholder="Контактное лицо"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="Рабочий email"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            placeholder="Телефон"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <textarea
            name="petServices"
            value={form.petServices}
            onChange={onChange}
            rows={4}
            placeholder="Какие услуги вы оказываете"
            className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm resize-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Отправить заявку
          </button>
          {isSubmitted && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              Заявка отправлена локально. Менеджер свяжется с вами в рабочее время.
            </p>
          )}
        </Card>
      </form>
    </div>
  );
};

export default B2BRegistrationPage;
