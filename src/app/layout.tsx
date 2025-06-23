import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Ремонт квартир в СПб - АМСТРОЙ | Качественно и с гарантией",
  description: "Профессиональный ремонт квартир в Санкт-Петербурге. Ремонт эконом, стандарт и люкс класса. Гарантия качества, низкие цены. ☎ +7 (953) 371-34-17",
  keywords: "ремонт квартир спб, ремонт квартир санкт-петербург, отделка квартир, дизайн интерьера, строительство",
  openGraph: {
    title: "Ремонт квартир в СПб - АМСТРОЙ",
    description: "Профессиональный ремонт квартир любой сложности. Гарантия качества.",
    images: ["/og-image.jpg"],
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    yandex: "your-yandex-verification-code",
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Yandex.Metrika
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              
              ym(12345678, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
      </body>
    </html>
  );
} 