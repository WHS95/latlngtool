"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  adSlot?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// 전역으로 로드된 광고 슬롯 추적
const loadedSlots = new Set<string>();

export function AdBanner({
  className = "",
  style,
  format = "auto",
  responsive = true,
  adSlot = "2280704432",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  // 고유 슬롯 키 생성
  const slotKey = `${adSlot}-${format}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !adRef.current) return;

    const loadAd = async () => {
      try {
        // 이미 로드된 슬롯인지 확인
        if (loadedSlots.has(slotKey)) {
          return;
        }

        // AdSense 스크립트 로드 대기
        let attempts = 0;
        while (attempts < 50) {
          if (window.adsbygoogle) break;
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.adsbygoogle) {
          console.warn('AdSense 스크립트가 로드되지 않았습니다');
          setError(true);
          return;
        }

        // 이미 광고가 표시되었는지 확인
        const adStatus = adRef.current?.getAttribute('data-adsbygoogle-status');
        if (adStatus === 'done') {
          loadedSlots.add(slotKey);
          return;
        }

        // 광고 로드
        loadedSlots.add(slotKey);
        
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (pushError: unknown) {
          // AdSense 푸시 에러 처리
          const errorMessage = pushError instanceof Error ? pushError.message : String(pushError);
          if (errorMessage?.includes('already have ads') || 
              errorMessage?.includes('TagError') ||
              errorMessage?.includes('400')) {
            // 이런 에러들은 실제로는 정상적인 경우가 많음
            console.log('AdSense 광고가 이미 로드되었거나 로드 중입니다');
          } else {
            console.warn('AdSense 푸시 에러:', pushError);
            setError(true);
            loadedSlots.delete(slotKey);
          }
        }

      } catch (error) {
        console.warn('AdSense 로드 에러:', error);
        setError(true);
        loadedSlots.delete(slotKey);
      }
    };

    const timer = setTimeout(loadAd, 1000);
    return () => {
      clearTimeout(timer);
      loadedSlots.delete(slotKey);
    };
  }, [mounted, slotKey]);

  if (!mounted) {
    return null;
  }

  if (error) {
    return (
      <div 
        className={`ad-placeholder ${className}`}
        style={{
          minHeight: '100px',
          backgroundColor: '#f8f9fa',
          border: '1px dashed #dee2e6',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6c757d',
          fontSize: '14px',
          ...style
        }}
      >
        광고 영역
      </div>
    );
  }

  return (
    <div className={`adsense-wrapper ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5459038929652352"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}