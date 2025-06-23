import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModalProvider from '@/components/ModalProvider';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  isHomePage?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '', isHomePage = false }) => {
  return (
    <ModalProvider>
      <div className={`min-h-screen bg-white ${className}`}>
        <Header />
        <main className={isHomePage ? '' : 'pt-20'}>
          {children}
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
};

export default PageLayout; 