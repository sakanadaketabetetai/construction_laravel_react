import React, { useState, useMemo } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Building2, Search, Calendar, AlertCircle, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Construction, Equipment, EquipmentCategory } from '../../types';

interface Props {
  constructions: Construction[];
  equipmentCategories: EquipmentCategory[];
  equipment: Equipment[];
}

const statusLabels = {
  'not_yet_started': { text: '未着工', color: 'bg-gray-100 text-gray-800' },
  'ongoing': { text: '進行中', color: 'bg-blue-100 text-blue-800' },
  'completed': { text: '完了', color: 'bg-green-100 text-green-800' },
  'delayed': { text: '遅延', color: 'bg-red-100 text-red-800' }
} as const;

export default function ConstructionList({ constructions = [], equipmentCategories = [], equipment = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [selectedEquipment, setSelectedEquipment] = useState<number | ''>('');

  const fiscalYears = useMemo(() => {
    const years = [...new Set(constructions.map(c => c.fiscalYear))];
    return years.sort((a, b) => b - a);
  }, [constructions]);

  const filteredEquipment = useMemo(() => {
    if (!selectedCategory) return equipment;
    return equipment.filter(e => e.equipment_category_id === Number(selectedCategory));
  }, [equipment, selectedCategory]);

  const filteredConstructions = useMemo(() => {
    return constructions.filter(construction => {
      const matchesSearch = searchTerm === '' || 
        construction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        construction.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = !selectedYear || construction.fiscalYear === Number(selectedYear);

      const matchesEquipment = !selectedEquipment || 
        construction.equipment?.some(e => e.id === Number(selectedEquipment));

      return matchesSearch && matchesYear && matchesEquipment;
    });
  }, [constructions, searchTerm, selectedYear, selectedEquipment]);

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">工事一覧</h1>
              <p className="mt-2 text-gray-600">工事案件の一覧と検索</p>
            </div>
            <Link
              href={'/constructions/create'}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Building2 className="w-5 h-5 mr-2" />
              新規工事登録
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  キーワード検索
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="工事名・説明で検索"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  年度で絞り込み
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : '')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全ての年度</option>
                  {fiscalYears.map((year) => (
                    <option key={year} value={year}>
                      {year}年度
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  設備カテゴリで絞り込み
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value ? Number(e.target.value) : '');
                    setSelectedEquipment('');
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全てのカテゴリ</option>
                  {equipmentCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  設備で絞り込み
                </label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value ? Number(e.target.value) : '')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全ての設備</option>
                  {filteredEquipment.map((equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    工事件名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    年度
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    工期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    使用設備
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConstructions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      該当する工事情報がありません
                    </td>
                  </tr>
                ) : (
                  filteredConstructions.map((construction) => (
                    <tr key={construction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {construction.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {construction.description.length > 50
                            ? `${construction.description.slice(0, 50)}...`
                            : construction.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {construction.fiscalYear}年度
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <div>
                            <div>{construction.startDate}</div>
                            <div className="text-gray-500">
                              ↓
                            </div>
                            <div>{construction.status === 'completed' ? construction.endDate : construction.estimatedCompletionDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusLabels[construction.status].color}`}>
                          {statusLabels[construction.status].text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {construction.equipment?.map((eq) => (
                            <span
                              key={eq.id}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {eq.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            href={`/constructions/show/${construction.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            詳細
                          </Link>
                          <Link
                            href={`/constructions/edit/${construction.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            編集
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}