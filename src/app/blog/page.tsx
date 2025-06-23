"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [copyMessage, setCopyMessage] = useState("");

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${type}가 복사되었습니다!`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
      setCopyMessage("복사에 실패했습니다.");
    }
  };

  const articles = [
    {
      id: 1,
      title: "위도와 경도란 무엇인가?",
      content: `위도(Latitude)는 지구상의 북극과 남극을 잇는 선을 기준으로 한 각도이며, 경도(Longitude)는 본초자오선을 기준으로 한 각도입니다. 
      
위도는 적도를 0도로 하여 북극이 +90도, 남극이 -90도입니다. 경도는 영국 그리니치를 지나는 본초자오선을 0도로 하여 동쪽이 +180도, 서쪽이 -180도입니다.

예시:
- 서울의 좌표: 37.5665° N, 126.9780° E
- 부산의 좌표: 35.1796° N, 129.0756° E
- 제주의 좌표: 33.4996° N, 126.5312° E`,
    },
    {
      id: 2,
      title: "좌표계의 종류와 특징",
      content: `지구상의 위치를 나타내는 좌표계는 여러 종류가 있습니다:

1. **WGS84 (World Geodetic System 1984)**
   - 전 세계 GPS에서 사용하는 표준 좌표계
   - 대부분의 지도 서비스에서 기본으로 사용
   - 구글 지도, 애플 지도 등에서 사용

2. **GRS80 (Geodetic Reference System 1980)**
   - 한국의 국가기준점에서 사용
   - WGS84와 거의 동일하지만 미세한 차이 존재

3. **UTM (Universal Transverse Mercator)**
   - 군사용이나 측량에서 주로 사용
   - 미터 단위로 표현되어 거리 계산이 편리

