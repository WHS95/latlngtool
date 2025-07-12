import type { Metadata } from "next";

interface KeywordLayoutProps {
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

const keywordMeta: Record<string, {
  title: string;
  description: string;
  keywords: string;
}> = {
  "주소-위경도": {
    title: "주소 위경도 찾기 사이트 | 무료 주소 위경도 서비스 1위",
    description: "주소 위경도를 무료로 찾아드리는 전문 사이트입니다. 정확하고 빠른 주소 위경도 검색 서비스를 제공합니다. 주소만 입력하면 즉시 위도 경도로 변환됩니다.",
    keywords: "주소 위경도, 주소 위경도 찾기, 주소 위경도 검색, 무료 주소 위경도, 주소 좌표 찾기"
  },
  "좌표-변환": {
    title: "좌표 변환 사이트 | 무료 좌표 변환 서비스 1위",
    description: "좌표 변환을 무료로 제공하는 전문 사이트입니다. 다양한 좌표계 변환을 지원하며 정확한 좌표 변환 결과를 제공합니다.",
    keywords: "좌표 변환, 좌표 변환기, 무료 좌표 변환, 좌표계 변환, GPS 좌표 변환"
  },
  "위경도-찾기": {
    title: "위경도 찾기 사이트 | 무료 위경도 찾기 서비스 1위",
    description: "위경도 찾기를 무료로 제공하는 전문 사이트입니다. 주소로 위경도를 쉽게 찾을 수 있으며 정확한 위치 정보를 제공합니다.",
    keywords: "위경도 찾기, 위경도 검색, 무료 위경도, 위치 찾기, 좌표 찾기"
  },
  "GPS-좌표": {
    title: "GPS 좌표 찾기 사이트 | 무료 GPS 좌표 서비스 1위",
    description: "GPS 좌표를 무료로 찾아드리는 전문 사이트입니다. 정확한 GPS 좌표 정보를 제공하며 다양한 형식으로 좌표를 확인할 수 있습니다.",
    keywords: "GPS 좌표, GPS 좌표 찾기, 무료 GPS, GPS 위치, GPS 좌표 검색"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = keywordMeta[slug] || keywordMeta["주소-위경도"];
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://latlngtool.vercel.app/키워드/${slug}`,
      siteName: `${slug.replace('-', ' ')} 사이트`,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://latlngtool.vercel.app/키워드/${slug}`,
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
}

export async function generateStaticParams() {
  // 정적 생성할 키워드 슬러그들
  return [
    { slug: "주소-위경도" },
    { slug: "좌표-변환" },
    { slug: "위경도-찾기" },
    { slug: "GPS-좌표" },
  ];
}

export default async function KeywordLayout({ params, children }: KeywordLayoutProps) {
  const { slug } = await params;
  const keywordName = slug.replace('-', ' ');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${keywordName} 사이트`,
            description: `${keywordName}을 무료로 제공하는 전문 사이트`,
            url: `https://latlngtool.vercel.app/키워드/${slug}`,
            mainEntity: {
              "@type": "SoftwareApplication",
              name: `${keywordName} 도구`,
              description: `${keywordName}을 위한 무료 온라인 도구`,
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              featureList: [
                `${keywordName}`,
                "무료 서비스",
                "정확한 결과",
                "빠른 처리",
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
                  name: keywordName,
                  item: `https://latlngtool.vercel.app/키워드/${slug}`,
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1247",
            },
          }),
        }}
      />
      {children}
    </>
  );
}