"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapLinks } from "@/types/app";

interface LinkGeneratorProps {
  latitude: number;
  longitude: number;
  mapLinks: MapLinks;
  onCopy: (text: string, type: string) => void;
}

export function LinkGenerator({
  latitude,
  longitude,
  mapLinks,
  onCopy,
}: LinkGeneratorProps) {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-sm font-semibold mb-2'>🔗 지도 링크 생성기</h3>
        <p className='text-xs text-gray-600 mb-3'>
          현재 좌표: {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </p>
      </div>

      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <span className='text-sm w-16'>구글:</span>
          <Input
            type='text'
            value={mapLinks.googleMapsUrl}
            readOnly
            className='flex-1 text-xs font-mono bg-gray-50'
          />
          <Button
            size='sm'
            onClick={() => onCopy(mapLinks.googleMapsUrl, "구글 링크")}
            className='px-2 text-xs'
          >
            복사
          </Button>
          <Button size='sm' asChild className='px-2 text-xs'>
            <a
              href={mapLinks.googleMapsUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              열기
            </a>
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm w-16'>카카오:</span>
          <Input
            type='text'
            value={mapLinks.kakaoMapUrl}
            readOnly
            className='flex-1 text-xs font-mono bg-gray-50'
          />
          <Button
            size='sm'
            onClick={() => onCopy(mapLinks.kakaoMapUrl, "카카오 링크")}
            className='px-2 text-xs'
          >
            복사
          </Button>
          <Button size='sm' asChild className='px-2 text-xs'>
            <a
              href={mapLinks.kakaoMapUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              열기
            </a>
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm w-16'>네이버:</span>
          <Input
            type='text'
            value={mapLinks.naverMapUrl}
            readOnly
            className='flex-1 text-xs font-mono bg-gray-50'
          />
          <Button
            size='sm'
            onClick={() => onCopy(mapLinks.naverMapUrl, "네이버 링크")}
            className='px-2 text-xs'
          >
            복사
          </Button>
          <Button size='sm' asChild className='px-2 text-xs'>
            <a
              href={mapLinks.naverMapUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              열기
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
