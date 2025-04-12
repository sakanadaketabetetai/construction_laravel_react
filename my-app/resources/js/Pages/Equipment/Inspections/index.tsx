import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { ClipboardList, Plus, Search, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import type { InspectionRecord, Equipment, InspectionTemplate } from '../../../types';

interface Props {
  inspectionRecords: InspectionRecord[];
  equipments: Equipment[];
  templates: InspectionTemplate[];
}

export default function Inspections({ inspectionRecords, equipments, templates }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: InspectionRecord['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'needs_repair':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: InspectionRecord['status']) => {
    switch (status) {
      case 'passed':
        return CheckCircle;
      case 'failed':
        return XCircle;
      case 'needs_repair':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const filteredRecords = inspectionRecords.filter(record =>
    equipments.find(e => e.id === record.equipment_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="設備点検記録" />

        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">設備点検記録</h1>
              <p className="mt-2 text-gray-600">点検記録の確認と新規記録の作成</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/equipment/inspections/templates/create"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                テンプレート作成
              </Link>
              <Link
                href="/equipment/inspections/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                点検記録作成
              </Link>
            </div>
          </div>
        </header>

        {/* 検索フォーム */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="設備名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* テンプレート一覧 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">点検テンプレート</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  チェック項目: {template.checkItems.length}個
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/equipment/inspections/templates/${template.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    テンプレートを編集
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 点検記録一覧 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    点検日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    設備名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    テンプレート
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    点検者
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    次回点検日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => {
                  const StatusIcon = getStatusIcon(record.status);
                  const equipmentName = equipments.find(e => e.id === record.equipment_id)?.name;
                  const templateName = templates.find(t => t.id === record.template_id)?.name;

                  return (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.inspection_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{equipmentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{templateName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Inspector #{record.inspector_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {record.status === 'passed' ? '合格' :
                           record.status === 'failed' ? '不合格' : '要修理'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{record.next_inspection_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/equipment/inspections/${record.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          詳細
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}