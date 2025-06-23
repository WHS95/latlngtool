"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGeocoding } from "@/hooks/useGeocoding";
import { useNaverMap } from "@/hooks/useNaverMap";
import { SingleSearch } from "@/components/features/SingleSearch";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { GoogleAd } from "@/components/ads/GoogleAd";
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
          <h1 className='text-2xl font-bold text-center'>위도 경도 찾기</h1>
          <p className='text-gray-600 text-center text-sm mt-2'>
            주소를 입력하여 정확한 위도와 경도를 빠르게 확인하세요
          </p>
        </div>
      </header>

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
                    <div
                      key={index}
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
                  ))}
                </div>
              </CardContent>
            </Card>
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
          <GoogleAd
            adSlot='0987654321'
            className='my-4'
            style={{ display: "block", textAlign: "center" }}
          />
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

      {/* 푸터 */}
      <footer className='bg-gray-100 mt-12 py-8 px-4'>
        <div className='max-w-4xl mx-auto text-center text-gray-600'>
          <p className='text-sm'>
            © 2025 위도경도 찾기 서비스. 빠르고 쉬운 위치 좌표 확인.
          </p>
          <p className='text-xs mt-2'>
            지도를 이동하거나 주소를 검색하여 정확한 위치 좌표를 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
