import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "위도경도 가이드",
  description:
    "위도경도의 기본 개념부터 실무 활용법까지. GPS 좌표, 지오코딩, 지도 서비스 비교 등 위치 정보에 대한 모든 것을 알려드립니다.",
  asPath: "/blog",
  keywords:
    "위도경도 가이드, GPS 좌표, 지오코딩, 지도 활용, 위치 정보, 좌표 변환 방법, 네이버지도, 구글지도, 카카오맵",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
