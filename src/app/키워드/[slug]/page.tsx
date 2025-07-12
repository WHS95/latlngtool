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

interface KeywordPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const keywordData: Record<string, {
  title: string;
  description: string;
  h1: string;
  color: string;
  features: string[];
}> = {
  "주소-위경도": {
    title: "주소 위경도 찾기 사이트 | 무료 주소 위경도 서비스",
    description: "주소 위경도를 무료로 찾아드리는 전문 사이트입니다. 정확하고 빠른 주소 위경도 검색 서비스를 제공합니다.",
    h1: "주소 위경도 찾기 전문 사이트",
    color: "purple",
    features: ["주소 위경도 찾기", "무료 주소 검색", "정확한 위경도", "빠른 검색"]
  },
  "좌표-변환": {
    title: "좌표 변환 사이트 | 무료 좌표 변환 서비스",
    description: "좌표 변환을 무료로 제공하는 전문 사이트입니다. 다양한 좌표계 변환을 지원합니다.",
    h1: "좌표 변환 전문 사이트",
    color: "red",
    features: ["좌표 변환", "무료 변환", "다양한 좌표계", "정확한 변환"]
  },
  "위경도-찾기": {
    title: "위경도 찾기 사이트 | 무료 위경도 찾기 서비스",
    description: "위경도 찾기를 무료로 제공하는 전문 사이트입니다. 주소로 위경도를 쉽게 찾을 수 있습니다.",
    h1: "위경도 찾기 전문 사이트",
    color: "indigo",
    features: ["위경도 찾기", "주소 검색", "무료 서비스", "정확한 위치"]
  },
  "GPS-좌표": {
    title: "GPS 좌표 찾기 사이트 | 무료 GPS 좌표 서비스",
    description: "GPS 좌표를 무료로 찾아드리는 전문 사이트입니다. 정확한 GPS 좌표 정보를 제공합니다.",
    h1: "GPS 좌표 찾기 전문 사이트",
    color: "orange",
    features: ["GPS 좌표", "위치 확인", "무료 서비스", "정확한 좌표"]
  }
};

export default function KeywordPage({ params }: KeywordPageProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude, initMap, updateMapLocation } = useNaverMap(mapRef);
  const { searchHistory, searchAddressMultiple } = useGeocoding();

  const [address, setAddress] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [slug, setSlug] = useState<string>("");

  const keywordInfo = keywordData[slug] || keywordData["주소-위경도"];

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

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

  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.y);
    const lng = parseFloat(result.x);
    updateMapLocation(lat, lng);
    setCopyMessage("위치가 선택되었습니다!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const colorClasses = {
    purple: "bg-purple-600 border-purple-200 text-purple-800",
    red: "bg-red-600 border-red-200 text-red-800",
    indigo: "bg-indigo-600 border-indigo-200 text-indigo-800",
    orange: "bg-orange-600 border-orange-200 text-orange-800",
  };

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      <header className={`${colorClasses[keywordInfo.color as keyof typeof colorClasses]?.split(' ')[0] || 'bg-purple-600'} text-white py-6 px-4`}>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-3xl font-bold mb-2'>{keywordInfo.h1}</h1>
          <p className='text-lg opacity-90'>
            🥇 {slug.replace('-', ' ')} 1위 서비스 | 무료 전문 사이트
          </p>
          <div className='mt-4 bg-black bg-opacity-20 p-3 rounded'>
            <p className='text-sm'>
              {keywordInfo.description}
            </p>
          </div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-4 pt-4'>
        <AdBanner className="mb-4" format="horizontal" />
      </div>

      <main className='max-w-4xl mx-auto p-4'>
        <div className='space-y-6'>
          <Card className={`border-2 ${colorClasses[keywordInfo.color as keyof typeof colorClasses]?.split(' ')[1] || 'border-purple-200'}`}>
            <CardHeader>
              <CardTitle className={colorClasses[keywordInfo.color as keyof typeof colorClasses]?.split(' ')[2] || 'text-purple-800'}>
                🔍 {slug.replace('-', ' ')} 검색
              </CardTitle>
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
                  💡 <strong>{slug.replace('-', ' ')} 팁:</strong> 정확한 주소를 입력하면 더 정확한 결과를 얻을 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <AdBanner className="my-4" format="horizontal" />

          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold text-center text-blue-800 mb-4">
                🏆 최고의 {slug.replace('-', ' ')} 서비스
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">✅ 주요 기능</h3>
                  <ul className="space-y-1 text-gray-700">
                    {keywordInfo.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">🎯 서비스 특징</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 완전 무료 서비스</li>
                    <li>• 99% 정확도</li>
                    <li>• 빠른 처리 속도</li>
                    <li>• 모바일 최적화</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {copyMessage && (
            <div className='p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm'>
              {copyMessage}
            </div>
          )}

          {showResults && searchResults.length > 0 && (
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg text-blue-800'>
                  {slug.replace('-', ' ')} 검색 결과 ({searchResults.length}개)
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
                                copyToClipboard(`${result.y},${result.x}`, "좌표");
                              }}
                            >
                              좌표복사
                            </Button>
                          </div>
                        </div>
                      </div>
                      {(index + 1) % 3 === 0 && index < searchResults.length - 1 && (
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
              <CardTitle className='text-lg text-blue-800'>📍 {slug.replace('-', ' ')} 결과 좌표</CardTitle>
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
                className='w-full mt-4 bg-gradient-to-r from-blue-600 to-green-600 text-white'
              >
                위도,경도 한번에 복사
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg text-blue-800'>🗺️ 지도</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                className='w-full h-[400px] border-2 border-blue-200 rounded'
              />
            </CardContent>
          </Card>

          <AdBanner className="my-6" format="auto" />
        </div>
      </main>

      <BottomNavigation activeTab='single' />
      <StickyAd position="bottom" />

      <footer className={`${colorClasses[keywordInfo.color as keyof typeof colorClasses]?.split(' ')[0] || 'bg-purple-600'} text-white mt-12 py-8 px-4`}>
        <div className='max-w-4xl mx-auto'>
          <AdBanner format="horizontal" />
          
          <div className='text-center space-y-4 mt-6'>
            <h3 className="text-xl font-bold">{slug.replace('-', ' ')} 관련 서비스</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>주소 위경도 변환</div>
              <div>지도 위경도 검색</div>
              <div>좌표 변환</div>
              <div>위경도 찾기</div>
              <div>GPS 좌표</div>
              <div>무료 변환</div>
              <div>온라인 도구</div>
              <div>정확한 좌표</div>
            </div>
            
            <p className='text-sm opacity-90'>
              © 2025 {slug.replace('-', ' ')} 사이트. 최고의 {slug.replace('-', ' ')} 전문 서비스.
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