"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { GiscusComments } from "@/components/features/GiscusComments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../../components/ui/badge";

export default function CommunityPage() {
  const communityTopics = [
    {
      id: "general",
      title: "일반 자유게시판",
      description: "자유롭게 이야기를 나누는 공간입니다",
      term: "general-discussion",
      category: "General",
      categoryId: "DIC_kwDONJqQBM4CkqQs",
      emoji: "💬",
    },
    // {
    //   id: "coordinates",
    //   title: "좌표 관련 질문",
    //   description: "위도경도, 좌표 변환 관련 질문과 답변",
    //   issueTerm: "coordinates-qa",
    //   emoji: "🗺️",
    // },
    // {
    //   id: "tips",
    //   title: "꿀팁 공유",
    //   description: "지도 활용 팁과 노하우를 공유해보세요",
    //   issueTerm: "tips-sharing",
    //   emoji: "💡",
    // },
    // {
    //   id: "suggestions",
    //   title: "건의사항",
    //   description: "서비스 개선 아이디어나 버그 신고",
    //   issueTerm: "suggestions",
    //   emoji: "🚀",
    // },
  ];

  return (
    <div className='min-h-screen bg-white text-black pb-32'>
      {/* 헤더 */}
      <header className='bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200 py-8 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>💬 커뮤니티</h1>
          <p className='text-lg text-gray-600 mb-2'>
            위도경도 찾기 사용자들과 소통하는 공간
          </p>
          <p className='text-sm text-gray-500'>
            GitHub 계정으로 로그인하여 자유롭게 참여하세요
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className='max-w-4xl mx-auto p-4'>
        {/* 커뮤니티 가이드라인 */}
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-blue-700 flex items-center'>
              📋 커뮤니티 가이드라인
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-4 text-sm'>
              <div>
                <h3 className='font-semibold text-green-600 mb-2'>
                  ✅ 환영하는 내용
                </h3>
                <ul className='text-gray-600 space-y-1'>
                  <li>• 위도경도 관련 질문과 답변</li>
                  <li>• 지도 활용 팁과 노하우 공유</li>
                  <li>• 서비스 개선 아이디어 제안</li>
                  <li>• 건설적인 피드백과 토론</li>
                </ul>
              </div>
              <div>
                <h3 className='font-semibold text-red-600 mb-2'>
                  ❌ 금지하는 내용
                </h3>
                <ul className='text-gray-600 space-y-1'>
                  <li>• 스팸, 광고, 도배성 글</li>
                  <li>• 욕설, 비방, 개인정보 노출</li>
                  <li>• 불법적이거나 유해한 내용</li>
                  <li>• 주제와 관련 없는 내용</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 게시판 탭 */}
        <Tabs defaultValue='general' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 md:grid-cols-4 mb-6'>
            {communityTopics.map((topic) => (
              <TabsTrigger
                key={topic.id}
                value={topic.id}
                className='text-xs md:text-sm'
              >
                <span className='mr-1'>{topic.emoji}</span>
                <span className='hidden md:inline'>{topic.title}</span>
                <span className='md:hidden'>{topic.title.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {communityTopics.map((topic) => (
            <TabsContent key={topic.id} value={topic.id}>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <span className='flex items-center'>
                      <span className='text-2xl mr-2'>{topic.emoji}</span>
                      {topic.title}
                    </span>
                    <Badge variant='outline'>giscus</Badge>
                  </CardTitle>
                  <p className='text-gray-600 text-sm'>{topic.description}</p>
                </CardHeader>
                <CardContent>
                  <GiscusComments />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* 도움말 */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='text-lg text-gray-700'>
              ❓ giscus 사용법
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3 text-sm text-gray-600'>
              <div>
                <strong>1. GitHub 로그인:</strong> 댓글을 작성하려면 GitHub
                계정이 필요합니다.
              </div>
              <div>
                <strong>2. 댓글 작성:</strong> 하단의 텍스트 박스에 내용을
                입력하고 &quot;Comment&quot; 버튼을 클릭합니다.
              </div>
              <div>
                <strong>3. 반응 표시:</strong> 다른 사용자의 댓글에 👍, ❤️ 등의
                반응을 남길 수 있습니다.
              </div>
              <div>
                <strong>4. 이슈 기반:</strong> 각 댓글은 GitHub Issues로 자동
                생성되어 관리됩니다.
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation activeTab='community' />
    </div>
  );
}
