'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calculator as CalcIcon, Home, Building, Wrench } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculatorSchema, CalculatorFormData } from '@/lib/validations';

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CalculatorFormData>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
  });

  const totalSteps = 6;

  // Данные для шагов
  const roomTypes = [
    { id: 'apartment', label: 'Квартира', icon: Home, description: 'Жилое помещение' },
    { id: 'office', label: 'Офис', icon: Building, description: 'Коммерческое помещение' },
    { id: 'house', label: 'Дом', icon: Home, description: 'Частный дом' },
    { id: 'commercial', label: 'Коммерческое', icon: Building, description: 'Магазин, ресторан' }
  ];

  const repairTypes = [
    { id: 'economy', label: 'Эконом', price: 15000, description: 'Косметический ремонт' },
    { id: 'standard', label: 'Стандарт', price: 25000, description: 'Полный ремонт' },
    { id: 'luxury', label: 'Люкс', price: 45000, description: 'Премиум ремонт' }
  ];

  const additionalServices = [
    'Дизайн-проект',
    'Демонтаж',
    'Сантехника',
    'Электрика',
    'Напольные покрытия',
    'Потолки',
    'Окна и двери'
  ];

  const deadlineOptions = [
    '1-2 месяца',
    '2-3 месяца', 
    '3-6 месяцев',
    'более 6 месяцев'
  ];

  const budgetOptions = [
    'до 500 тыс',
    '500 тыс - 1 млн',
    '1-2 млн',
    'более 2 млн'
  ];

  // Расчет стоимости
  const calculatePrice = (data: Partial<CalculatorFormData>) => {
    if (!data.area || !data.repairType) return 0;
    
    const repairType = repairTypes.find(type => type.id === data.repairType);
    const basePrice = repairType ? repairType.price * data.area : 0;
    
    // Добавляем стоимость дополнительных услуг
    const servicesMultiplier = data.services ? 1 + (data.services.length * 0.1) : 1;
    const designMultiplier = data.hasDesign ? 1.2 : 1;
    
    return Math.round(basePrice * servicesMultiplier * designMultiplier);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: CalculatorFormData) => {
    const price = calculatePrice(data);
    console.log('Calculator data:', data, 'Price:', price);
    // Здесь будет отправка данных
  };

  const handleFieldChange = (field: string, value: string | number | boolean | string[]) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setValue(field as keyof CalculatorFormData, value);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CalcIcon className="w-4 h-4 mr-2" />
            Калькулятор стоимости
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Рассчитайте стоимость ремонта
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ответьте на несколько вопросов и получите предварительный расчет стоимости ремонта
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Прогресс бар */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Шаг {currentStep} из {totalSteps}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Форма */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Шаг 1: Тип помещения */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Какой тип помещения планируете ремонтировать?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {roomTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            handleFieldChange('roomType', type.id);
                            nextStep();
                          }}
                          className={`p-6 border-2 rounded-xl transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 ${
                            formData.roomType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <type.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.label}</h4>
                          <p className="text-gray-600">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Шаг 2: Площадь и комнаты */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Укажите параметры помещения
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Площадь (м²)
                        </label>
                        <input
                          type="number"
                          placeholder="Например: 65"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleFieldChange('area', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Количество комнат
                        </label>
                        <input
                          type="number"
                          placeholder="Например: 3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleFieldChange('rooms', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Шаг 3: Тип ремонта */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Выберите тип ремонта
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {repairTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            handleFieldChange('repairType', type.id);
                            nextStep();
                          }}
                          className={`p-6 border-2 rounded-xl transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 ${
                            formData.repairType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {type.price.toLocaleString()} ₽/м²
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.label}</h4>
                          <p className="text-gray-600">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Шаг 4: Дополнительные услуги */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Дополнительные услуги
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 rounded"
                          onChange={(e) => handleFieldChange('hasDesign', e.target.checked)}
                        />
                        <span className="ml-3 font-medium">Дизайн-проект (+20% к стоимости)</span>
                      </label>
                      
                      {additionalServices.map((service) => (
                        <label key={service} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 rounded"
                            onChange={(e) => {
                              const currentServices = formData.services || [];
                              const newServices = e.target.checked
                                ? [...currentServices, service]
                                : currentServices.filter(s => s !== service);
                              handleFieldChange('services', newServices);
                            }}
                          />
                          <span className="ml-3">{service}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Шаг 5: Сроки и бюджет */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Сроки и бюджет
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Желаемые сроки выполнения
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {deadlineOptions.map((deadline) => (
                            <button
                              key={deadline}
                              type="button"
                              onClick={() => handleFieldChange('deadline', deadline)}
                              className={`p-3 border-2 rounded-lg transition-all duration-200 ${
                                formData.deadline === deadline 
                                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {deadline}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ориентировочный бюджет
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {budgetOptions.map((budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => handleFieldChange('budget', budget)}
                              className={`p-3 border-2 rounded-lg transition-all duration-200 ${
                                formData.budget === budget 
                                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Шаг 6: Контакты */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Ваши контактные данные
                    </h3>
                    
                    {formData.area && formData.repairType && (
                      <div className="bg-blue-50 p-6 rounded-xl mb-6">
                        <h4 className="text-lg font-semibold text-blue-900 mb-2">
                          Предварительный расчет
                        </h4>
                        <div className="text-3xl font-bold text-blue-600">
                          {calculatePrice(formData).toLocaleString()} ₽
                        </div>
                        <p className="text-blue-700 text-sm mt-2">
                          Точная стоимость будет рассчитана после осмотра объекта
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ваше имя *
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="Введите ваше имя"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Номер телефона *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Навигация */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Назад
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  >
                    Далее
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
                  >
                    Получить расчет
                    <Wrench className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator; 