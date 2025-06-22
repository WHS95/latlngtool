import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "현재 내 위치 확인기",
  description:
    "GPS를 통해 현재 위치를 확인하고 정확한 위도와 경도를 얻을 수 있습니다. 브라우저 위치 서비스를 이용한 실시간 좌표 확인 서비스입니다.",
  asPath: "/location",
  keywords:
    "현재위치, GPS위치, 내위치확인, 실시간좌표, 위치서비스, 브라우저위치, 현재좌표, 위치찾기",
});

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
