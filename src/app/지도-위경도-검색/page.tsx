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

export default function MapLatLngSearchPage() {
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
          setCopyMessage(`지도 위경도 검색 완료! ${results.length}개 결과를 찾았습니다!`);
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
    setCopyMessage("지도 위경도 검색 위치가 선택되었습니다!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      <header className='bg-green-600 text-white py-6 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-3xl font-bold mb-2'>지도 위경도 검색 전문 사이트</h1>
          <p className='text-green-100 text-lg'>
            🥇 지도 위경도 검색 1위 서비스 | 무료 지도 좌표 검색
          </p>
          <div className='mt-4 bg-green-500 p-3 rounded'>
            <p className='text-sm'>
              <strong>지도 위경도 검색</strong>을 무료로 제공하는 최고의 서비스! 
              정확하고 빠른 <strong>지도 위경도</strong> 좌표 검색을 경험하세요.
            </p>
          </div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-4 pt-4'>
        <AdBanner className="mb-4" format="horizontal" />
      </div>

      <main className='max-w-4xl mx-auto p-4'>
        <div className='space-y-6'>
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">🗺️ 지도 위경도 검색</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleSearch
                address={address}
                setAddress={setAddress}
                searchHistory={searchHistory}
                onSearch={handleSingleSearch}
              />
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  🎯 <strong>지도 위경도 검색 가이드:</strong> 주소, 건물명, 랜드마크 등을 입력하여 정확한 지도 위경도를 검색하세요.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold text-center text-green-800 mb-4">
                🌟 최고의 지도 위경도 검색 서비스
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <h3 className="font-semibold text-green-700 mb-2">🔍 지도 위경도 검색</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 실시간 지도 위경도 검색</li>
                    <li>• 정확한 좌표 결과</li>
                    <li>• 빠른 검색 속도</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h3 className="font-semibold text-blue-700 mb-2">📍 다양한 검색</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 주소 위경도 검색</li>
                    <li>• 건물명 위경도 검색</li>
                    <li>• 랜드마크 위경도 검색</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h3 className="font-semibold text-purple-700 mb-2">⚡ 편리한 기능</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 원클릭 좌표 복사</li>
                    <li>• CSV 파일 다운로드</li>
                    <li>• 지도 링크 생성</li>
                  </ul>
                </div>
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
                <CardTitle className='text-lg text-green-800'>
                  지도 위경도 검색 결과 ({searchResults.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {searchResults.map((result, index) => (
                    <div key={index}>
                      <div
                        className='p-3 border border-gray-200 rounded hover:bg-green-50 cursor-pointer'
                        onClick={() => handleSelectResult(result)}
                      >
                        <div className='flex justify-between items-start gap-4'>
                          <div className='flex-1'>
                            <p className='font-medium text-sm text-green-900'>
                              🗺️ {result.roadAddress}
                            </p>
                            {result.jibunAddress !== result.roadAddress && (
                              <p className='text-xs text-gray-600 mt-1'>
                                📍 {result.jibunAddress}
                              </p>
                            )}
                            <p className='text-xs text-green-600 mt-1 font-mono bg-green-50 p-1 rounded'>
                              🎯 위도: {parseFloat(result.y).toFixed(6)}, 경도: {parseFloat(result.x).toFixed(6)}
                            </p>
                          </div>
                          <div className='flex gap-1'>
                            <Button
                              size='sm'
                              variant='outline'
                              className="border-green-300 text-green-700 hover:bg-green-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(result.roadAddress, "주소");
                              }}
                            >
                              주소복사
                            </Button>
                            <Button
                              size='sm'
                              className="bg-green-600 text-white hover:bg-green-700"
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

          <AdBanner className="my-6" format="rectangle" />

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg text-green-800'>📊 지도 위경도 검색 결과 좌표</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <span className='text-sm font-medium text-gray-700'>위도 (Latitude):</span>
                  <div className='flex gap-2 mt-1'>
                    <Input
                      value={latitude.toFixed(6)}
                      readOnly
                      className='font-mono text-sm bg-green-50 border-green-200'
                    />
                    <Button
                      size='sm'
                      onClick={() => copyToClipboard(latitude.toString(), "위도")}
                      className='bg-green-600 text-white hover:bg-green-700'
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
                      className='font-mono text-sm bg-blue-50 border-blue-200'
                    />
                    <Button
                      size='sm'
                      onClick={() => copyToClipboard(longitude.toString(), "경도")}
                      className='bg-blue-600 text-white hover:bg-blue-700'
                    >
                      복사
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => copyToClipboard(`${latitude},${longitude}`, "위도,경도")}
                className='w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
              >
                지도 위경도 한번에 복사
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg text-green-800'>🗺️ 실시간 지도 위경도 검색</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                className='w-full h-[500px] border-2 border-green-200 rounded-lg shadow-lg'
              />
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  💡 <strong>지도 사용법:</strong> 지도를 드래그하거나 클릭하여 실시간으로 지도 위경도를 확인할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <AdBanner className="my-6" format="auto" />

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">❓ 지도 위경도 검색 FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-yellow-800">Q. 지도 위경도 검색은 어떻게 사용하나요?</h3>
                <p className="text-sm text-gray-700">A. 검색창에 주소나 건물명을 입력하고 검색 버튼을 클릭하면 지도에서 해당 위치의 정확한 위경도를 검색할 수 있습니다.</p>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">Q. 지도 위경도 검색 결과는 정확한가요?</h3>
                <p className="text-sm text-gray-700">A. 네이버 지도 API를 사용하여 99% 이상의 정확도로 지도 위경도 검색 결과를 제공합니다.</p>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">Q. 지도 위경도 검색은 무료인가요?</h3>
                <p className="text-sm text-gray-700">A. 네, 모든 지도 위경도 검색 서비스는 완전 무료로 제공됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation activeTab='single' />
      <StickyAd position="bottom" />

      <footer className='bg-green-600 text-white mt-12 py-8 px-4'>
        <div className='max-w-4xl mx-auto'>
          <AdBanner format="horizontal" />
          
          <div className='text-center space-y-4 mt-6'>
            <h3 className="text-xl font-bold">지도 위경도 검색 관련 서비스</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>지도 위경도 검색</div>
              <div>주소 위경도 변환</div>
              <div>무료 지도 검색</div>
              <div>좌표 찾기</div>
              <div>네이버지도 위경도</div>
              <div>구글지도 위경도</div>
              <div>GPS 좌표 검색</div>
              <div>위치 좌표 찾기</div>
            </div>
            
            <p className='text-sm text-green-100'>
              © 2025 지도 위경도 검색 사이트. 최고의 지도 위경도 검색 전문 서비스.
            </p>
            <p className='text-xs text-green-200'>
              지도 위경도 검색을 무료로 제공하는 1위 사이트입니다. 정확하고 빠른 지도 위경도 검색 서비스를 경험하세요.
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