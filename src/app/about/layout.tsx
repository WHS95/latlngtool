import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "서비스 소개",
  description:
    "위도경도 찾기 서비스 소개. 정확하고 빠른 주소-좌표 변환 서비스로 일상생활과 업무에 필요한 위치 정보를 쉽게 찾아보세요.",
  asPath: "/about",
  keywords:
    "위도경도 찾기, 서비스 소개, 주소 변환, 좌표 검색, 지오코딩 서비스, 위치 정보, GPS 좌표",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
