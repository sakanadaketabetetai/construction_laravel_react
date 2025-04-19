import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
  ClipboardList, 
  Clock, 
  AlertTriangle,
  Trash2, 
  PenLine,
  ChevronLeft,
  Save,
  X
} from 'lucide-react';
import type { Equipment, EquipmentRecord, InspectionTemplate } from '../../../types';
import { format } from 'date-fns';

interface Props {
  record: EquipmentRecord;
  equipment: Equipment;
  template: InspectionTemplate;
}

interface EditableRecord {
  recorded_at: string;
  template_id: number;
  equipment_id: number;
  start_time: string;
  end_time: string;
  notes: string | null;
  record_items: {
    id: number;
    template_item_id: number;
    time: string;
    value: number;
  }[];
}

interface GroupedRecordItems {
  [time: string]: {
    [templateItemId: number]: {
      id: number;
      template_item_id: number;
      value: number;
    };
  };
}

export default function Show({ record, equipment, template }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedRecord, setEditedRecord] = useState<EditableRecord>({
    recorded_at: record.recorded_at,
    template_id: record.template_id,
    equipment_id: record.equipment_id,
    start_time: record.start_time,
    end_time: record.end_time,
    notes: record.notes ?? null,
    record_items: record.record_items.map(item => ({
      id: item.id,
      template_item_id: item.template_item_id,
      time: item.time,
      value: item.value
    }))
  });

  // 記録データを時間ごとにグループ化する関数
  const groupRecordItemsByTime = (items: EditableRecord['record_items']): GroupedRecordItems => {
    return items.reduce((acc, item) => {
      if (!acc[item.time]) {
        acc[item.time] = {};
      }
      acc[item.time][item.template_item_id] = {
        id: item.id,
        template_item_id: item.template_item_id,
        value: item.value
      };
      return acc;
    }, {} as GroupedRecordItems);
  };

  const handleDelete = () => {
    router.delete(`/equipment/inspections/${record.id}`, {
      onSuccess: () => {
        router.visit('/equipment/inspections');
      },
    });
  };

  const handleSave = () => {
    const formData = {
      recorded_at: editedRecord.recorded_at,
      equipment_id: editedRecord.equipment_id,
      template_id: editedRecord.template_id,
      start_time: editedRecord.start_time,
      end_time: editedRecord.end_time,
      notes: editedRecord.notes,
      record_items: editedRecord.record_items.map(item => ({
        id: item.id, // バックエンドの期待する形式に合わせる
        template_item_id: item.template_item_id,
        time: item.time,
        value: item.value
      }))
    };

    router.put(`/equipment/inspections/${record.id}`, formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const updateRecordItem = (templateItemId: number, time: string, value: number) => {
    const updatedItems = editedRecord.record_items.map(item => {
      if (item.template_item_id === templateItemId && item.time === time) {
        return { ...item, value };
      }
      return item;
    });
    setEditedRecord({ ...editedRecord, record_items: updatedItems });
  };

  // 記録データをグループ化
  const groupedItems = groupRecordItemsByTime(
    isEditing ? editedRecord.record_items : record.record_items
  );

  // 時間でソートした配列を作成
  const sortedTimes = Object.keys(groupedItems).sort();

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="点検記録詳細" />

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/equipment/inspections"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">点検記録詳細</h1>
          </div>
          <div className="flex space-x-4">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PenLine className="w-5 h-5 mr-2" />
                  編集
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  削除
                </button>
              </>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-5 h-5 mr-2" />
                  保存
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedRecord({
                      recorded_at: record.recorded_at,
                      equipment_id: record.equipment_id,
                      template_id: record.template_id,
                      start_time: record.start_time,
                      end_time: record.end_time,
                      notes: record.notes ?? null,
                      record_items: record.record_items.map(item => ({
                        id: item.id,
                        template_item_id: item.template_item_id,
                        time: item.time,
                        value: item.value
                      }))
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X className="w-5 h-5 mr-2" />
                  キャンセル
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">設備名</dt>
                    <dd className="mt-1 text-sm text-gray-900">{equipment.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">点検日</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {format(new Date(record.recorded_at), 'yyyy年MM月dd日')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">試運転時間</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={editedRecord.start_time}
                            onChange={(e) => setEditedRecord({ ...editedRecord, start_time: e.target.value })}
                            className="block w-32 px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                          <span>〜</span>
                          <input
                            type="time"
                            value={editedRecord.end_time}
                            onChange={(e) => setEditedRecord({ ...editedRecord, end_time: e.target.value })}
                            className="block w-32 px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      ) : (
                        `${record.start_time} 〜 ${record.end_time}`
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">テンプレート情報</h2>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">テンプレート名</dt>
                    <dd className="mt-1 text-sm text-gray-900">{template.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">説明</dt>
                    <dd className="mt-1 text-sm text-gray-900">{template.description || '説明なし'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">記録データ</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        時刻
                      </th>
                      {template.inspection_template_items.map((item) => (
                        <th key={item.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {item.field_name} ({item.unit})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedTimes.map((time) => (
                      <tr key={time}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="time"
                              value={time}
                              onChange={(e) => {
                                const newTime = e.target.value;
                                const updatedItems = editedRecord.record_items.map(item => {
                                  if (item.time === time) {
                                    return { ...item, time: newTime };
                                  }
                                  return item;
                                });
                                setEditedRecord({ ...editedRecord, record_items: updatedItems });
                              }}
                              className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <div className="text-sm text-gray-900">{time}</div>
                          )}
                        </td>
                        {template.inspection_template_items.map((templateItem) => {
                          const recordItem = groupedItems[time]?.[templateItem.id];
                          return (
                            <td key={templateItem.id} className="px-6 py-4 whitespace-nowrap">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={recordItem?.value ?? ''}
                                  onChange={(e) => {
                                    updateRecordItem(
                                      templateItem.id,
                                      time,
                                      parseFloat(e.target.value)
                                    );
                                  }}
                                  className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              ) : (
                                <div className="text-sm text-gray-900">
                                  {recordItem?.value ?? '-'}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">備考</h2>
              {isEditing ? (
                <textarea
                  value={editedRecord.notes || ''}
                  onChange={(e) => setEditedRecord({ ...editedRecord, notes: e.target.value })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              ) : (
                <p className="text-sm text-gray-600">{record.notes || '備考なし'}</p>
              )}
            </div>
          </div>
        </div>

        {/* 削除確認モーダル */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">点検記録の削除</h3>
              </div>
              <p className="text-gray-600 mb-6">
                この点検記録を削除してもよろしいですか？
                この操作は取り消すことができません。
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  削除する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConstructionLayout>
  );
}