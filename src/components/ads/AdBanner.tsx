"use client";

import { useEffect } from "react";

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  adSlot?: string;
}

export function AdBanner({
  className = "",
  style,
  format = "auto",
  responsive = true,
  adSlot = "2280704432",
}: AdBannerProps) {
  
  useEffect(() => {
    try {
      // AdSense 스크립트가 로드되면 자동으로 광고가 표시됩니다
      if (typeof window !== "undefined") {
        const windowWithAds = window as typeof window & { adsbygoogle?: unknown[] };
        if (windowWithAds.adsbygoogle) {
          (windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || []).push({});
        }
      }
    } catch {
      // 에러가 발생해도 조용히 처리 (AdSense는 자체적으로 처리함)
      console.log("AdSense 자동 처리 중...");
    }
  }, []);

  return (
    <div className={`adsense-wrapper ${className}`} style={style}>
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

/* 
기존 복잡한 구현 주석처리:

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

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

  const slotKey = `${adSlot}-${format}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !adRef.current) return;

    const loadAd = async () => {
      try {
        if (loadedSlots.has(slotKey)) {
          return;
        }

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

        const adStatus = adRef.current?.getAttribute('data-adsbygoogle-status');
        if (adStatus === 'done') {
          loadedSlots.add(slotKey);
          return;
        }

        loadedSlots.add(slotKey);
        
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (pushError: unknown) {
          const errorMessage = pushError instanceof Error ? pushError.message : String(pushError);
          if (errorMessage?.includes('already have ads') || 
              errorMessage?.includes('TagError') ||
              errorMessage?.includes('400')) {
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
*/