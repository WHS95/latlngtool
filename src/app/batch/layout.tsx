import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "주소 일괄 변환기 | 여러 주소를 한번에 위경도로 변환 | 주소 위경도 변환 사이트",
  description:
    "주소 일괄 변환기로 여러 주소를 한번에 위도 경도로 변환하세요. CSV 파일 다운로드 지원으로 대량 주소 위경도 변환을 무료로 제공하는 최고의 주소 변환 서비스입니다.",
  asPath: "/batch",
  keywords:
    "주소 일괄 변환, 주소 위경도 변환, 대량 주소 변환, CSV 주소 변환, 여러 주소 변환, 주소 일괄 처리, 주소변환기, 대량변환, CSV다운로드, 위도경도변환, 주소리스트, 좌표변환, 배치처리, 무료 주소 변환",
});

export default function BatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
