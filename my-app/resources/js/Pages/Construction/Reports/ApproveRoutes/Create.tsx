import React, { useState } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Users, AlertCircle, Plus, Minus } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import type { User } from '@/types';

interface Props {
  users: User[];
}

type Approver = {
  name: string;
  user_id: number;
}

type FormData = {
  [key: string]: string | Approver[] | undefined;
  name: string;
  description: string;
  approvers: Approver[];
}

export default function CreateApproveRoute({ users }: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    description: '',
    approvers: [{ name: '', user_id: users[0]?.id || 0 }]
  });

  const addApprover = () => {
    setData('approvers', [...data.approvers, { name: '', user_id: users[0]?.id || 0 }]);
  };

  const removeApprover = (index: number) => {
    setData('approvers', data.approvers.filter((_, i) => i !== index));
  };

  const updateApprover = (index: number, field: keyof Approver, value: string | number) => {
    const newApprovers = [...data.approvers];
    newApprovers[index] = { ...newApprovers[index], [field]: value };
    setData('approvers', newApprovers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/construction/report/approve-routes');
  };

  return (
    <ConstructionLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="承認ルート作成" />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">承認ルート作成</h1>
              <p className="mt-1 text-gray-600">新規承認ルートの作成</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                承認ルート名 <span className="text-red-500">*</span>
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
                説明 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">承認者</h2>
                <button
                  type="button"
                  onClick={addApprover}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  承認者を追加
                </button>
              </div>

              {data.approvers.map((approver, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">承認者 #{index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeApprover(index)}
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
                        承認者名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={approver.name}
                        onChange={e => updateApprover(index, 'name', e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        承認者 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={approver.user_id}
                        onChange={e => updateApprover(index, 'user_id', parseInt(e.target.value))}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
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
                  {processing ? '作成中...' : '承認ルートを作成'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ConstructionLayout>
  );
}