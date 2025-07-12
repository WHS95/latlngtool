"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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

// 전역 상태로 로드된 광고 추적
const loadedAds = new Set<string>();

export function AdBanner({
  className = "",
  style,
  format = "auto",
  responsive = true,
  adSlot = "2280704432",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // 고유한 광고 ID 생성 (adSlot + format 조합)
  const adId = `${adSlot}-${format}-${Math.random().toString(36).substr(2, 5)}`;

  const loadAd = useCallback(() => {
    try {
      // 이미 로드된 광고인지 확인
      if (adLoaded || !adRef.current || loadedAds.has(adId)) {
        return;
      }

      // ins 요소가 이미 광고가 로드되어 있는지 확인
      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (insElement) {
        const status = insElement.getAttribute('data-adsbygoogle-status');
        if (status && status !== 'error') {
          setAdLoaded(true);
          loadedAds.add(adId);
          return;
        }
      }

      // AdSense 스크립트가 로드되어 있는지 확인
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // 광고 ID를 전역 세트에 추가
        loadedAds.add(adId);
        
        // 광고 푸시
        setTimeout(() => {
          try {
            (window.adsbygoogle as unknown[]).push({});
            setAdLoaded(true);
          } catch (error) {
            console.error("AdSense push error:", error);
            setIsError(true);
            loadedAds.delete(adId);
            
            // 에러 발생 시 재시도 (한 번만)
            setTimeout(() => {
              if (!adLoaded && !loadedAds.has(adId)) {
                try {
                  loadedAds.add(adId);
                  (window.adsbygoogle as unknown[]).push({});
                  setAdLoaded(true);
                  setIsError(false);
                } catch (retryError) {
                  console.error("AdSense retry error:", retryError);
                  loadedAds.delete(adId);
                }
              }
            }, 2000);
          }
        }, 100);
      } else {
        // AdSense 스크립트가 아직 로드되지 않은 경우
        setTimeout(() => loadAd(), 500);
      }
    } catch (error) {
      console.error("AdSense load error:", error);
      setIsError(true);
      loadedAds.delete(adId);
    }
  }, [adLoaded, adId]);

  useEffect(() => {
    // 컴포넌트 마운트 후 광고 로드
    const timer = setTimeout(loadAd, 300);

    return () => {
      clearTimeout(timer);
      // 컴포넌트 언마운트 시 정리
      loadedAds.delete(adId);
    };
  }, [loadAd, adId]);

  // 에러 상태일 때는 빈 div 렌더링
  if (isError) {
    return <div className={`ad-banner-error ${className}`} style={style} />;
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
        data-ad-unique-id={adId} // 고유 식별자 추가
      />
    </div>
  );
}