import { z } from 'zod';

// Схема для контактной формы
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, 'Некорректный номер телефона'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов').optional().or(z.literal('')),
});

// Схема для быстрой формы заявки
export const quickFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, 'Некорректный номер телефона'),
});

// Схема для калькулятора ремонта
export const calculatorSchema = z.object({
  roomType: z.enum(['apartment', 'office', 'house', 'commercial'], {
    errorMap: () => ({ message: 'Выберите тип помещения' })
  }),
  area: z.number().min(1, 'Площадь должна быть больше 0').max(1000, 'Площадь не может быть больше 1000 м²'),
  repairType: z.enum(['economy', 'standard', 'luxury'], {
    errorMap: () => ({ message: 'Выберите тип ремонта' })
  }),
  rooms: z.number().min(1, 'Количество комнат должно быть больше 0').max(20, 'Максимум 20 комнат'),
  services: z.array(z.string()).optional(),
  hasDesign: z.boolean(),
  deadline: z.enum(['1-2 месяца', '2-3 месяца', '3-6 месяцев', 'более 6 месяцев'], {
    errorMap: () => ({ message: 'Выберите сроки ремонта' })
  }),
  budget: z.enum(['до 500 тыс', '500 тыс - 1 млн', '1-2 млн', 'более 2 млн'], {
    errorMap: () => ({ message: 'Выберите бюджет' })
  }),
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, 'Некорректный номер телефона'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuickFormData = z.infer<typeof quickFormSchema>;
export type CalculatorFormData = z.infer<typeof calculatorSchema>; 