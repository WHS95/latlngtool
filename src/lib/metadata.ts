import type { Metadata } from "next";

export interface GenerateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
  keywords?: string;
}

export const META = {
  title: "주소 위경도 변환 사이트 | 주소 위경도 변환 | 주소 위경도 | 지도 위경도 검색 | 무료 좌표 변환 서비스",
  description:
    "주소 위경도 변환 사이트 1위! 주소 위경도 변환을 무료로 제공하는 최고의 주소 위경도 서비스입니다. 지도 위경도 검색, 주소 위경도 좌표 찾기, 위도경도 변환기를 제공합니다. 주소만 입력하면 즉시 위도 경도로 변환해드립니다.",
  url: "https://latlngtool.vercel.app",
  ogImage: "/android-chrome-512x512.png",
  keywords: [
    "주소 위경도 변환 사이트",
    "주소 위경도 변환",
    "주소 위경도",
    "지도 위경도 검색",
    "위도경도 변환",
    "좌표 변환",
    "주소 좌표 변환",
    "위경도 찾기",
    "좌표 찾기",
    "지도 좌표",
    "네이버지도 좌표",
    "구글지도 좌표",
    "GPS 좌표",
    "위치 좌표",
    "주소 검색",
    "위도",
    "경도",
    "좌표",
    "지도",
    "위치찾기",
    "좌표변환기",
    "위경도변환기",
    "주소변환",
    "좌표검색",
    "지리정보",
    "무료 좌표 변환",
    "온라인 좌표 변환",
    "주소 위도 경도",
    "지도 위도 경도",
  ],
  googleVerification: "google-site-verification-code",
  naverVerification: "naver-verification-code",
  bingVerification: "bing-verification-code",
  siteName: "위도경도 찾기",
  creator: "@latlngtool",
  author: "Find LatLng Service",
};

export const getMetadata = (
  metadataProps?: GenerateMetadataProps
): Metadata => {
  const { title, description, asPath, ogImage, keywords } = metadataProps || {};

  const TITLE = title ? `${title} | 위도경도 찾기` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath || "";
  const OG_IMAGE = ogImage || META.ogImage;
  const KEYWORDS = keywords
    ? `${keywords}, ${META.keywords.join(", ")}`
    : META.keywords.join(", ");

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: META.author }],
    creator: META.creator,
    publisher: META.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: META.siteName,
      locale: "ko_KR",
      type: "website",
      url: `${META.url}${PAGE_URL}`,
      images: [
        {
          url: OG_IMAGE,
          width: 512,
          height: 512,
          alt: META.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      creator: META.creator,
      images: [OG_IMAGE],
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
    verification: {
      google: META.googleVerification,
      other: {
        "naver-site-verification": META.naverVerification,
        "msvalidate.01": META.bingVerification,
      },
    },
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
  };

  return metadata;
};
