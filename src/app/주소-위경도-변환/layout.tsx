import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "주소 위경도 변환 사이트 | 무료 주소 위경도 변환 서비스 1위",
  description: "주소 위경도 변환 사이트 1위! 주소를 위도 경도로 무료 변환하는 최고의 주소 위경도 변환 서비스입니다. 정확하고 빠른 주소 위경도 변환을 무료로 제공합니다. 네이버지도 기반 주소 위경도 변환기.",
  keywords: "주소 위경도 변환 사이트, 주소 위경도 변환, 주소를 위도경도로 변환, 무료 주소 위경도 변환, 주소 좌표 변환, 주소 위경도 변환기, 온라인 주소 변환, 주소 GPS 변환",
  openGraph: {
    title: "주소 위경도 변환 사이트 | 무료 주소 위경도 변환 서비스 1위",
    description: "주소 위경도 변환 사이트 1위! 주소를 위도 경도로 무료 변환하는 최고의 주소 위경도 변환 서비스입니다.",
    url: "https://latlngtool.vercel.app/주소-위경도-변환",
    siteName: "주소 위경도 변환 사이트",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "주소 위경도 변환 사이트 | 무료 주소 위경도 변환 서비스 1위",
    description: "주소 위경도 변환 사이트 1위! 주소를 위도 경도로 무료 변환하는 최고의 주소 위경도 변환 서비스입니다.",
  },
  alternates: {
    canonical: "https://latlngtool.vercel.app/주소-위경도-변환",
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

export default function AddressLatLngConversionLayout({
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
            name: "주소 위경도 변환 사이트",
            description: "주소 위경도 변환을 무료로 제공하는 전문 사이트",
            url: "https://latlngtool.vercel.app/주소-위경도-변환",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "주소 위경도 변환기",
              description: "주소를 위도 경도로 변환하는 무료 온라인 도구",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              featureList: [
                "주소 위경도 변환",
                "무료 주소 변환",
                "정확한 좌표 제공",
                "빠른 변환 속도",
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
                  name: "주소 위경도 변환",
                  item: "https://latlngtool.vercel.app/주소-위경도-변환",
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