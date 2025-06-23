import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Calculator from '@/components/Calculator';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ModalProvider from '@/components/ModalProvider';
import StickyCallButton from '@/components/ui/StickyCallButton';

export default function Home() {
  return (
    <ModalProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Calculator />
          <Reviews />
          <About />
          <Contact />
        </main>
        <Footer />
        <StickyCallButton />
      </div>
    </ModalProvider>
  );
} 