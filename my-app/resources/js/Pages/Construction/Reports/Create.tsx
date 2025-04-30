import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { FileText, AlertCircle, Users, Building2 } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import type { Construction, Approve } from '@/types';
interface Props {
  constructions: Construction[];
  approves: Approve[];
}

interface FormData {
  construction_id: number;
  inspection_details: string;
  concerns: string;
  approve_id: number;
  [key: string]: string | number; // Add index signature
}

export default function CreateReport({ constructions = [], approves = [] }: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    construction_id: constructions[0]?.id || 0,
    inspection_details: '',
    concerns: '',
    approve_id: approves[0]?.id || 0
  });

  const selectedConstruction = constructions.find(c => c.id === data.construction_id);
  const selectedApprove = approves.find(a => a.id === data.approve_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/construction/reports/create');
  };

  return (
    <ConstructionLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="工事報告書作成" />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">工事報告書作成</h1>
              <p className="mt-1 text-gray-600">工事完了報告書の作成と承認申請</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="construction_id" className="block text-sm font-medium text-gray-700 mb-2">
                工事案件 <span className="text-red-500">*</span>
              </label>
              <select
                id="construction_id"
                value={data.construction_id}
                onChange={e => setData('construction_id', parseInt(e.target.value))}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">工事を選択してください</option>
                {constructions.map(construction => (
                  <option key={construction.id} value={construction.id}>
                    {construction.title}
                  </option>
                ))}
              </select>
              {errors.construction_id && (
                <p className="mt-1 text-sm text-red-600">{errors.construction_id}</p>
              )}
            </div>

            {selectedConstruction && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">工事情報</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">工事件名</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedConstruction.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">工期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedConstruction.startDate} 〜 {selectedConstruction.endDate || selectedConstruction.estimatedCompletionDate}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div>
              <label htmlFor="inspection_details" className="block text-sm font-medium text-gray-700 mb-2">
                工事内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="inspection_details"
                value={data.inspection_details}
                onChange={e => setData('inspection_details', e.target.value)}
                rows={8}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.inspection_details && (
                <p className="mt-1 text-sm text-red-600">{errors.inspection_details}</p>
              )}
            </div>

            <div>
              <label htmlFor="concerns" className="block text-sm font-medium text-gray-700 mb-2">
                懸案事項
              </label>
              <textarea
                id="concerns"
                value={data.concerns}
                onChange={e => setData('concerns', e.target.value)}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.concerns && (
                <p className="mt-1 text-sm text-red-600">{errors.concerns}</p>
              )}
            </div>

            <div>
              <label htmlFor="approve_id" className="block text-sm font-medium text-gray-700 mb-2">
                承認ルート <span className="text-red-500">*</span>
              </label>
              <select
                id="approve_id"
                value={data.approve_id}
                onChange={e => setData('approve_id', parseInt(e.target.value))}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">承認ルートを選択してください</option>
                {approves.map(approve => (
                  <option key={approve.id} value={approve.id}>
                    {approve.name}
                  </option>
                ))}
              </select>
              {errors.approve_id && (
                <p className="mt-1 text-sm text-red-600">{errors.approve_id}</p>
              )}
            </div>

            {selectedApprove && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-blue-900 mb-4">承認ルート情報</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-blue-800">{selectedApprove.name}</p>
                    <p className="text-sm text-blue-600">{selectedApprove.description}</p>
                  </div>
                  {selectedApprove.approve_items && selectedApprove.approve_items.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-2">承認者一覧：</p>
                      <div className="space-y-2">
                        {selectedApprove.approve_items.map((item, index) => (
                          <div key={item.id} className="flex items-center text-sm text-blue-700">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{index + 1}. {item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">* は必須項目です</span>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? '作成中...' : '報告書を作成'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ConstructionLayout>
  );
}