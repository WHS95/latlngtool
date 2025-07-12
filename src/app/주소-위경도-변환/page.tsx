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
import { StickyAd } from "@/components/ads/StickyAd";
import { SearchResult } from "@/types/app";

export default function AddressLatLngConversionPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude, initMap, updateMapLocation } = useNaverMap(mapRef);
  const { searchHistory, searchAddressMultiple } = useGeocoding();

  const [address, setAddress] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    initMap();
  }, [initMap]);

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
          setCopyMessage(`${results.length}개의 주소 위경도 변환 결과를 찾았습니다!`);
        }
        setTimeout(() => setCopyMessage(""), 2000);
      },
      (error) => {
        setCopyMessage(error);
        setTimeout(() => setCopyMessage(""), 3000);
      }
    );
  };

  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.y);
    const lng = parseFloat(result.x);
    updateMapLocation(lat, lng);
    setCopyMessage("주소 위경도 변환이 완료되었습니다!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      <header className='bg-blue-600 text-white py-6 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-3xl font-bold mb-2'>주소 위경도 변환 전문 사이트</h1>
          <p className='text-blue-100 text-lg'>
            🥇 주소 위경도 변환 1위 서비스 | 무료 주소 위경도 변환기
          </p>
          <div className='mt-4 bg-blue-500 p-3 rounded'>
            <p className='text-sm'>
              <strong>주소 위경도 변환</strong>을 무료로 제공하는 최고의 서비스! 
              정확하고 빠른 <strong>주소 위경도</strong> 좌표 변환을 경험하세요.
            </p>
          </div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-4 pt-4'>
        <AdBanner className="mb-4" format="horizontal" />
      </div>

      <main className='max-w-4xl mx-auto p-4'>
        <div className='space-y-6'>
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">🔍 주소 위경도 변환 검색</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleSearch
                address={address}
                setAddress={setAddress}
                searchHistory={searchHistory}
                onSearch={handleSingleSearch}
              />
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  💡 <strong>주소 위경도 변환 팁:</strong> 도로명 주소를 입력하면 더 정확한 위경도 변환 결과를 얻을 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <AdBanner className="my-4" format="horizontal" />

          {copyMessage && (
            <div className='p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm'>
              {copyMessage}
            </div>
          )}

          {showResults && searchResults.length > 0 && (
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg text-blue-800'>
                  주소 위경도 변환 결과 ({searchResults.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {searchResults.map((result, index) => (
                    <div key={index}>
                      <div
                        className='p-3 border border-gray-200 rounded hover:bg-blue-50 cursor-pointer'
                        onClick={() => handleSelectResult(result)}
                      >
                        <div className='flex justify-between items-start gap-4'>
                          <div className='flex-1'>
                            <p className='font-medium text-sm text-blue-900'>
                              📍 {result.roadAddress}
                            </p>
                            {result.jibunAddress !== result.roadAddress && (
                              <p className='text-xs text-gray-600 mt-1'>
                                🏠 {result.jibunAddress}
                              </p>
                            )}
                            <p className='text-xs text-blue-600 mt-1 font-mono'>
                              📊 위도: {parseFloat(result.y).toFixed(6)}, 경도: {parseFloat(result.x).toFixed(6)}
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
                                copyToClipboard(`${result.y},${result.x}`, "위경도");
                              }}
                            >
                              위경도복사
                            </Button>
                          </div>
                        </div>
                      </div>
                      {(index + 1) % 2 === 0 && index < searchResults.length - 1 && (
                        <div className="py-3">
                          <AdBanner format="rectangle" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold text-center text-blue-800 mb-4">
                🏆 최고의 주소 위경도 변환 서비스
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">✅ 주소 위경도 변환 특징</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 정확한 주소 위경도 변환</li>
                    <li>• 실시간 지도 위경도 검색</li>
                    <li>• 무료 주소 위경도 서비스</li>
                    <li>• 빠른 좌표 변환 속도</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">🎯 지원 기능</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 일괄 주소 위경도 변환</li>
                    <li>• CSV 파일 다운로드</li>
                    <li>• 현재 위치 좌표 확인</li>
                    <li>• 지도 링크 생성</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <AdBanner className="my-6" format="rectangle" />

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg text-blue-800'>📍 주소 위경도 변환 결과 좌표</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <span className='text-sm font-medium text-gray-700'>위도 (Latitude):</span>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      value={latitude.toFixed(6)}
                      readOnly
                      className='font-mono text-sm bg-blue-50'
                    />
                    <Button
                      size='sm'
                      onClick={() => copyToClipboard(latitude.toString(), "위도")}
                      className='bg-blue-600 text-white hover:bg-blue-700'
                    >
                      복사
                    </Button>
                  </div>
                </div>
                <div>
                  <span className='text-sm font-medium text-gray-700'>경도 (Longitude):</span>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      value={longitude.toFixed(6)}
                      readOnly
                      className='font-mono text-sm bg-green-50'
                    />
                    <Button
                      size='sm'
                      onClick={() => copyToClipboard(longitude.toString(), "경도")}
                      className='bg-green-600 text-white hover:bg-green-700'
                    >
                      복사
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => copyToClipboard(`${latitude},${longitude}`, "위도,경도")}
                className='w-full mt-4 bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700'
              >
                위도,경도 한번에 복사
              </Button>
            </CardContent>
          </Card>

          <AdBanner className="my-6" format="auto" />

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg text-blue-800'>🗺️ 주소 위경도 변환 지도</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                className='w-full h-[400px] border-2 border-blue-200 rounded'
              />
              <p className="text-xs text-gray-600 mt-2 text-center">
                지도를 드래그하여 실시간으로 주소 위경도 변환 결과를 확인하세요
              </p>
            </CardContent>
          </Card>

          <AdBanner className="my-6" format="auto" />
        </div>
      </main>

      <BottomNavigation activeTab='single' />
      <StickyAd position="bottom" />

      <footer className='bg-blue-600 text-white mt-12 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <AdBanner format="horizontal" />
          
          <div className='text-center space-y-4 mt-6'>
            <h3 className="text-xl font-bold">주소 위경도 변환 관련 서비스</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>주소 위경도 변환 사이트</div>
              <div>주소 위경도 변환</div>
              <div>주소 위경도</div>
              <div>지도 위경도 검색</div>
              <div>무료 좌표 변환</div>
              <div>온라인 변환기</div>
              <div>GPS 좌표 찾기</div>
              <div>네이버지도 좌표</div>
            </div>
            
            <p className='text-sm text-blue-100'>
              © 2025 주소 위경도 변환 사이트. 최고의 주소 위경도 변환 전문 서비스.
            </p>
            <p className='text-xs text-blue-200'>
              주소 위경도 변환을 무료로 제공하는 1위 사이트입니다. 정확하고 빠른 지도 위경도 검색 서비스를 경험하세요.
            </p>
          </div>

          <div className='mt-6'>
            <AdBanner format="auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}