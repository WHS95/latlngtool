// 애플리케이션 타입 정의
export type TabType = "single" | "batch" | "location" | "links";

export interface LocationResult {
  address: string;
  lat: number;
  lng: number;
}

export interface SearchResult {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  x: string;
  y: string;
  distance: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface MapLinks {
  googleMapsUrl: string;
  kakaoMapUrl: string;
  naverMapUrl: string;
}

export interface CacheItem {
  lat: number;
  lng: number;
  timestamp: number;
}
