"use client";

import { useState, useEffect, useRef } from "react";

// 타입 정의
interface NaverMap {
  setCenter: (latlng: NaverLatLng) => void;
  getCenter: () => NaverLatLng;
}

interface NaverLatLng {
  lat: () => number;
  lng: () => number;
}

interface Marker {
  setPosition: (latlng: NaverLatLng) => void;
}

interface NaverClickEvent {
  coord: NaverLatLng;
}

interface NaverMapsAPI {
  maps: {
    LatLng: new (lat: number, lng: number) => NaverLatLng;
    Map: new (element: HTMLElement, options: unknown) => NaverMap;
    Marker: new (options: unknown) => Marker;
    Event: {
      addListener: (
        target: unknown,
        eventName: string,
        listener: ((e: NaverClickEvent) => void) | (() => void)
      ) => void;
    };
    Service: {
      geocode: (
        options: { query: string },
        callback: (status: string, response: GeocodeResponse) => void
      ) => void;
      Status: {
        ERROR: string;
      };
    };
  };
}

interface GeocodeResponse {
  v2: {
    addresses: Array<{
      x: string;
      y: string;
      roadAddress?: string;
      jibunAddress?: string;
      englishAddress?: string;
      addressElements?: Array<{
        types: string[];
        longName: string;
        shortName: string;
        code: string;
      }>;
      distance?: number;
    }>;
  };
}

