"use client";

import { useState, useEffect } from "react";
import { AdBanner } from "./AdBanner";

interface StickyAdProps {
  position?: "top" | "bottom";
  className?: string;
}

export function StickyAd({ position = "bottom", className = "" }: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosable] = useState(true);

  useEffect(() => {
    // 페이지 로드 후 3초 뒤에 스티키 광고 표시
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 10분 후에 다시 표시
    setTimeout(() => {
      setIsVisible(true);
    }, 600000);
  };

  if (!isVisible) return null;

  const positionClasses = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-16 left-0 right-0 z-50 md:bottom-0"
  };

  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-2 relative">
          {isClosable && (
            <button
              onClick={handleClose}
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 text-lg font-bold z-10"
              aria-label="광고 닫기"
            >
              ×
            </button>
          )}
          <AdBanner format="horizontal" responsive={true} />
        </div>
      </div>
    </div>
  );
}