"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNaverMap } from "@/hooks/useNaverMap";
import { LinkGenerator } from "@/components/features/LinkGenerator";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { AdBanner } from "@/components/ads/AdBanner";
import { MapLinks } from "@/types/app";

export default function LinksPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude, initMap } = useNaverMap(mapRef);

  // 상태 관리
  const [copyMessage, setCopyMessage] = useState("");

  // 지도 링크 생성
  const mapLinks: MapLinks = {
    googleMapsUrl: `https://maps.google.com/maps?q=${latitude},${longitude}`,
    kakaoMapUrl: `https://map.kakao.com/link/map/${latitude},${longitude}`,
    naverMapUrl: `https://map.naver.com/v5/search/${latitude},${longitude}`,
  };

  // 페이지 로드 시 지도 초기화
  useEffect(() => {
    initMap();
  }, [initMap]);

  // 클립보드 복사 함수
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

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      {/* 헤더 */}
      <header className='bg-white border-b border-gray-200 py-4 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold text-center'>지도 링크 생성기</h1>
          <p className='text-gray-600 text-center text-sm mt-2'>
            현재 좌표로 구글, 카카오, 네이버 지도 링크를 생성하세요
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className='max-w-4xl mx-auto p-4'>
        <div className='space-y-6'>
          {/* 링크 생성기 */}
          <LinkGenerator
            latitude={latitude}
            longitude={longitude}
            mapLinks={mapLinks}
            onCopy={copyToClipboard}
          />

          {/* 상단 광고 */}
          <AdBanner />

          {/* 상태 메시지 */}
          {copyMessage && (
            <div className='p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm'>
              {copyMessage}
            </div>
          )}

          {/* 현재 좌표 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>현재 좌표</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <span className='text-sm font-medium text-gray-700'>
                    위도:
                  </span>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      value={latitude.toFixed(6)}
                      readOnly
                      className='font-mono text-sm'
                    />
                    <Button
                      size='sm'
                      onClick={() =>
                        copyToClipboard(latitude.toString(), "위도")
                      }
                    >
                      복사
                    </Button>
                  </div>
                </div>
                <div>
                  <span className='text-sm font-medium text-gray-700'>
                    경도:
                  </span>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      value={longitude.toFixed(6)}
                      readOnly
                      className='font-mono text-sm'
                    />
                    <Button
                      size='sm'
                      onClick={() =>
                        copyToClipboard(longitude.toString(), "경도")
                      }
                    >
                      복사
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={() =>
                  copyToClipboard(`${latitude},${longitude}`, "위도,경도")
                }
                className='w-full mt-4'
              >
                위도,경도 복사
              </Button>
            </CardContent>
          </Card>

          {/* 지도 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>지도</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                className='w-full h-[400px] border border-gray-300 rounded'
              />
            </CardContent>
          </Card>

          {/* 하단 광고 */}
          <AdBanner />
        </div>

        {/* 문의하기
        <Card className='mt-6'>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <span className='text-sm text-gray-600'>문의: </span>
              <code className='text-sm bg-gray-100 px-2 py-1 rounded'>
                support@latlngtool.vercel.app
              </code>
              <div className='flex justify-center gap-2 mt-2'>
                <button
                  onClick={() =>
                    copyToClipboard("support@latlngtool.vercel.app", "이메일 주소")
                  }
                  className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50'
                >
                  이메일 복사
                </button>
                <a
                  href='mailto:support@latlngtool.vercel.app?subject=위도경도 찾기 서비스 문의'
                  className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                  메일 보내기
                </a>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </main>

      {/* 모바일 하단 네비게이션 */}
      <BottomNavigation activeTab='links' />
    </div>
  );
}
