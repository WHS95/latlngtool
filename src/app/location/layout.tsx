import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "현재 내 위치 확인기 | GPS 위경도 찾기 | 실시간 위치 좌표",
  description:
    "GPS를 통해 현재 위치를 확인하고 정확한 위도와 경도를 얻을 수 있습니다. 브라우저 위치 서비스를 이용한 실시간 좌표 확인 서비스로 무료로 내 위치의 정확한 GPS 좌표를 확인하세요.",
  asPath: "/location",
  keywords:
    "현재 위치 확인, GPS 위치, 내 위치 확인, 실시간 좌표, 위치 서비스, 브라우저 위치, 현재 좌표, 위치 찾기, GPS 좌표, 내 위치 GPS, 현재 위경도, 실시간 위경도, 무료 위치 확인",
});

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
