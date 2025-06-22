import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = getMetadata({
  title: "주소 일괄 변환기",
  description:
    "여러 주소를 한 번에 입력하고 위도와 경도로 변환하여 CSV 파일로 다운로드할 수 있습니다. 대량의 주소 데이터를 효율적으로 처리하세요.",
  asPath: "/batch",
  keywords:
    "주소일괄변환, 주소변환, 대량변환, CSV다운로드, 위도경도변환, 주소리스트, 좌표변환, 배치처리",
});

export default function BatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
