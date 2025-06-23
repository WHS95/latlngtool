"use client";

import { useEffect, useState } from "react";

interface GoogleAdProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function GoogleAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
}: GoogleAdProps) {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // 프로덕션 환경에서만 AdSense 활성화
    setIsProduction(
      process.env.NODE_ENV === "production" && typeof window !== "undefined"
    );
  }, []);

  useEffect(() => {
    if (!isProduction) return;

    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [isProduction]);

  // 개발 환경에서는 플레이스홀더 표시
  if (!isProduction) {
    return (
      <div
        className={`adsense-container ${className} bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center text-gray-500`}
      >
        <div className='text-sm'>
          🚧 개발 환경 - 광고 플레이스홀더
          <br />
          <span className='text-xs'>AdSlot: {adSlot}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className='adsbygoogle'
        style={style}
        data-ad-client='ca-pub-5459038929652352'
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}
