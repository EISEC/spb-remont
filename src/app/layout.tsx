import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Ремонт и отделка квартир в Санкт-Петербурге - АМСТРОЙ | Качественно и с гарантией",
  description: "Профессиональный ремонт квартир в СПб любой сложности. От эконом до VIP-класса. Работаем во всех районах Санкт-Петербурга. Гарантия качества, фиксированные цены. ☎ +7 (953) 371-34-17",
  keywords: "ремонт квартир спб, отделка квартир санкт-петербург, ремонт квартир люкс, ремонт квартир стандарт, ремонт квартир эконом, косметический ремонт, VIP ремонт, ремонт апартаментов, строительство, дизайн интерьера, АМСТРОЙ",
  openGraph: {
    title: "Ремонт и отделка квартир в Санкт-Петербурге - АМСТРОЙ",
    description: "Качественный ремонт квартир любой сложности во всех районах СПб. От косметического до представительского класса. Гарантия качества.",
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
  alternates: {
    canonical: "https://spb-remont.ru",
  },
  other: {
    "geo.region": "RU-SPE",
    "geo.placename": "Санкт-Петербург",
    "geo.position": "59.939095;30.315868",
    "ICBM": "59.939095, 30.315868",
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