"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGeocoding } from "@/hooks/useGeocoding";
import { useNaverMap } from "@/hooks/useNaverMap";
import { SingleSearch } from "@/components/features/SingleSearch";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { AdBanner } from "@/components/ads/AdBanner";
// import { StickyAd } from "@/components/ads/StickyAd";
import { SearchResult } from "@/types/app";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude, initMap, updateMapLocation } =
    useNaverMap(mapRef);

  const { searchHistory, searchAddressMultiple } = useGeocoding();

  // 상태 관리
  const [address, setAddress] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

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

  // 다중 주소 검색
  const handleSingleSearch = () => {
    setShowResults(false);
    searchAddressMultiple(
      address,
      (results) => {
        setSearchResults(results);
        setShowResults(true);
        if (results.length > 0) {
          const firstResult = results[0];
          const lat = parseFloat(firstResult.y);
          const lng = parseFloat(firstResult.x);
          updateMapLocation(lat, lng);
          setCopyMessage(`${results.length}개의 검색 결과를 찾았습니다!`);
        }
        setTimeout(() => setCopyMessage(""), 2000);
      },
      (error) => {
        setCopyMessage(error);
        setTimeout(() => setCopyMessage(""), 3000);
      }
    );
  };

  // 특정 결과 선택
  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.y);
    const lng = parseFloat(result.x);
    updateMapLocation(lat, lng);
    setCopyMessage("위치가 선택되었습니다!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      {/* 헤더 */}
      <header className='bg-white border-b border-gray-200 py-4 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold text-center'>
            주소 위경도 변환 사이트 | 주소 위경도 변환
          </h1>
          <p className='text-gray-600 text-center text-sm mt-2'>
            주소 위경도 변환을 무료로 제공하는 1위 사이트! 지도 위경도 검색으로
            주소를 정확한 위도 경도 좌표로 즉시 변환하세요
          </p>
          <div className='text-center mt-2'>
            <span className='text-xs text-blue-600 font-medium'>
              ⭐ 주소 위경도 변환 전문 서비스 ⭐ 지도 위경도 검색 1위 ⭐ 무료
              좌표 변환기
            </span>
          </div>
        </div>
      </header>

      {/* 헤더 직후 광고 */}
      <div className='max-w-4xl mx-auto px-4 pt-4'>
        <AdBanner />
      </div>

      {/* 메인 컨텐츠 */}
      <main className='max-w-4xl mx-auto p-4'>
        <div className='space-y-6'>
          {/* 검색 */}
          <SingleSearch
            address={address}
            setAddress={setAddress}
            searchHistory={searchHistory}
            onSearch={handleSingleSearch}
          />

          {/* 상단 광고 - 검색 직후 */}
          <AdBanner />

          {/* 상태 메시지 */}
          {copyMessage && (
            <div className='p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm'>
              {copyMessage}
            </div>
          )}

          {/* 검색 결과 */}
          {showResults && searchResults.length > 0 && (
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  검색 결과 ({searchResults.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {searchResults.map((result, index) => (
                    <div key={index}>
                      <div
                        className='p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer'
                        onClick={() => handleSelectResult(result)}
                      >
                        <div className='flex justify-between items-start gap-4'>
                          <div className='flex-1'>
                            <p className='font-medium text-sm'>
                              {result.roadAddress}
                            </p>
                            {result.jibunAddress !== result.roadAddress && (
                              <p className='text-xs text-gray-600 mt-1'>
                                {result.jibunAddress}
                              </p>
                            )}
                            <p className='text-xs text-blue-600 mt-1'>
                              위도: {parseFloat(result.y).toFixed(6)}, 경도:{" "}
                              {parseFloat(result.x).toFixed(6)}
                            </p>
                          </div>
                          <div className='flex gap-1'>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(result.roadAddress, "주소");
                              }}
                            >
                              주소복사
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(
                                  `${result.y},${result.x}`,
                                  "좌표"
                                );
                              }}
                            >
                              좌표복사
                            </Button>
                          </div>
                        </div>
                      </div>
                      {/* 검색 결과 사이사이 광고 - 매 3번째마다 */}
                      {(index + 1) % 3 === 0 &&
                        index < searchResults.length - 1 && (
                          <div className='py-3'>
                            <AdBanner />
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* SEO 최적화 컨텐츠 */}
          <Card className='bg-blue-50 border-blue-200'>
            <CardContent className='pt-4'>
              <div className='text-center space-y-2'>
                <h2 className='text-lg font-bold text-blue-800'>
                  🏆 주소 위경도 변환 사이트 1위
                </h2>
                <p className='text-sm text-gray-700'>
                  <strong>주소 위경도 변환</strong>을 무료로 제공하는 최고의
                  서비스입니다.
                  <strong>지도 위경도 검색</strong>으로 정확한 좌표를 즉시
                  확인하세요!
                </p>
                <div className='flex flex-wrap justify-center gap-2 text-xs'>
                  <span className='bg-blue-100 px-2 py-1 rounded'>
                    주소 위경도 변환
                  </span>
                  <span className='bg-green-100 px-2 py-1 rounded'>
                    지도 위경도 검색
                  </span>
                  <span className='bg-yellow-100 px-2 py-1 rounded'>
                    무료 좌표 변환
                  </span>
                  <span className='bg-purple-100 px-2 py-1 rounded'>
                    온라인 변환기
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 현재 좌표 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>
                주소 위경도 변환 결과 - 현재 좌표
              </CardTitle>
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
                      className='bg-black text-white hover:bg-black/20'
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
                      className='bg-black text-white hover:bg-black/20'
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
                className='w-full mt-4 bg-black text-white hover:bg-black/20'
              >
                위도,경도 복사
              </Button>
            </CardContent>
          </Card>

          {/* 중간 광고 - 좌표와 지도 사이 */}
          <AdBanner />

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

        {/* 문의하기 */}
        {/* <Card className='mt-6'>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <span className='text-sm text-gray-600'>문의: </span>
              <code className='text-sm bg-gray-100 px-2 py-1 rounded'>
                support@latlngtool.vercel.app
              </code>
              <div className='flex justify-center gap-2 mt-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() =>
                    copyToClipboard("support@latlngtool.vercel.app", "이메일 주소")
                  }
                >
                  이메일 복사
                </Button>
                <Button size='sm' asChild>
                  <a href='mailto:support@latlngtool.vercel.app?subject=위도경도 찾기 서비스 문의'>
                    메일 보내기
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </main>

      {/* 모바일 하단 네비게이션 */}
      <BottomNavigation activeTab='single' />

      {/* 스티키 광고 (모바일용) */}
      {/* <StickyAd position="bottom" /> */}

      {/* 푸터 */}
      <footer className='bg-gray-100 mt-12 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* 푸터 상단 광고 */}
          <div className='mb-6'>
            <AdBanner />
          </div>

          <div className='text-center text-gray-600 space-y-4'>
            <div className='bg-white p-4 rounded border'>
              <h3 className='font-bold text-gray-800 mb-2'>
                주소 위경도 변환 관련 키워드
              </h3>
              <div className='flex flex-wrap justify-center gap-2 text-xs'>
                <span>주소 위경도 변환 사이트</span>
                <span>주소 위경도 변환</span>
                <span>주소 위경도</span>
                <span>지도 위경도 검색</span>
                <span>좌표 변환기</span>
                <span>위경도 찾기</span>
                <span>GPS 좌표 변환</span>
                <span>네이버지도 좌표</span>
                <span>무료 좌표 변환</span>
                <span>온라인 좌표 변환기</span>
              </div>
            </div>

            <p className='text-sm'>
              © 2025 주소 위경도 변환 사이트. 최고의 주소 위경도 변환 서비스.
            </p>
            <p className='text-xs'>
              주소 위경도 변환을 무료로 제공하는 1위 사이트입니다. 지도 위경도
              검색으로 정확한 좌표를 확인하세요.
            </p>
          </div>

          {/* 푸터 하단 광고 */}
          <div className='mt-6'>
            <AdBanner />
          </div>
        </div>
      </footer>
    </div>
  );
}
