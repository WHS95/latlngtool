"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TabType } from "@/types/app";
import { MapPin, FileText, Link as LinkIcon, Navigation } from "lucide-react";

interface BottomNavigationProps {
  activeTab: TabType;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const tabs = [
    { id: "single" as TabType, icon: MapPin, label: "단일검색", path: "/" },
    {
      id: "batch" as TabType,
      icon: FileText,
      label: "주소일괄변환",
      path: "/batch",
    },
    {
      id: "location" as TabType,
      icon: Navigation,
      label: "내위치",
      path: "/location",
    },
    {
      id: "links" as TabType,
      icon: LinkIcon,
      label: "링크생성",
      path: "/links",
    },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-1 z-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-4 gap-1'>
          {tabs.map((tab) => (
            <Link key={tab.id} href={tab.path}>
              <Button
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex flex-col items-center py-1 px-1 h-auto w-full ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                    : "text-gray-600 hover:text-blue-600 hover:bg-transparent"
                }`}
              >
                <span className='text-lg'>
                  <tab.icon />
                </span>
                <span className='text-xs mt-1'>{tab.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
