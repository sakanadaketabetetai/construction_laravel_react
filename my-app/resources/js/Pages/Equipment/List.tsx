import React from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Wrench, AlertCircle, CheckCircle, Shield, Settings } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Equipment } from '../../types';

interface EquipmentProps {
  equipments :Equipment[];
}

const getStatusColor = (status: Equipment['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'emergency_reserve':
      return 'bg-yellow-100 text-yellow-800';
    case 'maintenance':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: Equipment['status']) => {
  switch (status) {
    case 'available':
      return CheckCircle;
    case 'emergency_reserve':
      return Shield;
    case 'maintenance':
      return Settings;
    default:
      return AlertCircle;
  }
};

const getStatusText = (status: Equipment['status']) => {
  switch (status) {
    case 'available':
      return '利用可能';
    case 'emergency_reserve':
      return '非常予備';
    case 'maintenance':
      return '点検中';
    default:
      return '不明';
  }
};

export default function EquipmentList( {equipments} : EquipmentProps) {
  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">設備一覧</h1>
              <p className="mt-2 text-gray-600">建設機器の状態と詳細情報</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/equipment/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Wrench className="w-5 h-5 mr-2" />
                新規設備登録
              </Link>
            </div>
          </div>
        </header>

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
                    状態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipments.map((equipment) => {
                  const StatusIcon = getStatusIcon(equipment.status);
                  return (
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {getStatusText(equipment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            href={`/equipment/${equipment.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            編集
                          </Link>
                          <Link
                            href={`/equipment/${equipment.id}/inspections`}
                            className="text-green-600 hover:text-green-900"
                          >
                            点検記録
                          </Link>
                        </div>
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