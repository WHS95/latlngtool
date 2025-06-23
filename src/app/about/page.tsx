"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      {/* 헤더 */}
      <header className='bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 py-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            위도경도 찾기
          </h1>
          <p className='text-xl text-gray-600 mb-6'>
            정확하고 빠른 좌표 변환 서비스
          </p>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
            일상생활부터 전문 업무까지, 누구나 쉽게 사용할 수 있는 위치 정보
            종합 플랫폼입니다.
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className='max-w-4xl mx-auto p-4'>
        {/* 서비스 소개 */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='text-2xl text-blue-700'>
              🎯 서비스 개요
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                <strong>위도경도 찾기</strong>는 한국의 주소 정보를 정확한 GPS
                좌표로 변환해주는 전문 서비스입니다. 네이버 지도 API를 기반으로
                하여 국내 최고 수준의 정확도를 제공합니다.
              </p>
              <p className='text-gray-700 leading-relaxed'>
                개인 사용자부터 기업, 개발자까지 다양한 요구사항에 맞는 다양한
                기능을 제공하여 위치 정보 활용의 모든 것을 해결합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 주요 기능 */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='text-2xl text-green-700'>
              ⚡ 주요 기능
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    🔍 단일 주소 검색
                  </h3>
                  <p className='text-gray-600'>
                    하나의 주소를 입력하여 정확한 위도/경도 좌표를 실시간으로
                    확인할 수 있습니다. 지도에서 직접 위치를 확인하고 다양한
                    형태로 결과를 복사할 수 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    📊 일괄 변환
                  </h3>
                  <p className='text-gray-600'>
                    여러 개의 주소를 한 번에 처리하여 시간을 절약할 수 있습니다.
                    CSV 파일로 결과를 다운로드하여 엑셀이나 다른 프로그램에서
                    활용 가능합니다.
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    📍 현재 위치 확인
                  </h3>
                  <p className='text-gray-600'>
                    GPS를 이용하여 현재 내 위치의 정확한 좌표를 확인할 수
                    있습니다. 응급상황이나 정확한 위치 공유가 필요할 때
                    유용합니다.
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    🔗 지도 링크 생성
                  </h3>
                  <p className='text-gray-600'>
                    좌표를 네이버지도, 구글지도, 카카오맵 링크로 변환하여 다른
                    사람과 쉽게 위치를 공유할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 활용 분야 */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='text-2xl text-purple-700'>
              💼 활용 분야
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-3 gap-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                  🏢 비즈니스
                </h3>
                <ul className='text-gray-600 space-y-1 text-sm'>
                  <li>• 부동산 매물 위치 관리</li>
                  <li>• 배달/물류 서비스</li>
                  <li>• 체인점 위치 분석</li>
                  <li>• 마케팅 지역 타겟팅</li>
                  <li>• 고객 방문 경로 최적화</li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                  👨‍💻 개발자
                </h3>
                <ul className='text-gray-600 space-y-1 text-sm'>
                  <li>• 지도 앱/웹 개발</li>
                  <li>• 위치 기반 서비스</li>
                  <li>• 데이터 분석 전처리</li>
                  <li>• API 연동 테스트</li>
                  <li>• 좌표 데이터 검증</li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                  🏠 개인
                </h3>
                <ul className='text-gray-600 space-y-1 text-sm'>
                  <li>• 약속 장소 공유</li>
                  <li>• 여행 계획 수립</li>
                  <li>• 응급상황 위치 전달</li>
                  <li>• 부동산 정보 확인</li>
                  <li>• 주차 위치 기록</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시작하기 */}
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl text-center text-blue-700'>
              🚀 지금 시작해보세요!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-center space-y-4'>
              <p className='text-gray-600'>
                복잡한 가입 절차 없이 지금 바로 모든 기능을 무료로 사용할 수
                있습니다.
              </p>
              <div className='flex flex-wrap justify-center gap-3'>
                <Button asChild>
                  <Link href='/'>🔍 주소 검색</Link>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/batch'>📊 일괄 변환</Link>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/location'>📍 내 위치</Link>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/links'>🔗 링크 생성</Link>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/community'>💬 커뮤니티</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation activeTab='about' />
    </div>
  );
}
