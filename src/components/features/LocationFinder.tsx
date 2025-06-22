"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserLocation } from "@/types/app";

interface LocationFinderProps {
  userLocation: UserLocation | null;
  onGetCurrentLocation: () => void;
}

export function LocationFinder({
  userLocation,
  onGetCurrentLocation,
}: LocationFinderProps) {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-sm font-semibold mb-2'>📍 현재 내 위치 확인기</h3>
        <Button onClick={onGetCurrentLocation}>내 위치 찾기</Button>
      </div>

      {userLocation && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm'>현재 위치</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div>
                <span className='text-gray-600'>위도:</span>
                <span className='font-mono ml-1'>
                  {userLocation.lat.toFixed(6)}
                </span>
              </div>
              <div>
                <span className='text-gray-600'>경도:</span>
                <span className='font-mono ml-1'>
                  {userLocation.lng.toFixed(6)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
