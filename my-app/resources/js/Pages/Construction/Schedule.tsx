import React, { useState, useMemo, useRef } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Calendar, ChevronLeft, ChevronRight, AlertCircle, Download } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isWithinInterval, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Construction } from '../../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  constructions?: Construction[];
}

export default function Schedule({ constructions = [] }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<Construction['status'] | 'all'>('all');
  const tableRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const filteredConstructions = useMemo(() => {
    return constructions.filter(construction => {
      const startDate = parseISO(construction.startDate);
      const endDate = parseISO(construction.estimatedCompletionDate);
      
      const isInMonth = isWithinInterval(monthStart, { start: startDate, end: endDate }) ||
                       isWithinInterval(monthEnd, { start: startDate, end: endDate }) ||
                       isWithinInterval(startDate, { start: monthStart, end: monthEnd });

      const matchesStatus = selectedStatus === 'all' || construction.status === selectedStatus;

      return isInMonth && matchesStatus;
    });
  }, [constructions, monthStart, monthEnd, selectedStatus]);

  const getStatusColor = (status: Construction['status']) => {
    switch (status) {
      case 'not_yet_started':
        return 'bg-gray-100 text-gray-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBarColor = (status: Construction['status']) => {
    switch (status) {
      case 'delayed':
        return 'bg-red-500';
      case 'completed':
        return 'bg-green-500';
      case 'ongoing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Construction['status']) => {
    switch (status) {
      case 'not_yet_started':
        return '未着工';
      case 'ongoing':
        return '進行中';
      case 'completed':
        return '完了';
      case 'delayed':
        return '遅延';
      default:
        return '不明';
    }
  };

  const getDayClassName = (day: Date) => {
    return `px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 ${
      day.getDay() === 0 ? 'text-red-500 bg-red-50' : 
      day.getDay() === 6 ? 'text-blue-500 bg-blue-50' : ''
    }`;
  };

  const getCellClassName = (day: Date) => {
    return `px-0 py-4 text-center border-r border-gray-100 ${
      day.getDay() === 0 ? 'bg-red-50' : 
      day.getDay() === 6 ? 'bg-blue-50' : ''
    }`;
  };

  const exportToPDF = async () => {
    if (!tableRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addFont('node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-400-normal.woff', 'NotoSansJP', 'normal');
      pdf.setFont('NotoSansJP');
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth - 20, imgHeight * 0.8);
      
      pdf.save(`工事工程表_${format(currentDate, 'yyyy年MM月', { locale: ja })}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ConstructionLayout>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="月間工程表" />

        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">月間工程表</h1>
              <p className="mt-2 text-gray-600">工事案件のスケジュール管理</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-lg font-medium">
                  {format(currentDate, 'yyyy年 M月', { locale: ja })}
                </span>
              </div>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-5 w-5 mr-2" />
                {isExporting ? '出力中...' : 'PDF出力'}
              </button>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              進捗状況でフィルター
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Construction['status'] | 'all')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">全て表示</option>
              <option value="not_yet_started">未着工</option>
              <option value="ongoing">進行中</option>
              <option value="completed">完了</option>
              <option value="delayed">遅延</option>
            </select>
          </div>

          <div className="overflow-auto max-h-[calc(100vh-300px)]" ref={tableRef}>
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 sticky left-0 z-10 bg-white w-[300px]">
                    工事件名
                  </th>
                  {daysInMonth.map((day, index) => (
                    <th
                      key={index}
                      className={getDayClassName(day)}
                      style={{ width: '40px', minWidth: '40px' }}
                    >
                      {format(day, 'd')}
                    </th>
                  ))}
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-[120px]">
                    着工日
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-[120px]">
                    完了予定日
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConstructions.length === 0 ? (
                  <tr>
                    <td colSpan={daysInMonth.length + 3} className="px-6 py-4 text-center text-gray-500">
                      該当する工事案件がありません
                    </td>
                  </tr>
                ) : (
                  filteredConstructions.map((construction) => {
                    const startDate = parseISO(construction.startDate);
                    const endDate = parseISO(construction.estimatedCompletionDate);
                    
                    return (
                      <tr key={construction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 sticky left-0 bg-white border-r border-gray-200 w-[300px]">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="text-sm font-medium text-gray-900 break-words">
                                {construction.title}
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(construction.status)}`}>
                                {getStatusText(construction.status)}
                              </span>
                            </div>
                          </div>
                        </td>
                        {daysInMonth.map((day, index) => {
                          const isInRange = isWithinInterval(day, { start: startDate, end: endDate });
                          return (
                            <td
                              key={index}
                              className={getCellClassName(day)}
                              style={{ width: '40px', minWidth: '40px' }}
                            >
                              {isInRange && (
                                <div className={`h-2 ${getBarColor(construction.status)}`} />
                              )}
                            </td>
                          );
                        })}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[120px]">
                          {format(startDate, 'yyyy/MM/dd')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[120px]">
                          {format(endDate, 'yyyy/MM/dd')}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-blue-700">工程表の見方</h2>
          </div>
          <ul className="space-y-2 text-blue-600">
            <li>• 青色のバーは進行中の工事を表しています</li>
            <li>• 緑色のバーは完了した工事を表しています</li>
            <li>• 赤色のバーは遅延している工事を表しています</li>
            <li>• 灰色のバーは未着工の工事を表しています</li>
          </ul>
        </div>
      </div>
    </ConstructionLayout>
  );
}