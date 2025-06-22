# 위도 경도 찾기 웹서비스

빠르고 쉬운 위치 좌표 확인 서비스입니다.

## 주요 기능

- 🗺️ **주소 검색**: 주소를 입력하면 지도에서 위치를 확인하고 위도/경도를 표시
- 📍 **실시간 좌표**: 지도를 이동하면 실시간으로 위도/경도 업데이트
- 📋 **클립보드 복사**: 위도, 경도를 개별 또는 한번에 복사 가능
- 📚 **검색 이력**: 최근 검색한 주소 5개까지 저장 (세션 스토리지)
- 🚫 **사용량 제한**: 1분에 20회 요청 제한으로 남용 방지
- 📱 **모바일 대응**: 완벽한 반응형 디자인

## 기술 스택

- **Frontend**: Next.js 15 (App Router)
- **지도 API**: Naver Maps JavaScript API v3
- **스타일링**: Tailwind CSS
- **배포**: 정적 배포 (Vercel, Netlify 등)

## 설치 및 실행

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone [repository-url]
cd findlatlang
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 네이버 지도 API 키를 설정하세요:

```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=YOUR_NAVER_MAP_CLIENT_ID
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 4. 빌드 및 배포

```bash
npm run build
```

## 네이버 지도 API 설정

1. [네이버 클라우드 플랫폼](https://console.ncloud.com/)에 가입
2. Application을 등록하고 Maps JavaScript API v3 사용 설정
3. Client ID를 발급받아 환경 변수에 설정

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 메타데이터 및 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
public/
├── robots.txt              # SEO용 robots.txt
└── sitemap.xml             # SEO용 사이트맵
```

## SEO 최적화

- 메타 태그 최적화 (title, description, keywords)
- Open Graph 및 Twitter Card 지원
- 한국어 콘텐츠 최적화
- robots.txt 및 sitemap.xml 제공

## 문의

- 이메일: support@findlatlng.com
- 주요 키워드: 위도, 경도, 좌표, 좌표 찾기, 위치 찾기, 위치 좌표, 네이버 지도 좌표

## 라이선스

Private License - Find LatLng Service
