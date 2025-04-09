import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Wrench, Search, Plus, AlertCircle } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';
import type { Equipment, EquipmentCategory } from '../../types';

interface Props {
  equipment: Equipment[];
  equipment_categories: EquipmentCategory[];
}

interface FormData {
  [key: string]: string | number | Equipment['status'];
  name: string;
  model: string;
  serialNumber: string;
  manufacturer: string;
  status: Equipment['status'];
  category_id: number; // Laravel側のカラム名に合わせて変更
}

export default function EquipmentEdit({ equipment, equipment_categories }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    name: '',
    model: '',
    serialNumber: '',
    manufacturer: '',
    status: 'available',
    category_id: equipment_categories[0]?.id || 1
  });

  const filteredEquipment = equipment.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/equipment/create', {
      onSuccess: () => {
        setShowForm(false);
        reset();
      },
    });
  };

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">設備情報編集</h1>
              <p className="mt-2 text-gray-600">設備情報の追加・編集・検索</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              新規設備登録
            </button>
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
              placeholder="設備名、型式、製造番号で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 新規登録フォーム */}
        {showForm && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">新規設備登録</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    設備名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                    型式 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="model"
                    value={data.model}
                    onChange={e => setData('model', e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-600">{errors.model}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    製造番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    value={data.serialNumber}
                    onChange={e => setData('serialNumber', e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.serialNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.serialNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-2">
                    製造メーカー <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="manufacturer"
                    value={data.manufacturer}
                    onChange={e => setData('manufacturer', e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.manufacturer && (
                    <p className="mt-1 text-sm text-red-600">{errors.manufacturer}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    設備状態 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    value={data.status}
                    onChange={e => setData('status', e.target.value as Equipment['status'])}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="available">利用可能</option>
                    <option value="emergency_reserve">非常予備</option>
                    <option value="maintenance">点検中</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                    設備カテゴリ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category_id"
                    value={data.category_id}
                    onChange={e => setData('category_id', Number(e.target.value))}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {equipment_categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center text-yellow-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">* は必須項目です</span>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      reset();
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? '登録中...' : '登録する'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* 設備一覧 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    設備名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    型式
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    製造番号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    製造メーカー
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    カテゴリ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.map((equipment) => (
                  <tr key={equipment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{equipment.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{equipment.serialNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{equipment.manufacturer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {equipment_categories.find(cat => cat.id === equipment.equipment_category_id)?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {/* 編集処理 */}}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => {/* 削除処理 */}}
                          className="text-red-600 hover:text-red-900"
                        >
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConstructionLayout>
  );
}