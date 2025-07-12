import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://latlngtool.vercel.app";
  
  // 기본 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/batch`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // SEO 최적화된 키워드 페이지들
  const keywordPages = [
    {
      url: `${baseUrl}/주소-위경도-변환`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/지도-위경도-검색`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  // 동적 키워드 페이지들
  const dynamicKeywordPages = [
    "주소-위경도",
    "좌표-변환",
    "위경도-찾기",
    "GPS-좌표",
    "네이버지도-좌표",
    "구글지도-좌표",
    "카카오맵-좌표",
    "무료-좌표-변환",
    "온라인-변환기",
    "실시간-좌표",
  ].map((slug) => ({
    url: `${baseUrl}/키워드/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  return [
    ...staticPages,
    ...keywordPages,
    ...dynamicKeywordPages,
  ];
}
