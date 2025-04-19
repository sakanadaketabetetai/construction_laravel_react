import React, { useState, useEffect } from 'react';
import ConstructionLayout from '../../../Layouts/ConstructionLayout';
import { ClipboardList, AlertCircle, Plus, Minus, Clock } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import type { Equipment, InspectionTemplate } from '../../../types';

interface Props {
  equipment: Equipment[];
  templates: InspectionTemplate[];
}

interface TimeEntry {
  time: string;
  values: Record<string, string>;
}

interface FormData {
  equipment_id: number;
  template_id: number;
  inspection_date: string;
  start_time: string;
  end_time: string;
  next_inspection_date: string;
  status: 'passed' | 'failed' | 'needs_repair';
  notes: string;
  timeEntries: TimeEntry[];
  [key: string]: any;
}

export default function CreateInspection({ equipment = [], templates = [] }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<InspectionTemplate | null>(null);
  const [interval, setInterval] = useState<5 | 10>(5);

  const { data, setData, post, processing, errors } = useForm<FormData>({
    equipment_id: equipment[0]?.id || 0,
    template_id: templates[0]?.id || 0,
    inspection_date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '17:00',
    next_inspection_date: '',
    status: 'passed',
    notes: '',
    timeEntries: [],
  });

  // 時間枠の生成（開始時刻から終了時刻まで）
  const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: number) => {
    const slots: string[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startDate = new Date(2000, 0, 1, startHour, startMinute);
    const endDate = new Date(2000, 0, 1, endHour, endMinute);
    
    let currentTime = new Date(startDate);
    
    while (currentTime <= endDate) {
      slots.push(
        `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`
      );
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }
    
    return slots;
  };

  useEffect(() => {
    if (equipment.length > 0 && templates.length > 0) {
      handleTemplateChange(templates[0].id);
    }
  }, [equipment, templates]);

  useEffect(() => {
    // 時間枠の初期化
    const timeSlots = generateTimeSlots(data.start_time, data.end_time, interval);
    const initialTimeEntries = timeSlots.map(time => ({
      time,
      values: selectedTemplate?.inspection_template_items.reduce((acc, item) => ({
        ...acc,
        [item.field_name]: ''
      }), {}) || {},
    }));

    setData(data => ({
      ...data,
      timeEntries: initialTimeEntries,
    }));
  }, [interval, selectedTemplate, data.start_time, data.end_time]);

  const handleTemplateChange = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    setData(data => ({
      ...data,
      template_id: templateId,
    }));
  };

  const updateTimeEntry = (timeIndex: number, fieldName: string, value: string) => {
    const newTimeEntries = [...data.timeEntries];
    newTimeEntries[timeIndex].values[fieldName] = value;
    setData('timeEntries', newTimeEntries);
  };

  const addCustomTimeEntry = () => {
    const newTime = prompt('時刻を入力してください（HH:MM形式）');
    if (!newTime || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newTime)) {
      alert('正しい時刻形式で入力してください（例: 13:30）');
      return;
    }

    // 開始時刻と終了時刻の範囲内かチェック
    if (newTime < data.start_time || newTime > data.end_time) {
      alert('指定された時刻は試運転時間の範囲外です');
      return;
    }

    const newEntry: TimeEntry = {
      time: newTime,
      values: selectedTemplate?.inspection_template_items.reduce((acc, item) => ({
        ...acc,
        [item.field_name]: ''
      }), {}) || {},
    };

    // 時刻順にソート
    const newTimeEntries = [...data.timeEntries, newEntry]
      .sort((a, b) => a.time.localeCompare(b.time));

    setData('timeEntries', newTimeEntries);
  };

  const removeTimeEntry = (timeIndex: number) => {
    setData('timeEntries', data.timeEntries.filter((_, i) => i !== timeIndex));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/equipment/inspections/create');
  };

  if (equipment.length === 0 || templates.length === 0) {
    return (
      <ConstructionLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  必要なデータが不足しています
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    点検記録を作成するには、設備情報と点検テンプレートが必要です。
                    先に設備情報とテンプレートを登録してください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConstructionLayout>
    );
  }

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="点検記録作成" />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
              <ClipboardList className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">点検記録作成</h1>
              <p className="mt-1 text-gray-600">新規点検記録の作成</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label htmlFor="equipment_id" className="block text-sm font-medium text-gray-700 mb-2">
                  点検対象設備 <span className="text-red-500">*</span>
                </label>
                <select
                  id="equipment_id"
                  value={data.equipment_id}
                  onChange={e => setData('equipment_id', parseInt(e.target.value))}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {equipment.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.model})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="template_id" className="block text-sm font-medium text-gray-700 mb-2">
                  点検テンプレート <span className="text-red-500">*</span>
                </label>
                <select
                  id="template_id"
                  value={data.template_id}
                  onChange={e => handleTemplateChange(parseInt(e.target.value))}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="inspection_date" className="block text-sm font-medium text-gray-700 mb-2">
                  点検実施日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="inspection_date"
                  value={data.inspection_date}
                  onChange={e => setData('inspection_date', e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-2">
                  試運転開始時刻 <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="start_time"
                  value={data.start_time}
                  onChange={e => setData('start_time', e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">
                  試運転終了時刻 <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="end_time"
                  value={data.end_time}
                  onChange={e => setData('end_time', e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="next_inspection_date" className="block text-sm font-medium text-gray-700 mb-2">
                  次回点検予定日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="next_inspection_date"
                  value={data.next_inspection_date}
                  onChange={e => setData('next_inspection_date', e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {selectedTemplate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">点検記録表</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-700">記録間隔:</label>
                      <select
                        value={interval}
                        onChange={e => setInterval(parseInt(e.target.value) as 5 | 10)}
                        className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option value={5}>5分</option>
                        <option value={10}>10分</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={addCustomTimeEntry}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      時刻を追加
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                          時刻
                        </th>
                        {selectedTemplate.inspection_template_items.map((item, index) => (
                          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {item.field_name} ({item.unit})
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.timeEntries.map((entry, timeIndex) => (
                        <tr key={timeIndex} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              {entry.time}
                            </div>
                          </td>
                          {selectedTemplate.inspection_template_items.map((item, fieldIndex) => (
                            <td key={fieldIndex} className="px-6 py-4 whitespace-nowrap">
                              <input
                                type={item.type === 'measurement' ? 'number' : 'text'}
                                value={entry.values[item.field_name] || ''}
                                onChange={e => updateTimeEntry(timeIndex, item.field_name, e.target.value)}
                                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min={item.min_value || undefined}
                                max={item.max_value || undefined}
                              />
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => removeTimeEntry(timeIndex)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                総合判定 <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={data.status}
                onChange={e => setData('status', e.target.value as FormData['status'])}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="passed">合格</option>
                <option value="failed">不合格</option>
                <option value="needs_repair">要修理</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                総合所見
              </label>
              <textarea
                id="notes"
                value={data.notes}
                onChange={e => setData('notes', e.target.value)}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
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
                  {processing ? '作成中...' : '記録を作成'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ConstructionLayout>
  );
}