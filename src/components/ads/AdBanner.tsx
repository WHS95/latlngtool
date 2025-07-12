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

// 전역 광고 관리
let adCounter = 0;
const initializedAds = new Set<string>();

export function AdBanner({
  className = "",
  style,
  format = "auto",
  responsive = true,
  adSlot = "2280704432",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  
  // 고유한 광고 ID 생성 (useState로 고정값 생성)
  const [adId] = useState(() => `ad-${adSlot}-${format}-${++adCounter}`);

  useEffect(() => {
    const loadAd = async () => {
      try {
        // 이미 초기화된 광고인지 확인
        if (initializedAds.has(adId) || !adRef.current) {
          return;
        }

        // AdSense 스크립트 로드 대기
        let attempts = 0;
        const maxAttempts = 20;
        
        while (attempts < maxAttempts) {
          if (typeof window !== "undefined" && window.adsbygoogle) {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 250));
          attempts++;
        }

        if (attempts >= maxAttempts) {
          console.warn("AdSense 스크립트 로드 타임아웃");
          setIsError(true);
          return;
        }

        // ins 요소 확인
        const insElement = adRef.current.querySelector('ins.adsbygoogle');
        if (!insElement) {
          console.warn("AdSense ins 요소를 찾을 수 없습니다");
          setIsError(true);
          return;
        }

        // 이미 광고가 로드되어 있는지 확인
        const status = insElement.getAttribute('data-adsbygoogle-status');
        if (status === 'done') {
          initializedAds.add(adId);
          return;
        }

        // 광고 로드 시도
        initializedAds.add(adId);
        
        try {
          // 네트워크 연결 확인
          if (navigator.onLine === false) {
            throw new Error("오프라인 상태");
          }

          // AdSense 초기화
          if (!window.adsbygoogle) {
            window.adsbygoogle = [];
          }

          // 광고 푸시
          window.adsbygoogle.push({});
          console.log(`AdSense 광고 로드 성공 (${adId})`);
          
        } catch (pushError: unknown) {
          const pushErrorMessage = pushError instanceof Error ? pushError.message : String(pushError);
          console.warn(`AdSense 로드 에러 (${adId}):`, pushErrorMessage);
          
          // 일부 에러는 정상적인 경우로 처리
          if (pushErrorMessage && (
            pushErrorMessage.includes("TagError") ||
            pushErrorMessage.includes("already have ads") ||
            pushErrorMessage.includes("400")
          )) {
            // 이미 광고가 로드된 상태로 간주
            console.log(`AdSense 정상 로드 (${adId})`);
          } else {
            setIsError(true);
            initializedAds.delete(adId);
          }
        }

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`AdSense 초기화 에러 (${adId}):`, errorMessage);
        setIsError(true);
        initializedAds.delete(adId);
      }
    };

    // 컴포넌트 마운트 후 지연 로드
    const timer = setTimeout(loadAd, 500);

    return () => {
      clearTimeout(timer);
      initializedAds.delete(adId);
    };
  }, [adId]);

  // 에러 상태에서는 빈 공간 표시
  if (isError) {
    return (
      <div 
        className={`ad-placeholder ${className}`} 
        style={{ 
          minHeight: "90px", 
          backgroundColor: "#f8f9fa", 
          border: "1px dashed #dee2e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6c757d",
          fontSize: "12px",
          ...style 
        }}
      >
        광고 로드 중...
      </div>
    );
  }

  return (
    <div 
      ref={adRef}
      className={`ad-banner ${className}`} 
      style={style}
      data-ad-id={adId}
    >
      <ins
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