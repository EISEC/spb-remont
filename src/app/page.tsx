import React from 'react';
import Hero from '@/components/Hero';
import { SEOSection } from '@/components/sections';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Calculator from '@/components/Calculator';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import PageLayout from '@/components/layouts/PageLayout';
import StickyCallButton from '@/components/ui/StickyCallButton';

const HomeContent = () => {
  return (
    <>
      <Hero />
      <SEOSection />
      <Services />
      <Portfolio />
      <Calculator />
      <Reviews />
      <About />
      <Contact />
      <StickyCallButton />
    </>
  );
};

export default function Home() {
  return (
    <PageLayout isHomePage={true}>
      <HomeContent />
    </PageLayout>
  );
} 