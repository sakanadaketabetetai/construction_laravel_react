// src/pages/WorkLogs/List.tsx
import React, { useState, useMemo } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { ClipboardList, Search, Calendar as CalendarIcon, Clock, Users, ChevronRight } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import type { WorkLog } from '../../types';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Props {
  workLogs: WorkLog[];
}

export default function List({ workLogs = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // Group work logs by month
  const groupedLogs = useMemo(() => {
    const groups = workLogs.reduce((acc, log) => {
      const monthKey = format(parseISO(log.diaryDate), 'yyyy-MM');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(log);
      return acc;
    }, {} as Record<string, WorkLog[]>);

    // Sort logs within each month by date
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => 
        parseISO(b.diaryDate).getTime() - parseISO(a.diaryDate).getTime()
      );
    });

    return groups;
  }, [workLogs]);

  // Get sorted month keys
  const sortedMonths = useMemo(() => 
    Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a)),
    [groupedLogs]
  );

  // Filter logs based on search term
  const filteredMonths = sortedMonths.filter(month => {
    if (!searchTerm) return true;
    return groupedLogs[month].some(log => 
      log.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="業務日誌一覧" />

        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">業務日誌一覧</h1>
              <p className="mt-2 text-gray-600">月別の業務日誌を確認</p>
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

        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="タイトルで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-8">
          {filteredMonths.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
              業務日誌がありません
            </div>
          ) : (
            filteredMonths.map(month => (
              <div key={month} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {format(parseISO(`${month}-01`), 'yyyy年 M月', { locale: ja })}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {groupedLogs[month].map(log => (
                    <div key={log.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {format(parseISO(log.diaryDate), 'M/d (E)', { locale: ja })}
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {log.title}
                          </h3>
                        </div>
                        <Link
                          href={`/work-logs/detail/${log.id}`}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          詳細を見る
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">作業実績</h4>
                          <div className="text-sm text-gray-900">
                            {log.construction_through_work_records?.map((construction) => (
                              <div key={construction.id} className="mb-1 last:mb-0">
                                <span className="font-medium">{construction.title}: </span>
                                {construction.pivot.work_detail}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">作業予定</h4>
                          <div className="text-sm text-gray-900">
                            {log.construction_through_work_schedules?.map((construction) => (
                              <div key={construction.id} className="mb-1 last:mb-0">
                                <span className="font-medium">{construction.title}: </span>
                                {construction.pivot.work_detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        <span>作成者: {log.user?.name || '不明'}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-2" />
                        <span>作成日時: {format(parseISO(log.created_at || ''), 'yyyy/MM/dd HH:mm')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ConstructionLayout>
  );
}
