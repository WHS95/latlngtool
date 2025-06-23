"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

interface BottomNavigationProps {
  activeTab?: string;
}

export function BottomNavigation({
  activeTab = "search",
}: BottomNavigationProps) {
  const navItems = [
    { id: "search", label: "검색", href: "/", icon: "🔍" },
    { id: "batch", label: "일괄변환", href: "/batch", icon: "📊" },
    { id: "location", label: "내위치", href: "/location", icon: "📍" },
    { id: "links", label: "링크생성", href: "/links", icon: "🔗" },
    { id: "community", label: "커뮤니티", href: "/community", icon: "💬" },
    { id: "blog", label: "가이드", href: "/blog", icon: "📚" },
    { id: "about", label: "소개", href: "/about", icon: "ℹ️" },
  ];

  return (
    <Card className='fixed bottom-4 left-4 right-4 mx-auto max-w-lg z-50 bg-white border shadow-lg'>
      <div className='flex justify-around items-center p-2'>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === item.id
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className='text-lg mb-1'>{item.icon}</span>
            <span className='text-xs font-medium'>{item.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
