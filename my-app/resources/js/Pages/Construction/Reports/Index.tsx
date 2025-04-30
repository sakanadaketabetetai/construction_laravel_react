import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { FileText, Plus, Search, Clock, Users } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import type { Construction, Approve } from '@/types';

interface Props {
  constructions: Construction[];
  approves: Approve[];
}

export default function Reports({ constructions = [], approves = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // constructionsから報告書がある工事のみをフィルタリング
  const constructionsWithReports = constructions.filter(construction => construction.report && construction.report.length > 0);

  const filteredConstructions = constructionsWithReports.filter(construction =>
    construction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getApprovalStatus = (construction: Construction) => {
    const report = construction.report?.[0];
    if (!report?.approve_items || report.approve_items.length === 0) {
      return { text: '未申請', color: 'bg-gray-100 text-gray-800' };
    }

    const hasRejected = report.approve_items.some(item => item.pivot.status === 'rejected');
    if (hasRejected) {
      return { text: '却下', color: 'bg-red-100 text-red-800' };
    }

    const allApproved = report.approve_items.every(item => item.pivot.status === 'approved');
    if (allApproved) {
      return { text: '承認済', color: 'bg-green-100 text-green-800' };
    }

    return { text: '承認待ち', color: 'bg-yellow-100 text-yellow-800' };
  };

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="工事報告書一覧" />

        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">工事報告書</h1>
              <p className="mt-2 text-gray-600">工事報告書の作成と承認状況の確認</p>
            </div>
            <Link
              href="/construction/reports/create/page"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              報告書作成
            </Link>
          </div>
        </header>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="工事名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    工事名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作成日時
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    承認ルート
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    承認状況
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConstructions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      該当する報告書がありません
                    </td>
                  </tr>
                ) : (
                  filteredConstructions.map((construction) => {
                    const status = getApprovalStatus(construction);
                    const report = construction.report?.[0];
                    if (!report) return null;

                    const approveRoute = report.approve_items?.[0]?.approve;

                    return (
                      <tr key={construction.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {construction.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {report.created_at}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            {approveRoute?.name || '未設定'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link
                              href={`/construction/reports/${report.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              詳細
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}