"use client";

import { useEffect } from "react";

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner({
  className = "",
  style,
  format = "auto",
  responsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // AdSense 스크립트 로드 후 광고 푸시
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`ad-banner ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5459038929652352"
        data-ad-slot="2280704432"
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}