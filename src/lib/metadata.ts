import type { Metadata } from "next";

export interface GenerateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
  keywords?: string;
}

export const META = {
  title: "위도경도 찾기 | 빠르고 쉬운 좌표 검색 서비스",
  description:
    "주소를 입력하면 정확한 위도와 경도를 찾아드립니다. 네이버 지도 기반의 빠르고 정확한 좌표 검색 서비스입니다.",
  url: "https://latlngtool.com",
  ogImage: "/android-chrome-512x512.png",
  keywords: [
    "위도",
    "경도",
    "좌표",
    "지도",
    "네이버지도",
    "위치찾기",
    "주소검색",
    "좌표변환",
    "지리정보",
    "GPS",
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
