'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quickFormSchema, QuickFormData } from '@/lib/validations';
import { useModal } from '../ModalProvider';

interface QuickFormProps {
  title: string;
  subtitle?: string;
}

const QuickForm: React.FC<QuickFormProps> = ({ title, subtitle }) => {
  const { closeModal } = useModal();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickFormData>({
    resolver: zodResolver(quickFormSchema),
  });

  const onSubmit = async (data: QuickFormData) => {
    try {
      // Здесь будет отправка данных на сервер
      console.log('Form data:', data);
      
      // Имитация отправки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Показываем сообщение об успехе
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      closeModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600">{subtitle}</p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="Введите ваше имя"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Номер телефона *
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="+7 (___) ___-__-__"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );
};

export default QuickForm; 