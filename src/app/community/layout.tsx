import { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티 | 위도경도 찾기",
  description:
    "위도경도 찾기 사용자들과 소통하는 커뮤니티 공간입니다. GitHub Discussions를 통해 자유롭게 의견을 나누세요.",
  keywords: [
    "커뮤니티",
    "위도경도",
    "GPS",
    "좌표",
    "지도",
    "게시판",
    "질문답변",
  ],
  openGraph: {
    title: "커뮤니티 | 위도경도 찾기",
    description: "위도경도 찾기 사용자들과 소통하는 커뮤니티 공간",
    type: "website",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
