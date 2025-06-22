"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SingleSearchProps {
  address: string;
  setAddress: (address: string) => void;
  searchHistory: string[];
  onSearch: () => void;
}

export function SingleSearch({
  address,
  setAddress,
  searchHistory,
  onSearch,
}: SingleSearchProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-sm font-semibold mb-2'>🔍 주소 검색</h3>
        <div className='flex gap-2'>
          <Input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='주소를 입력하세요 (예: 서울특별시 중구 태평로 1가)'
            className='flex-1'
          />
          <Button onClick={onSearch}>검색</Button>
        </div>
      </div>

      {/* 검색 이력 */}
      {searchHistory.length > 0 && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm'>최근 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-2'>
              {searchHistory.map((item, index) => (
                <Button
                  key={index}
                  variant='outline'
                  size='sm'
                  onClick={() => setAddress(item)}
                  className='text-xs'
                >
                  {item}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