4. **경위도 좌표계 (Geographic Coordinate System)**
   - 도(degree), 분(minute), 초(second)로 표현
   - 예: 37°33'58.8"N 126°58'40.8"E`,
    },
    {
      id: 3,
      title: "네이버, 구글, 카카오 지도 서비스 비교",
      content: `주요 지도 서비스들의 특징을 비교해보겠습니다:

**네이버 지도**
- 장점: 한국 지역 정보가 가장 정확하고 상세함
- 실시간 교통정보와 대중교통 연계 우수
- 음성 안내와 길찾기 기능이 뛰어남
- 단점: 해외 지역 정보 부족

**구글 지도**  
- 장점: 전 세계 커버리지, 위성 이미지 고화질
- 스트리트 뷰 기능으로 실제 거리 모습 확인 가능
- 다양한 언어 지원
- 단점: 한국 도로 정보의 일부 제한

**카카오맵**
- 장점: 직관적인 UI/UX, 빠른 검색 속도
- 카카오톡과의 연동으로 위치 공유 편리
- 지하철 노선도 기능 우수
- 단점: 상업적 목적의 광고 정보 많음`,
    },
    {
      id: 4,
      title: "지오코딩(Geocoding)과 리버스 지오코딩",
      content: `**지오코딩(Geocoding)**은 주소나 장소명을 위도/경도 좌표로 변환하는 과정입니다.

예시:
- 입력: "서울특별시 중구 세종대로 110"
- 출력: 37.5633, 126.9769

**리버스 지오코딩(Reverse Geocoding)**은 반대로 좌표를 주소로 변환하는 과정입니다.

예시:
- 입력: 37.5633, 126.9769
- 출력: "서울특별시 중구 세종대로 110"

**활용 분야:**
1. 배달 앱에서 정확한 배달 주소 확인
2. 부동산 앱에서 매물 위치 표시
3. 차량 네비게이션에서 현재 위치 안내
4. 응급상황 시 정확한 위치 전달
5. 여행 앱에서 관광지 위치 정보 제공`,
    },
    {
      id: 5,
      title: "좌표 정확도와 오차 이해하기",
      content: `GPS 좌표의 정확도는 다양한 요인에 의해 영향을 받습니다:

**소수점 자릿수별 정확도:**
- 소수점 1자리: 약 11km 오차
- 소수점 2자리: 약 1.1km 오차  
- 소수점 3자리: 약 110m 오차
- 소수점 4자리: 약 11m 오차
- 소수점 5자리: 약 1.1m 오차
- 소수점 6자리: 약 0.11m 오차 (일반적 권장)

**오차 발생 원인:**
1. **위성 신호 방해**: 건물, 터널, 날씨
2. **기기 성능**: GPS 칩셋의 품질
3. **좌표계 변환**: 서로 다른 좌표계 간 변환 시
4. **지도 데이터**: 각 지도 서비스의 기준점 차이

**정확도 개선 방법:**
- A-GPS(Assisted GPS) 사용
- Wi-Fi와 기지국 정보 결합
- 실시간 보정 서비스(RTK) 활용`,
    },
  ];

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      {/* 헤더 */}
      <header className='bg-white border-b border-gray-200 py-6 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl font-bold text-center mb-2'>
            위도경도 완벽 가이드
          </h1>
          <p className='text-gray-600 text-center text-lg'>
            GPS 좌표와 지도 활용의 모든 것을 알아보세요
          </p>
          <p className='text-gray-500 text-center text-sm mt-2'>
            초보자부터 전문가까지, 누구나 이해할 수 있는 위치 정보 완벽 설명서
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className='max-w-4xl mx-auto p-4'>
        {/* 상태 메시지 */}
        {copyMessage && (
          <div className='mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm'>
            {copyMessage}
          </div>
        )}

        {/* 목차 */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='text-xl'>📚 목차</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {articles.map((article, index) => (
                <div key={article.id} className='flex items-center space-x-3'>
                  <span className='text-blue-600 font-semibold'>
                    {index + 1}.
                  </span>
                  <a
                    href={`#article-${article.id}`}
                    className='text-blue-600 hover:underline'
                  >
                    {article.title}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 기사 목록 */}
        <div className='space-y-8'>
          {articles.map((article, index) => (
            <Card key={article.id} id={`article-${article.id}`}>
              <CardHeader>
                <CardTitle className='text-xl text-blue-700'>
                  {index + 1}. {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='prose max-w-none'>
                  {article.content.split("\n").map((paragraph, pIndex) => {
                    if (paragraph.trim() === "") return <br key={pIndex} />;
                    if (
                      paragraph.includes("예시:") ||
                      paragraph.includes("입력:") ||
                      paragraph.includes("출력:")
                    ) {
                      return (
                        <div
                          key={pIndex}
                          className='bg-gray-50 p-3 rounded my-3 font-mono text-sm'
                        >
                          {paragraph}
                        </div>
                      );
                    }
                    if (paragraph.includes("**") && paragraph.includes("**")) {
                      return (
                        <p
                          key={pIndex}
                          className='mb-3 font-semibold text-gray-800'
                        >
                          {paragraph.replace(/\*\*(.*?)\*\*/g, "$1")}
                        </p>
                      );
                    }
                    if (
                      paragraph.startsWith("- ") ||
                      paragraph.match(/^\d+\./)
                    ) {
                      return (
                        <p key={pIndex} className='mb-2 ml-4 text-gray-700'>
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p
                        key={pIndex}
                        className='mb-3 text-gray-700 leading-relaxed'
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => copyToClipboard(article.content, "내용")}
                  >
                    📋 내용 복사
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 실용적인 팁 섹션 */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='text-xl text-green-700'>
              💡 실용적인 활용 팁
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h4 className='font-semibold mb-2'>📱 일상생활에서</h4>
                <ul className='text-sm space-y-1 text-gray-600'>
                  <li>• 친구와 만날 정확한 위치 공유</li>
                  <li>• 여행지 위치 기록 및 공유</li>
                  <li>• 응급상황 시 정확한 위치 전달</li>
                  <li>• 주차 위치 기록하기</li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>💼 업무 활용</h4>
                <ul className='text-sm space-y-1 text-gray-600'>
                  <li>• 부동산 매물 위치 관리</li>
                  <li>• 배달 서비스 정확한 주소</li>
                  <li>• 현장 작업 위치 보고</li>
                  <li>• 매장 위치 마케팅 자료</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ 섹션 */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-700'>
              ❓ 자주 묻는 질문
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold mb-1'>
                  Q: 위도경도 좌표를 어떻게 구해야 하나요?
                </h4>
                <p className='text-sm text-gray-600'>
                  A: 본 사이트의 검색 기능을 사용하거나, 스마트폰의 지도 앱에서
                  위치를 길게 누르면 좌표를 확인할 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className='font-semibold mb-1'>
                  Q: 좌표가 조금씩 다른 이유는 무엇인가요?
                </h4>
                <p className='text-sm text-gray-600'>
                  A: 각 지도 서비스마다 사용하는 좌표계와 기준점이 다르고, GPS
                  측정 시점과 환경에 따라 미세한 차이가 발생할 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className='font-semibold mb-1'>
                  Q: 좌표를 더 정확하게 측정하려면?
                </h4>
                <p className='text-sm text-gray-600'>
                  A: 실외에서 하늘이 잘 보이는 곳에서 측정하고, 여러 번 측정한
                  후 평균값을 사용하는 것이 좋습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 관련 도구 섹션 */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='text-xl text-orange-700'>
              🛠️ 관련 도구 및 서비스
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='text-center p-4 border rounded'>
                <h4 className='font-semibold mb-2'>단일 검색</h4>
                <p className='text-sm text-gray-600 mb-3'>
                  주소 하나를 정확한 좌표로 변환
                </p>
                <Button size='sm' asChild>
                  <Link href='/'>사용하기</Link>
                </Button>
              </div>
              <div className='text-center p-4 border rounded'>
                <h4 className='font-semibold mb-2'>일괄 변환</h4>
                <p className='text-sm text-gray-600 mb-3'>
                  여러 주소를 한 번에 처리
                </p>
                <Button size='sm' asChild>
                  <a href='/batch'>사용하기</a>
                </Button>
              </div>
              <div className='text-center p-4 border rounded'>
                <h4 className='font-semibold mb-2'>링크 생성</h4>
                <p className='text-sm text-gray-600 mb-3'>
                  지도 서비스 바로가기 링크
                </p>
                <Button size='sm' asChild>
                  <a href='/links'>사용하기</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation activeTab='blog' />
    </div>
  );
}
