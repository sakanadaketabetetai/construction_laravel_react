// src/pages/WorkLogs/Show.tsx
import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  ClipboardList, 
  Calendar as CalendarIcon,
  ChevronLeft,
  Clock,
  Users,
  Building2
} from 'lucide-react';
import type { WorkLog } from '../../types';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Props {
  workLog: WorkLog;
}



export default function Show({ workLog }: Props) {
  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="業務日誌詳細" />

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/work-logs"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                戻る
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">業務日誌詳細</h1>
            </div>
            <Link
              href={`/work-logs/detail/${workLog.id}/edit`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              編集
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">タイトル</dt>
                    <dd className="mt-1 text-sm text-gray-900">{workLog.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">日付</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {format(parseISO(workLog.diaryDate), 'yyyy年MM月dd日 (E)', { locale: ja })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">作成者</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {workLog.user?.name || '不明'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">作成情報</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">作成日時</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {format(parseISO(workLog.created_at || ''), 'yyyy/MM/dd HH:mm')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">最終更新</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {format(parseISO(workLog.updated_at || ''), 'yyyy/MM/dd HH:mm')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-8">
              {/* 作業実績セクション */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">作業実績</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                  {workLog.construction_through_work_records?.map((construction) => (
                    <div key={construction.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center mb-2">
                        <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                        <h3 className="text-md font-medium text-gray-900">
                          {construction.title}
                        </h3>
                      </div>
                      <div className="pl-7">
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                          {construction.pivot.work_detail}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!workLog.construction_through_work_records || workLog.construction_through_work_records.length === 0) && (
                    <p className="text-sm text-gray-500 text-center">作業実績の記録はありません</p>
                  )}
                </div>
              </div>

              {/* 作業予定セクション */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">作業予定</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                  {workLog.construction_through_work_schedules?.map((construction) => (
                    <div key={construction.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center mb-2">
                        <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                        <h3 className="text-md font-medium text-gray-900">
                          {construction.title}
                        </h3>
                      </div>
                      <div className="pl-7">
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                          {construction.pivot.work_detail}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!workLog.construction_through_work_schedules || workLog.construction_through_work_schedules.length === 0) && (
                    <p className="text-sm text-gray-500 text-center">作業予定の記録はありません</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}
