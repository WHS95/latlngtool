# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs with Turbopack)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Lint**: `npm run lint`

## Project Overview

This is a Korean language web service for finding latitude and longitude coordinates from addresses. Built with Next.js 15, it provides fast and easy location coordinate lookup using Naver Maps API.

## Architecture & Key Components

### Core Features
- **Single address search**: Convert address to lat/lng coordinates
- **Batch processing**: Convert multiple addresses at once with CSV export
- **Current location**: Get user's current GPS coordinates
- **Map links generation**: Generate Google Maps, Kakao Map, and Naver Map URLs
- **Search history**: Store recent searches in sessionStorage (max 5 items)
- **Rate limiting**: Client-side rate limiting (20 requests per minute)
- **Address caching**: localStorage cache for searched addresses (max 100 items)

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Maps API**: Naver Maps JavaScript API v3 with geocoder
- **UI**: shadcn/ui components + Tailwind CSS
- **Fonts**: Geist Sans and Geist Mono
- **Analytics**: Vercel Analytics and Speed Insights
- **Monetization**: Google AdSense integration

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── batch/             # Batch converter page
│   ├── blog/              # Blog page
│   ├── community/         # Community page
│   ├── links/             # Link generator page
│   ├── location/          # Current location page
│   └── page.tsx           # Main page
├── components/
│   ├── ads/               # Google AdSense components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── ui/                # shadcn/ui components
├── hooks/
│   ├── useGeocoding.ts    # Main geocoding logic
│   └── useNaverMap.ts     # Naver Maps integration
├── lib/
│   ├── metadata.ts        # SEO metadata generation
│   └── utils.ts           # Utility functions
└── types/
    ├── app.ts             # Application type definitions
    └── naver-maps.ts      # Naver Maps API types
```

### Key Hooks

**useGeocoding**: Main business logic hook that handles:
- Address search with caching and rate limiting
- Search history management (sessionStorage)
- Multiple address search with result lists
- Client-side rate limiting (20 requests/minute)
- Address caching (localStorage, max 100 entries)

**useNaverMap**: Handles Naver Maps integration:
- Map initialization and rendering
- Marker management
- Real-time coordinate updates
- Map interaction events

### Environment Variables
- `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`: Required for Naver Maps API

### SEO & Performance
- Comprehensive metadata with Korean keywords
- Schema.org structured data for web application
- Google AdSense integration
- Vercel Analytics and Speed Insights
- Static export compatible for optimal performance

### Rate Limiting & Caching
- Client-side rate limiting: 20 requests per minute stored in sessionStorage
- Address cache: localStorage with max 100 entries, LRU eviction
- Search history: sessionStorage with max 5 recent searches

## Development Notes

- All user-facing text is in Korean
- Uses Naver Maps API v3 with geocoder submodule
- Built for Korean addresses (supports road addresses and jibun addresses)
- Mobile-responsive design with Tailwind CSS
- Error messages provide helpful guidance (e.g., suggesting road address format)