import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Head, useForm } from '@inertiajs/react';
import { ClipboardList, Calendar as CalendarIcon, Plus, Minus, AlertCircle } from 'lucide-react';
import Calendar from 'react-calendar';
import type { Construction } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface Props {
  constructions: Construction[];
}

interface WorkRecordForm {
  construction_id: number;
  work_detail: string;
  working_date: string;
  [key: string]: string | number;
}

interface WorkScheduleForm {
  construction_id: number;
  work_detail: string;
  schedule_work_date: string;
  [key: string]: string | number;
}

interface FormData {
  title: string;
  diaryDate: string;
  work_records: WorkRecordForm[];
  work_schedules: WorkScheduleForm[];
  [key: string]: string | WorkRecordForm[] | WorkScheduleForm[];
}

// 日付をYYYY-MM-DD形式に変換する関数（ローカルタイムゾーン考慮）
const formatDateToLocalYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Create({ constructions }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data, setData, post, processing, errors } = useForm<FormData>({
    title: '',
    diaryDate: formatDateToLocalYYYYMMDD(selectedDate),
    work_records: [],
    work_schedules: []
  });

  const addWorkRecord = () => {
    setData('work_records', [
      ...data.work_records,
      {
        construction_id: constructions[0]?.id || 0,
        work_detail: '',
        working_date: formatDateToLocalYYYYMMDD(selectedDate)
      }
    ]);
  };

  const removeWorkRecord = (index: number) => {
    setData('work_records', data.work_records.filter((_, i) => i !== index));
  };

  const updateWorkRecord = (index: number, field: keyof WorkRecordForm, value: string | number) => {
    const newRecords = [...data.work_records];
    newRecords[index] = { ...newRecords[index], [field]: value };
    setData('work_records', newRecords);
  };

  const addWorkSchedule = () => {
    setData('work_schedules', [
      ...data.work_schedules,
      {
        construction_id: constructions[0]?.id || 0,
        work_detail: '',
        schedule_work_date: formatDateToLocalYYYYMMDD(selectedDate) // デフォルトは選択中の日付
      }
    ]);
  };

  const removeWorkSchedule = (index: number) => {
    setData('work_schedules', data.work_schedules.filter((_, i) => i !== index));
  };

  const updateWorkSchedule = (index: number, field: keyof WorkScheduleForm, value: string | number) => {
    const newSchedules = [...data.work_schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setData('work_schedules', newSchedules);
  };

  const handleDateChange = (value: Date | [Date, Date] | null, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setData('diaryDate', formatDateToLocalYYYYMMDD(value));
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0]);
      setData('diaryDate', formatDateToLocalYYYYMMDD(value[0]));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/work-logs/create');
  };

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="業務日誌作成" />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
              <ClipboardList className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">業務日誌作成</h1>
              <p className="mt-1 text-gray-600">日次の作業実績と予定を記録</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  日付選択 <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Calendar
                   onChange={(value, event) => handleDateChange(value as Date | [Date, Date] | null, event)}
                    value={selectedDate}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    タイトル <span className="text-red-500">*</span>
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

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      選択日: {selectedDate.toLocaleDateString()}
                    </label>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                      この日の作業実績と予定を入力してください。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 作業実績セクション */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">作業実績</h2>
                <button
                  type="button"
                  onClick={addWorkRecord}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  実績を追加
                </button>
              </div>

              {data.work_records.map((record, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">作業実績 #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeWorkRecord(index)}
                      className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Minus className="w-4 h-4 mr-1" />
                      削除
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        工事 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={record.construction_id}
                        onChange={e => updateWorkRecord(index, 'construction_id', parseInt(e.target.value))}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {constructions.map(construction => (
                          <option key={construction.id} value={construction.id}>
                            {construction.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        作業内容 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={record.work_detail}
                        onChange={e => updateWorkRecord(index, 'work_detail', e.target.value)}
                        rows={2}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 作業予定セクション */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">作業予定</h2>
                <button
                  type="button"
                  onClick={addWorkSchedule}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  予定を追加
                </button>
              </div>

              {data.work_schedules.map((schedule, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">作業予定 #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeWorkSchedule(index)}
                      className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Minus className="w-4 h-4 mr-1" />
                      削除
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        工事 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={schedule.construction_id}
                        onChange={e => updateWorkSchedule(index, 'construction_id', parseInt(e.target.value))}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {constructions.map(construction => (
                          <option key={construction.id} value={construction.id}>
                            {construction.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        予定作業内容 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={schedule.work_detail}
                        onChange={e => updateWorkSchedule(index, 'work_detail', e.target.value)}
                        rows={2}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        予定日 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={schedule.schedule_work_date}
                        onChange={e => updateWorkSchedule(index, 'schedule_work_date', e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
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
                  {processing ? '作成中...' : '日誌を作成'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ConstructionLayout>
  );
}
