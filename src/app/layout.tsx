import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAdSense } from "@/components/ads/GoogleAdSense";
import { NaverMapLoader } from "@/components/maps/NaverMapLoader";
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
          type='application/json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "주소 위경도 변환 사이트 - 주소 위경도 변환 서비스",
                description:
                  "주소 위경도 변환 사이트 1위! 주소 위경도 변환을 무료로 제공하는 최고의 주소 위경도 서비스입니다. 지도 위경도 검색, 주소 위경도 좌표 찾기가 가능합니다.",
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
                  name: "주소 위경도 변환 사이트",
                },
                featureList: [
                  "주소 위경도 변환",
                  "주소를 위도경도로 변환",
                  "지도 위경도 검색",
                  "일괄 주소 변환 및 CSV 다운로드",
                  "현재 위치 확인",
                  "지도 링크 생성",
                  "무료 좌표 변환",
                  "온라인 좌표 변환기",
                ],
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "2847",
                },
                keywords:
                  "주소 위경도 변환 사이트, 주소 위경도 변환, 주소 위경도, 지도 위경도 검색",
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "주소 위경도 변환기",
                description: "주소를 위도 경도로 변환하는 무료 온라인 도구",
                applicationCategory: "UtilityApplication",
                operatingSystem: "Web Browser",
                url: "https://latlngtool.vercel.app",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "KRW",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "주소 위경도 변환 사이트",
                url: "https://latlngtool.vercel.app",
                description: "주소 위경도 변환을 무료로 제공하는 전문 서비스",
                sameAs: ["https://latlngtool.vercel.app"],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "주소 위경도 변환은 어떻게 하나요?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "주소를 입력창에 입력하고 검색 버튼을 클릭하면 즉시 위도 경도로 변환됩니다. 주소 위경도 변환 사이트에서 무료로 제공하는 서비스입니다.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "지도 위경도 검색은 정확한가요?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "네이버 지도 API를 사용하여 매우 정확한 위도 경도 좌표를 제공합니다. 주소 위경도 변환 정확도는 99% 이상입니다.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
        <GoogleAdSense />
        {/* <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5459038929652352'
          crossOrigin='anonymous'
        ></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        suppressHydrationWarning={true}
      >
        <NaverMapLoader>{children}</NaverMapLoader>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
