import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "위도 경도 찾기 | 빠르고 쉬운 위치 좌표 확인 서비스",
  description:
    "주소만 입력하면 위도와 경도를 바로 확인하고 복사하세요. 지도 이동도 지원합니다.",
  keywords:
    "위도, 경도, 좌표, 좌표 찾기, 위치 찾기, 위치 좌표, 네이버 지도 좌표",
  authors: [{ name: "Find LatLng Service" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "위도 경도 찾기 | 빠르고 쉬운 위치 좌표 확인 서비스",
    description:
      "주소만 입력하면 위도와 경도를 바로 확인하고 복사하세요. 지도 이동도 지원합니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://findlatlng.com",
    siteName: "위도 경도 찾기",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "위도 경도 찾기 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "위도 경도 찾기 | 빠르고 쉬운 위치 좌표 확인 서비스",
    description:
      "주소만 입력하면 위도와 경도를 바로 확인하고 복사하세요. 지도 이동도 지원합니다.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <head>
        <script
          type='text/javascript'
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
          async
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
