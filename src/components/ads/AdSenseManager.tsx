"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AdSenseContextType {
  isLoaded: boolean;
  isInitialized: boolean;
  loadedAds: Set<string>;
  registerAd: (adId: string) => boolean;
  unregisterAd: (adId: string) => void;
}

const AdSenseContext = createContext<AdSenseContextType | null>(null);

export function AdSenseProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadedAds, setLoadedAds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // AdSense 스크립트 로드 확인
    const checkAdSenseLoaded = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        setIsLoaded(true);
        setIsInitialized(true);
      }
    };

    // 즉시 확인
    checkAdSenseLoaded();

    // 스크립트가 아직 로드되지 않았다면 주기적으로 확인
    if (!isLoaded) {
      const interval = setInterval(() => {
        checkAdSenseLoaded();
        if (isLoaded) {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  const registerAd = (adId: string): boolean => {
    if (loadedAds.has(adId)) {
      console.warn(`Ad with ID ${adId} is already registered`);
      return false;
    }
    
    setLoadedAds(prev => new Set(prev).add(adId));
    return true;
  };

  const unregisterAd = (adId: string): void => {
    setLoadedAds(prev => {
      const newSet = new Set(prev);
      newSet.delete(adId);
      return newSet;
    });
  };

  return (
    <AdSenseContext.Provider
      value={{
        isLoaded,
        isInitialized,
        loadedAds,
        registerAd,
        unregisterAd,
      }}
    >
      {children}
    </AdSenseContext.Provider>
  );
}

export function useAdSense() {
  const context = useContext(AdSenseContext);
  if (!context) {
    throw new Error("useAdSense must be used within AdSenseProvider");
  }
  return context;
}