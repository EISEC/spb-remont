'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

const StickyCallButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку после прокрутки на 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по ремонту.');
    window.open(`${CONTACT_INFO.socialLinks.whatsapp}?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(CONTACT_INFO.socialLinks.telegram, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Expanded menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-2xl p-4 shadow-2xl min-w-[280px]"
              >
                <div className="flex items-center justify-between mb-4">
                                      <h3 className="text-gray-800 font-semibold">Связаться с нами</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                                          className="p-1 text-gray-400 hover:text-green-500 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Позвонить */}
                  <button
                    onClick={handleCall}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Phone className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Позвонить</div>
                      <div className="text-sm opacity-90">{CONTACT_INFO.phone}</div>
                    </div>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">W</div>
                    <div className="text-left">
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm opacity-90">Быстрый ответ</div>
                    </div>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={handleTelegram}
                    className="w-full flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">T</div>
                    <div className="text-left">
                      <div className="font-semibold">Telegram</div>
                      <div className="text-sm opacity-90">Моментально</div>
                    </div>
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-xs">
                    Работаем {CONTACT_INFO.workingHours.weekdays}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 cursor-pointer ${
              isExpanded ? 'rotate-45' : ''
            }`}
          >
            <Phone className="w-7 h-7" />
          </motion.button>

          {/* Pulse animation */}
          {!isExpanded && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-green-500 rounded-full"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCallButton; 