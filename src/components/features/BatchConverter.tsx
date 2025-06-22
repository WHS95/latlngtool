"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationResult } from "@/types/app";

interface BatchConverterProps {
  batchAddresses: string;
  setBatchAddresses: (addresses: string) => void;
  batchResults: LocationResult[];
  onProcess: () => void;
  onDownloadCSV: () => void;
}

export function BatchConverter({
  batchAddresses,
  setBatchAddresses,
  batchResults,
  onProcess,
  onDownloadCSV,
}: BatchConverterProps) {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-sm font-semibold mb-2'>📋 주소 일괄 변환기</h3>
        <Textarea
          value={batchAddresses}
          onChange={(e) => setBatchAddresses(e.target.value)}
          placeholder='주소를 한 줄씩 입력하세요...&#10;예:&#10;서울특별시 중구 태평로 1가&#10;경기도 성남시 분당구 불정로 1'
          className='h-32 resize-none'
        />
        <div className='flex gap-2 mt-2'>
          <Button onClick={onProcess}>변환 시작</Button>
          {batchResults.length > 0 && (
            <Button onClick={onDownloadCSV} variant='outline'>
              CSV 다운로드
            </Button>
          )}
        </div>
      </div>

      {/* 결과 테이블 */}
      {batchResults.length > 0 && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm'>
              변환 결과 ({batchResults.length}개)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='max-h-40 overflow-y-auto'>
              <table className='w-full text-xs'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='px-2 py-1 text-left'>주소</th>
                    <th className='px-2 py-1 text-center'>위도</th>
                    <th className='px-2 py-1 text-center'>경도</th>
                  </tr>
                </thead>
                <tbody>
                  {batchResults.map((result, index) => (
                    <tr key={index} className='border-b'>
                      <td className='px-2 py-1'>{result.address}</td>
                      <td className='px-2 py-1 text-center font-mono'>
                        {result.lat.toFixed(6)}
                      </td>
                      <td className='px-2 py-1 text-center font-mono'>
                        {result.lng.toFixed(6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
