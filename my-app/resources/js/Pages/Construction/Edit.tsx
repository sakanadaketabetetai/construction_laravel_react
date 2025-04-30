import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Building2, Calendar, AlertCircle } from 'lucide-react';
import type { Construction, Equipment, EquipmentCategory } from '../../types';

interface Props {
  construction: Construction;
  equipmentCategories: EquipmentCategory[];
  equipment: Equipment[];
}

export default function EditConstruction({ construction, equipmentCategories = [], equipment = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);

  const { data, setData, put, processing, errors } = useForm({
    id: construction.id,
    title: construction.title,
    fiscalYear: construction.fiscalYear,
    description: construction.description,
    startDate: construction.startDate,
    estimatedCompletionDate: construction.estimatedCompletionDate,
    endDate: construction.endDate || '',
    status: construction.status,
    user_id: construction.user_id,
    equipment_ids: construction.equipment_ids,
  });

  const filteredEquipment = React.useMemo(() => {
    if (!selectedCategory) return equipment;
    return equipment.filter(e => e.equipment_category_id === selectedCategory);
  }, [equipment, selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/construction/update/${construction.id}`);
  };

  const handleEquipmentSelection = (equipmentId: number) => {
    const newEquipment = data.equipment_ids.includes(equipmentId)
      ? data.equipment_ids.filter(id => id !== equipmentId)
      : [...data.equipment_ids, equipmentId];
    
    setData('equipment_ids', newEquipment);
  };

  return (
    <ConstructionLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="工事情報編集" />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">工事情報編集</h1>
              <p className="mt-1 text-gray-600">工事案件の情報を編集します</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  工事件名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="fiscalYear" className="block text-sm font-medium text-gray-700 mb-2">
                  実施年度 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="fiscalYear"
                  value={data.fiscalYear}
                  onChange={e => setData('fiscalYear', parseInt(e.target.value))}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.fiscalYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.fiscalYear}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                工事内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  着工日 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    value={data.startDate}
                    onChange={e => setData('startDate', e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="estimatedCompletionDate" className="block text-sm font-medium text-gray-700 mb-2">
                  工事完了予定日 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="estimatedCompletionDate"
                    value={data.estimatedCompletionDate}
                    onChange={e => setData('estimatedCompletionDate', e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {errors.estimatedCompletionDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.estimatedCompletionDate}</p>
                )}
              </div>

              {data.status === 'completed' && (
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    工事完了日 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="endDate"
                      value={data.endDate}
                      onChange={e => setData('endDate', e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                工事進捗状況 <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={data.status}
                onChange={e => setData('status', e.target.value as Construction['status'])}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="not_yet_started">未着工</option>
                <option value="ongoing">進行中</option>
                <option value="completed">完了</option>
                <option value="delayed">遅延</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                使用設備 <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    設備カテゴリ
                  </label>
                  <select
                    value={selectedCategory || ''}
                    onChange={e => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">全てのカテゴリ</option>
                    {equipmentCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment.map(equipment => (
                  <div
                    key={equipment.id}
                    className={`
                      relative p-4 border rounded-lg cursor-pointer transition-all
                      ${data.equipment_ids.includes(equipment.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'}
                    `}
                    onClick={() => handleEquipmentSelection(equipment.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={data.equipment_ids.includes(equipment.id)}
                        onChange={() => handleEquipmentSelection(equipment.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{equipment.name}</p>
                        <p className="text-xs text-gray-500">{equipment.model}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.equipment_ids && (
                <p className="mt-1 text-sm text-red-600">{errors.equipment_ids}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">* は必須項目です</span>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? '更新中...' : '更新する'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ConstructionLayout>
  );
}