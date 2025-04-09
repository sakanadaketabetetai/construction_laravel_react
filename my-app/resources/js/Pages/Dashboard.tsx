import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Building2, Wrench, ClipboardList, Settings } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
  const menuItems = [
    {
      title: '工事管理',
      description: '工事案件の登録・進捗管理',
      icon: Building2,
      href: '/construction',
      color: 'bg-blue-500'
    },
    {
      title: '設備管理',
      description: '建設機器の状態・稼働状況',
      icon: Wrench,
      href: '/equipment',
      color: 'bg-green-500'
    },
    {
      title: '業務日誌',
      description: '日次作業記録・報告書',
      icon: ClipboardList,
      href: '/work-logs',
      color: 'bg-purple-500'
    },
    {
      title: '各種設定',
      description: 'システム設定・マスタ管理',
      icon: Settings,
      href: '/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="mt-2 text-gray-600">工事管理システムへようこそ</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-6">
                <div className={`inline-flex p-3 rounded-xl ${item.color} text-white mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full ${item.color} opacity-50`} />
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">今日のTips</h2>
          <p className="text-blue-50">
            効率的な工事管理のために、日々の記録を欠かさず入力することをお勧めします。
            業務日誌から簡単に入力できます。
          </p>
        </div>
      </div>
    </ConstructionLayout>
  );
}