import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "위도경도 링크 생성기",
  description:
    "현재 좌표로 구글 지도, 카카오맵, 네이버 지도 링크를 생성할 수 있습니다. 위도경도를 다양한 지도 서비스 링크로 변환하여 공유하세요.",
  asPath: "/links",
  keywords:
    "지도링크, 구글지도링크, 카카오맵링크, 네이버지도링크, 지도공유, 좌표링크, 위치공유, 지도URL",
});

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
