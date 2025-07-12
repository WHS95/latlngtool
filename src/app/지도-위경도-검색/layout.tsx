import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "지도 위경도 검색 사이트 | 무료 지도 위경도 검색 서비스 1위",
  description: "지도 위경도 검색 사이트 1위! 지도에서 위도 경도를 무료로 검색하는 최고의 지도 위경도 검색 서비스입니다. 정확하고 빠른 지도 위경도 검색을 무료로 제공합니다. 실시간 지도 좌표 검색.",
  keywords: "지도 위경도 검색, 지도 위경도 검색 사이트, 지도에서 위경도 찾기, 무료 지도 검색, 지도 좌표 검색, 지도 위경도 확인, 실시간 지도 검색, 지도 GPS 검색",
  openGraph: {
    title: "지도 위경도 검색 사이트 | 무료 지도 위경도 검색 서비스 1위",
    description: "지도 위경도 검색 사이트 1위! 지도에서 위도 경도를 무료로 검색하는 최고의 지도 위경도 검색 서비스입니다.",
    url: "https://latlngtool.vercel.app/지도-위경도-검색",
    siteName: "지도 위경도 검색 사이트",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "지도 위경도 검색 사이트 | 무료 지도 위경도 검색 서비스 1위",
    description: "지도 위경도 검색 사이트 1위! 지도에서 위도 경도를 무료로 검색하는 최고의 지도 위경도 검색 서비스입니다.",
  },
  alternates: {
    canonical: "https://latlngtool.vercel.app/지도-위경도-검색",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function MapLatLngSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "지도 위경도 검색 사이트",
            description: "지도 위경도 검색을 무료로 제공하는 전문 사이트",
            url: "https://latlngtool.vercel.app/지도-위경도-검색",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "지도 위경도 검색기",
              description: "지도에서 위도 경도를 검색하는 무료 온라인 도구",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              featureList: [
                "지도 위경도 검색",
                "실시간 지도 검색",
                "정확한 좌표 제공",
                "빠른 검색 속도",
              ],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "홈",
                  item: "https://latlngtool.vercel.app",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "지도 위경도 검색",
                  item: "https://latlngtool.vercel.app/지도-위경도-검색",
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}