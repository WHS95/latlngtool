"use client";

import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { useGeocoding } from "@/hooks/useGeocoding";
import { BatchConverter } from "@/components/features/BatchConverter";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { AdBanner } from "@/components/ads/AdBanner";
import { LocationResult } from "@/types/app";

export default function BatchPage() {
  const { searchAddress: searchSingleAddress } = useGeocoding();

  // 상태 관리
  const [copyMessage, setCopyMessage] = useState("");
  const [batchAddresses, setBatchAddresses] = useState("");
  const [batchResults, setBatchResults] = useState<LocationResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  //   // 클립보드 복사 함수
  //   const copyToClipboard = async (text: string, type: string) => {
  //     try {
  //       await navigator.clipboard.writeText(text);
  //       setCopyMessage(`${type}가 복사되었습니다!`);
  //       setTimeout(() => setCopyMessage(""), 2000);
  //     } catch (err) {
  //       console.error("복사 실패:", err);
  //       setCopyMessage("복사에 실패했습니다.");
  //     }
  //   };

  // 일괄 주소 변환
  const handleBatchProcess = async () => {
    if (!batchAddresses.trim()) {
      setCopyMessage("주소를 입력해주세요.");
      setTimeout(() => setCopyMessage(""), 2000);
      return;
    }

    setIsProcessing(true);
    const addresses = batchAddresses.split("\n").filter((addr) => addr.trim());
    const results: LocationResult[] = [];

    for (const addr of addresses) {
      try {
        await new Promise<void>((resolve) => {
          searchSingleAddress(
            addr.trim(),
            (lat, lng) => {
              results.push({ address: addr.trim(), lat, lng });
              resolve();
            },
            (error) => {
              console.error(`${addr} 검색 실패:`, error);
              resolve();
            }
          );
        });

        // API 호출 간격 조절
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`${addr} 처리 중 오류:`, error);
      }
    }

    setBatchResults(results);
    setIsProcessing(false);
    setCopyMessage(`${results.length}개 주소를 변환했습니다.`);
    setTimeout(() => setCopyMessage(""), 2000);
  };

  // CSV 다운로드
  const handleDownloadCSV = () => {
    if (batchResults.length === 0) return;

    const csvContent = [
      ["주소", "위도", "경도"],
      ...batchResults.map((result) => [
        result.address,
        result.lat.toString(),
        result.lng.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `위도경도_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);

    setCopyMessage("CSV 파일이 다운로드되었습니다!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      {/* 헤더 */}
      <header className='bg-white border-b border-gray-200 py-4 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold text-center'>주소 일괄 변환기</h1>
          <p className='text-gray-600 text-center text-sm mt-2'>
            여러 주소를 한 번에 위도/경도로 변환하고 CSV로 다운로드
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className='max-w-6xl mx-auto p-4'>
        <div className='space-y-6'>
          <BatchConverter
            batchAddresses={batchAddresses}
            setBatchAddresses={setBatchAddresses}
            batchResults={batchResults}
            onProcess={handleBatchProcess}
            onDownloadCSV={handleDownloadCSV}
          />

          {/* 상단 광고 */}
          <AdBanner />
        </div>

        {/* 상태 메시지 */}
        {copyMessage && (
          <div className='mt-4 p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm'>
            {copyMessage}
          </div>
        )}

        {/* 로딩 상태 */}
        {isProcessing && (
          <div className='mt-4 p-3 bg-blue-100 border border-blue-300 rounded text-blue-700 text-sm'>
            주소를 변환 중입니다... 잠시만 기다려주세요.
          </div>
        )}

        {/* 하단 광고 */}
        <AdBanner />

        {/* 문의하기 */}
        {/* <Card className='mt-6'>
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
      <BottomNavigation activeTab='batch' />
    </div>
  );
}
