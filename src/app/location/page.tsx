"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

export default function LocationPage() {
  const [latitude, setLatitude] = useState<number>(37.5665);
  const [longitude, setLongitude] = useState<number>(126.978);
  const [copyMessage, setCopyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setCopyMessage("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      setTimeout(() => setCopyMessage(""), 3000);
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat);
        setLongitude(lng);
        setCopyMessage("현재 위치를 찾았습니다!");
        setTimeout(() => setCopyMessage(""), 2000);
        setIsLoading(false);
      },
      (error) => {
        console.error("위치 정보 가져오기 실패:", error);
        setCopyMessage(
          "위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요."
        );
        setTimeout(() => setCopyMessage(""), 3000);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      <header className='bg-white border-b border-gray-200 py-4 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold text-center'>
            현재 내 위치 확인기
          </h1>
          <p className='text-gray-600 text-center text-sm mt-2'>
            GPS를 통해 현재 위치를 확인하고 정확한 좌표를 얻으세요
          </p>
        </div>
      </header>

      <main className='max-w-4xl mx-auto p-4'>
        <div className='space-y-6'>
          {/* 위치 찾기 버튼 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>위치 확인</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleGetCurrentLocation}
                disabled={isLoading}
                className='w-full'
              >
                {isLoading ? "위치 찾는 중..." : "현재 위치 찾기"}
              </Button>
              <p className='text-sm text-gray-600 mt-2 text-center'>
                브라우저에서 위치 권한을 허용해주세요
              </p>
            </CardContent>
          </Card>

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

          {/* 지도 정보 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>지도에서 보기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <a
                  href={`https://map.naver.com/v5/?c=${longitude},${latitude},15,0,0,0,dh`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block w-full p-3 text-center bg-green-500 text-white rounded hover:bg-green-600'
                >
                  네이버 지도에서 보기
                </a>
                <a
                  href={`https://maps.google.com/?q=${latitude},${longitude}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block w-full p-3 text-center bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  구글 지도에서 보기
                </a>
                <a
                  href={`https://map.kakao.com/link/map/현재위치,${latitude},${longitude}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block w-full p-3 text-center bg-yellow-500 text-white rounded hover:bg-yellow-600'
                >
                  카카오맵에서 보기
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation activeTab='location' />
    </div>
  );
}
