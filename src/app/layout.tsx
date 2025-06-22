import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <head>
        <meta
          name='naver-site-verification'
          content='naver-verification-code'
        />

        <meta name='msvalidate.01' content='bing-verification-code' />

        <script
          type='text/javascript'
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
          async
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "위도 경도 찾기",
              description:
                "주소만 입력하면 위도와 경도를 바로 확인하고 복사할 수 있는 무료 온라인 도구",
              url: "https://latlngtool.vercel.app",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              creator: {
                "@type": "Organization",
                name: "LatLng Tool Service",
              },
              featureList: [
                "주소를 위도경도로 변환",
                "일괄 주소 변환 및 CSV 다운로드",
                "현재 위치 확인",
                "지도 링크 생성",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