declare global {
  interface Window {
    naver: NaverMapsAPI;
  }
}

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<NaverMap | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number>(37.5665);
  const [longitude, setLongitude] = useState<number>(126.978);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState("");
  const [rateLimitMessage, setRateLimitMessage] = useState("");
  const [activeTab, setActiveTab] = useState<
    "single" | "batch" | "location" | "links"
  >("single");
  const [batchAddresses, setBatchAddresses] = useState("");
  const [batchResults, setBatchResults] = useState<
    Array<{ address: string; lat: number; lng: number }>
  >([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // 페이지 로드 시 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (window.naver && mapRef.current) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울시청
          zoom: 15,
          mapTypeControl: true,
        };

        const naverMap = new window.naver.maps.Map(mapRef.current, mapOptions);

        // 마커 생성
        const naverMarker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(37.5665, 126.978),
          map: naverMap,
        });

        setMap(naverMap);
        setMarker(naverMarker);

        // 지도 클릭 이벤트 리스너 (클릭한 곳에 마커 이동)
        window.naver.maps.Event.addListener(
          naverMap,
          "click",
          (e: NaverClickEvent) => {
            const clickedLatLng = e.coord;
            setLatitude(clickedLatLng.lat());
            setLongitude(clickedLatLng.lng());
            naverMarker.setPosition(clickedLatLng);
          }
        );

        // 지도 중앙 변경 시에도 좌표 업데이트 (주소 검색 등)
        window.naver.maps.Event.addListener(naverMap, "center_changed", () => {
          const center = naverMap.getCenter();
          setLatitude(center.lat());
          setLongitude(center.lng());
        });
      }
    };

    // 네이버 지도 API 로딩 대기
    const checkNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        initMap();
      } else {
        setTimeout(checkNaverMaps, 100);
      }
    };

    checkNaverMaps();

    // 검색 이력 불러오기
    const savedHistory = sessionStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 사용량 제한 체크
  const checkRateLimit = () => {
    const now = Date.now();
    const requests = JSON.parse(sessionStorage.getItem("requests") || "[]");
    const oneMinuteAgo = now - 60000;

    // 1분 이내 요청 필터링
    const recentRequests = requests.filter(
      (time: number) => time > oneMinuteAgo
    );

    if (recentRequests.length >= 20) {
      setRateLimitMessage(
        "1분에 20회 이상 요청하실 수 없습니다. 잠시 후 다시 시도해주세요."
      );
      return false;
    }

    // 현재 요청 시간 추가
    recentRequests.push(now);
    sessionStorage.setItem("requests", JSON.stringify(recentRequests));
    setRateLimitMessage("");
    return true;
  };

  // 주소 캐시 관리
  const getAddressCache = () => {
    try {
      const cache = localStorage.getItem("addressCache");
      return cache ? JSON.parse(cache) : {};
    } catch {
      return {};
    }
  };

  const setAddressCache = (address: string, lat: number, lng: number) => {
    try {
      const cache = getAddressCache();
      cache[address] = { lat, lng, timestamp: Date.now() };

      // 캐시 크기 제한 (최대 100개)
      const entries = Object.entries(cache) as [
        string,
        { lat: number; lng: number; timestamp: number }
      ][];
      if (entries.length > 100) {
        // 오래된 항목부터 삭제
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const newCache: Record<
          string,
          { lat: number; lng: number; timestamp: number }
        > = {};
        entries.slice(-100).forEach(([key, value]) => {
          newCache[key] = value;
        });
        localStorage.setItem("addressCache", JSON.stringify(newCache));
      } else {
        localStorage.setItem("addressCache", JSON.stringify(cache));
      }
    } catch (error) {
      console.error("캐시 저장 실패:", error);
    }
  };

  // 주소 검색
  const searchAddress = async () => {
    if (!address.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }

    if (!checkRateLimit()) return;

    // 캐시에서 먼저 확인
    const cache = getAddressCache();
    if (cache[address]) {
      const { lat, lng } = cache[address];

      if (map && marker) {
        const latlng = new window.naver.maps.LatLng(lat, lng);
        map.setCenter(latlng);
        marker.setPosition(latlng);
        setLatitude(lat);
        setLongitude(lng);
      }

      // 검색 이력 저장
      const newHistory = [
        address,
        ...searchHistory.filter((item) => item !== address),
      ].slice(0, 5);
      setSearchHistory(newHistory);
      sessionStorage.setItem("searchHistory", JSON.stringify(newHistory));

      // 캐시 사용 표시
      setCopyMessage("캐시된 결과를 사용했습니다 💾");
      setTimeout(() => setCopyMessage(""), 2000);
      return;
    }

    // 네이버 지도 API가 로드되었는지 확인
    if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
      alert(
        "네이버 지도 API가 로드되지 않았습니다. API 키를 확인해주세요.\n\n환경 변수 설정:\nNEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_api_key"
      );
      return;
    }

    if (window.naver && window.naver.maps.Service) {
      window.naver.maps.Service.geocode(
        {
          query: address,
        },
        (status: string, response: GeocodeResponse) => {
          if (status === window.naver.maps.Service.Status.ERROR) {
            setRateLimitMessage(
              "❌ 주소를 찾을 수 없습니다. 정확한 주소를 입력해 주세요."
            );
            setTimeout(() => setRateLimitMessage(""), 3000);
            return;
          }

          // 검색 결과 확인
          if (
            !response.v2 ||
            !response.v2.addresses ||
            response.v2.addresses.length === 0
          ) {
            setRateLimitMessage(
              "🔍 검색 결과가 없습니다. 다른 키워드로 검색해 보세요."
            );
            setTimeout(() => setRateLimitMessage(""), 3000);
            return;
          }

          const result = response.v2.addresses[0];

          // 좌표 정보가 없는 경우
          if (!result.x || !result.y) {
            setRateLimitMessage(
              "📍 해당 주소의 정확한 위치를 찾을 수 없습니다."
            );
            setTimeout(() => setRateLimitMessage(""), 3000);
            return;
          }

          // addressElements가 없거나 비어있는 경우 (불완전한 주소)
          if (!result.addressElements || result.addressElements.length === 0) {
            setRateLimitMessage(
              "⚠️ 불완전한 주소 정보입니다. 더 구체적인 주소를 입력해 주세요."
            );
            setTimeout(() => setRateLimitMessage(""), 3000);
            return;
          }

          const lat = parseFloat(result.y);
          const lng = parseFloat(result.x);

          // 좌표 유효성 검사
          if (isNaN(lat) || isNaN(lng)) {
            setRateLimitMessage("❌ 좌표 정보가 올바르지 않습니다.");
            setTimeout(() => setRateLimitMessage(""), 3000);
            return;
          }

          const latlng = new window.naver.maps.LatLng(lat, lng);

          if (map && marker) {
            map.setCenter(latlng);
            marker.setPosition(latlng);
            setLatitude(lat);
            setLongitude(lng);
          }

          // 캐시에 저장
          setAddressCache(address, lat, lng);

          // 검색 이력 저장
          const newHistory = [
            address,
            ...searchHistory.filter((item) => item !== address),
          ].slice(0, 5);
          setSearchHistory(newHistory);
          sessionStorage.setItem("searchHistory", JSON.stringify(newHistory));

          // 성공 메시지
          setCopyMessage(
            `✅ "${
              result.roadAddress || result.jibunAddress
            }" 위치를 찾았습니다!`
          );
          setTimeout(() => setCopyMessage(""), 3000);
        }
      );
    }
  };

  // 클립보드 복사
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${type}가 복사되었습니다!`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
      setCopyMessage("복사에 실패했습니다.");
    }
  };

  return (
    <div className='min-h-screen bg-white text-black'>
      {/* 헤더 */}
      <header className='bg-white border-b border-gray-200 py-2 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-xl sm:text-2xl font-bold text-center'>
            위도 경도 찾기
          </h1>
          <p className='text-gray-600 text-center text-sm mt-1'>
            주소 입력 또는 지도 클릭으로 위치 좌표 확인
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className='max-w-6xl mx-auto p-3 sm:p-4'>
        {/* 컴팩트한 레이아웃 */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3'>
          {/* 좌측: 검색 입력 */}
          <div className='lg:col-span-2'>
            <div className='flex gap-2 mb-2'>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchAddress()}
                placeholder='주소를 입력하세요 (예: 서울특별시 중구 태평로 1가)'
                className='flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              />
              <button
                onClick={searchAddress}
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap'
              >
                검색
              </button>
            </div>

            {/* 검색 이력 */}
            {searchHistory.length > 0 && (
              <div className='mb-2'>
                <p className='text-xs text-gray-600 mb-1'>최근:</p>
                <div className='flex flex-wrap gap-1'>
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setAddress(item)}
                      className='px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors'
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 사용량 제한 메시지 */}
            {rateLimitMessage && (
              <div className='p-2 bg-red-100 border border-red-300 rounded text-red-700 text-xs'>
                {rateLimitMessage}
              </div>
            )}
          </div>

          {/* 우측: 현재 위치 좌표 */}
          <div className='bg-gray-50 p-3 rounded'>
            <h3 className='text-sm font-semibold mb-2'>현재 위치 좌표</h3>

            <div className='space-y-2'>
              <div>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  위도
                </label>
                <div className='flex gap-1'>
                  <input
                    type='text'
                    value={latitude.toFixed(6)}
                    readOnly
                    className='flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono'
                  />
                  <button
                    onClick={() => copyToClipboard(latitude.toString(), "위도")}
                    className='px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs'
                  >
                    복사
                  </button>
                </div>
              </div>

              <div>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  경도
                </label>
                <div className='flex gap-1'>
                  <input
                    type='text'
                    value={longitude.toFixed(6)}
                    readOnly
                    className='flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono'
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(longitude.toString(), "경도")
                    }
                    className='px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs'
                  >
                    복사
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(`${latitude},${longitude}`, "위도,경도")
                }
                className='w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium'
              >
                위도,경도 복사
              </button>

              {/* 복사 완료 메시지 */}
              {copyMessage && (
                <div className='p-1 bg-green-100 border border-green-300 rounded text-green-700 text-xs text-center'>
                  {copyMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 지도 영역 - 높이 줄임 */}
        <div className='mb-3'>
          <div
            ref={mapRef}
            className='w-full h-[300px] sm:h-[350px] border border-gray-300 rounded'
          />
        </div>

        {/* 문의하기 - 컴팩트 */}
        <div className='bg-gray-50 p-2 rounded text-center'>
          <span className='text-xs text-gray-600'>문의: </span>
          <code className='text-xs bg-white px-1 py-0.5 rounded border mx-1'>
            support@findlatlng.com
          </code>
          <button
            onClick={() =>
              copyToClipboard("support@findlatlng.com", "이메일 주소")
            }
            className='px-2 py-0.5 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors mx-1'
          >
            복사
          </button>
          <a
            href='mailto:support@findlatlng.com?subject=위도경도 찾기 서비스 문의'
            className='px-2 py-0.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-xs'
          >
            메일
          </a>
        </div>
      </main>

      {/* 푸터 */}
      <footer className='bg-gray-100 mt-12 py-6 px-4 sm:px-6'>
        <div className='max-w-4xl mx-auto text-center text-gray-600 text-sm'>
          <p>© 2025 위도경도 찾기 서비스. 빠르고 쉬운 위치 좌표 확인.</p>
          <p className='mt-1'>
            지도를 이동하거나 주소를 검색하여 정확한 위치 좌표를 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
