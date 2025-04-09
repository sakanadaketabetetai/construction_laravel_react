import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { ListFilter, PlusCircle, Calendar, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Construction() {
  const menuItems = [
    {
      title: '工事一覧',
      description: '進行中および計画中の工事案件一覧',
      icon: ListFilter,
      href: '/construction/list',
      color: 'bg-blue-500'
    },
    {
      title: '工事新規作成',
      description: '新規工事案件の登録',
      icon: PlusCircle,
      href: '/construction/create',
      color: 'bg-green-500'
    },
    {
      title: '月間工程表',
      description: '工事スケジュールの管理',
      icon: Calendar,
      href: '/construction/schedule',
      color: 'bg-purple-500'
    },
    {
      title: '工事報告書作成',
      description: '工事完了報告書の作成',
      icon: FileText,
      href: '/construction/reports',
      color: 'bg-orange-500'
    }
  ];

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">工事管理</h1>
              <p className="mt-2 text-gray-600">工事案件の登録・管理・報告書作成</p>
            </div>
            <Link
              href="/constructions/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              新規工事登録
            </Link>
          </div>
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

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">進行中の工事</h2>
            <div className="space-y-4">
              <p className="text-blue-50">
                現在進行中の工事案件の確認や工程表の更新は
                工事一覧ページから簡単に行えます。
              </p>
              <Link
                href="/constructions/list"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                工事一覧を確認
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">今月の工程表</h2>
            <div className="space-y-4">
              <p className="text-purple-50">
                月間工程表で全ての工事スケジュールを
                一目で把握できます。
              </p>
              <Link
                href="/constructions/schedule"
                className="inline-block px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200"
              >
                工程表を確認
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}