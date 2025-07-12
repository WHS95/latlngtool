// "use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  // useEffect(() => {
  //   (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  // useEffect(() => {
  //   if (!isMounted) return;

  //   // AdSense 초기화
  //   const initAd = () => {
  //     try {
  //       if (typeof window !== "undefined" && window.adsbygoogle) {
  //         (window.adsbygoogle = window.adsbygoogle || []).push({});
  //       }
  //     } catch {
  //       // 에러 무시
  //     }
  //   };

  //   // 약간의 지연 후 광고 초기화
  //   const timer = setTimeout(initAd, 200);
  //   return () => clearTimeout(timer);
  // }, [isMounted]);

  // 서버 사이드 렌더링이나 마운트 전에는 null 반환
  // if (!isMounted) {
  //   return null;
  // }

  return (
    <ins
      className='adsbygoogle'
      style={{ display: "block" }}
      data-ad-client='ca-pub-5459038929652352'
      data-ad-slot='6076796440'
      data-ad-format='auto'
      data-full-width-responsive='true'
    ></ins>
  );
}
