import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { ClipboardList, Users, PenTool, ListFilter } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function WorkLogs() {
  const menuItems = [
    {
      title: '業務日誌一覧',
      description: '作成済みの業務日誌を確認',
      icon: ListFilter,
      href: '/work-logs/list',
      color: 'bg-blue-500'
    },
    {
      title: '業務日誌作成',
      description: '新規業務日誌の作成と編集',
      icon: PenTool,
      href: '/work-logs/create',
      color: 'bg-green-500' 
    },
    {
      title: '回覧ルート管理',
      description: '承認ルートの作成と編集',
      icon: Users,
      href: '/construction/report/approve-routes',
      color: 'bg-purple-500'
    }
  ];

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">業務日誌</h1>
              <p className="mt-2 text-gray-600">日次業務の記録と共有</p>
            </div>
            <Link
              href="/work-logs/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <ClipboardList className="w-5 h-5 mr-2" />
              日誌を作成
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h2 className="text-2xl font-bold mb-4">最近の業務日誌</h2>
            <div className="space-y-4">
              <p className="text-blue-50">
                最近作成された業務日誌の確認や
                編集は業務日誌一覧から行えます。
              </p>
              <Link
                href="/work-logs/list"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                日誌一覧を確認
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">承認待ちの日誌</h2>
            <div className="space-y-4">
              <p className="text-purple-50">
                承認待ちの業務日誌の確認や
                承認操作は一覧から行えます。
              </p>
              <Link
                href="/work-logs/list?filter=pending"
                className="inline-block px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200"
              >
                承認待ちを確認
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}