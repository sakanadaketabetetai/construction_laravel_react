import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { ClipboardList, Plus, Minus, AlertCircle } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import type { EquipmentCategory } from '../../../../types';

interface Props {
  equipment_categories: EquipmentCategory[];
}

interface CheckItemForm {
  [key: string]: string | number | boolean | undefined;
  description: string;
  type: 'visual' | 'measurement' | 'functional';
  required: boolean;
  min_value?: number;
  max_value?: number;
  unit?: string;
}

interface FormData {
  [key: string]: string | number | boolean | CheckItemForm[] | undefined;
  name: string;
  equipment_category_id: number;
  description?: string;
  checkItems: CheckItemForm[];
}

export default function CreateTemplate({ equipment_categories }: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    equipment_category_id: equipment_categories[0]?.id || 1,
    description: '',
    checkItems: [{ description: '', type: 'visual', required: true }]
  });

  const addCheckItem = () => {
    setData('checkItems', [...data.checkItems, { description: '', type: 'visual', required: true }]);
  };

  const removeCheckItem = (index: number) => {
    setData('checkItems', data.checkItems.filter((_, i) => i !== index));
  };

  const updateCheckItem = (index: number, field: keyof CheckItemForm, value: string | boolean | number) => {
    const newCheckItems = [...data.checkItems];
    newCheckItems[index] = { ...newCheckItems[index], [field]: value };
    setData('checkItems', newCheckItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/equipment/inspections/templates');
  };

  return (
    <ConstructionLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="点検テンプレート作成" />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
              <ClipboardList className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">点検テンプレート作成</h1>
              <p className="mt-1 text-gray-600">新規点検テンプレートの作成</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                テンプレート名 <span className="text-red-500">*</span>
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                説明
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="equipment_category_id" className="block text-sm font-medium text-gray-700 mb-2">
                設備カテゴリ <span className="text-red-500">*</span>
              </label>
              <select
                id="equipment_category_id"
                value={data.equipment_category_id}
                onChange={e => setData('equipment_category_id', Number(e.target.value))}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {equipment_categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">チェック項目</h2>
                <button
                  type="button"
                  onClick={addCheckItem}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  項目を追加
                </button>
              </div>

              {data.checkItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">チェック項目 #{index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeCheckItem(index)}
                        className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                      >
                        <Minus className="w-4 h-4 mr-1" />
                        削除
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        チェック内容 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => updateCheckItem(index, 'description', e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        チェック種別 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={item.type}
                        onChange={e => updateCheckItem(index, 'type', e.target.value as CheckItemForm['type'])}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="visual">目視確認</option>
                        <option value="measurement">計測</option>
                        <option value="functional">動作確認</option>
                      </select>
                    </div>
                  </div>

                  {item.type === 'measurement' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          単位
                        </label>
                        <input
                          type="text"
                          value={item.unit}
                          onChange={e => updateCheckItem(index, 'unit', e.target.value)}
                          placeholder="例: ℃, MPa"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          最小値
                        </label>
                        <input
                          type="number"
                          value={item.min_value}
                          onChange={e => updateCheckItem(index, 'min_value', parseFloat(e.target.value))}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          最大値
                        </label>
                        <input
                          type="number"
                          value={item.max_value}
                          onChange={e => updateCheckItem(index, 'max_value', parseFloat(e.target.value))}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`required-${index}`}
                      checked={item.required}
                      onChange={e => updateCheckItem(index, 'required', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`required-${index}`} className="ml-2 block text-sm text-gray-700">
                      必須項目
                    </label>
                  </div>
                </div>
              ))}
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
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? '作成中...' : 'テンプレートを作成'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ConstructionLayout>
  );
}