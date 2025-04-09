import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Wrench, ClipboardList, PenTool as Tool, ListFilter, Settings } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Equipment() {
  const menuItems = [
    {
      title: '設備一覧',
      description: '建設機器の一覧と状態確認',
      icon: ListFilter,
      href: '/equipment/list',
      color: 'bg-blue-500'
    },
    {
      title: '設備情報編集',
      description: '設備情報の更新と管理',
      icon: Settings,
      href: '/equipment/edit',
      color: 'bg-green-500'
    },
    {
      title: '設備点検記録',
      description: '定期点検と整備記録',
      icon: ClipboardList,
      href: '/equipment/inspections',
      color: 'bg-purple-500'
    },
    {
      title: '部品一覧',
      description: '交換部品の在庫管理',
      icon: Tool,
      href: '/equipment/parts',
      color: 'bg-orange-500'
    }
  ];

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">設備管理</h1>
              <p className="mt-2 text-gray-600">建設機器の管理・点検・部品管理</p>
            </div>
            <Link
              href="/equipment/inspections/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <ClipboardList className="w-5 h-5 mr-2" />
              点検記録を作成
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
            <h2 className="text-2xl font-bold mb-4">設備点検予定</h2>
            <div className="space-y-4">
              <p className="text-blue-50">
                今週の点検予定の確認や記録の入力は
                設備点検記録ページから行えます。
              </p>
              <Link
                href="/equipment/inspections"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                点検記録を確認
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">部品在庫アラート</h2>
            <div className="space-y-4">
              <p className="text-orange-50">
                在庫が少なくなっている部品の確認や
                発注管理は部品一覧ページから行えます。
              </p>
              <Link
                href="/equipment/parts"
                className="inline-block px-4 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-200"
              >
                在庫を確認
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}