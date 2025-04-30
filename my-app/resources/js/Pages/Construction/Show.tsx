import React, { useState, useRef } from 'react';
import ConstructionLayout from '@/Layouts/ConstructionLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, FileText, Clock, Users, CheckCircle, XCircle, Building2, AlertTriangle, Download } from 'lucide-react';
import type { Construction, ApproveReport } from '@/types';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  construction: Construction;
  auth: {
    user: {
      id: number;
    };
  };
}

export default function Show({ construction, auth }: Props) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [processingApproveItem, setProcessingApproveItem] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  if (!construction) {
    return (
      <ConstructionLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">工事情報が見つかりません</h1>
            <p className="mt-2 text-gray-600">この工事は存在しないか、削除された可能性があります。</p>
            <Link
              href="/constructions/reports"
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              報告書一覧に戻る
            </Link>
          </div>
        </div>
      </ConstructionLayout>
    );
  }

  const report = Array.isArray(construction.report) && construction.report.length > 0 ? construction.report[0] : undefined;

  const getStatusBadge = (status: ApproveReport['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            承認済み
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            却下
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            承認待ち
          </span>
        );
    }
  };

  const handleApprove = (approveItemId: number) => {
    if (!report) return;
    
    setProcessingApproveItem(approveItemId);
    router.post(`/constructions/reports/${report.id}/approve`, {
      approve_item_id: approveItemId,
    }, {
      onFinish: () => setProcessingApproveItem(null),
    });
  };

  const handleReject = (approveItemId: number) => {
    if (!report) return;
    
    setProcessingApproveItem(approveItemId);
    router.post(`/constructions/reports/${report.id}/reject`, {
      approve_item_id: approveItemId,
      reason: rejectReason,
    }, {
      onFinish: () => {
        setProcessingApproveItem(null);
        setShowRejectModal(false);
        setRejectReason('');
      },
    });
  };

  const canApprove = (approveItem: NonNullable<Construction['report']>[number]['approve_items'][number]) => {
    if (!report?.approve_items) return false;

    // 承認者が自分であることを確認
    if (approveItem.user_id !== auth.user.id) {
      return false;
    }

    // 現在の承認ステータスが pending であることを確認
    if (approveItem.pivot.status !== 'pending') {
      return false;
    }

    // 承認順序を取得
    const approverOrder = report.approve_items;
    const currentIndex = approverOrder.findIndex(item => item.id === approveItem.id);

    // 前の承認者全員が承認済みであることを確認
    const previousApprovers = approverOrder.slice(0, currentIndex);
    return previousApprovers.every(item => item.pivot.status === 'approved');
  };

  const exportToPDF = async () => {
    if (!reportRef.current || !report) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 報告書の内容を画像として追加
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth - 20, imgHeight * 0.8);
      
      pdf.save(`工事報告書_${construction.title}_${format(new Date(), 'yyyyMMdd')}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!report) {
    return (
      <ConstructionLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">報告書が見つかりません</h1>
            <p className="mt-2 text-gray-600">この工事の報告書は存在しないか、削除された可能性があります。</p>
            <Link
              href="/construction/reports"
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              報告書一覧に戻る
            </Link>
          </div>
        </div>
      </ConstructionLayout>
    );
  }

  const isAllApproved = report.approve_items.every(item => item.pivot.status === 'approved');

  return (
    <ConstructionLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Head title="工事報告書詳細" />

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/construction/reports"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                戻る
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">工事報告書詳細</h1>
            </div>
            {isAllApproved && (
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Download className="w-5 h-5 mr-2" />
                {isExporting ? 'PDF出力中...' : 'PDF出力'}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" ref={reportRef}>
          <div className="p-8">
            {/* 工事情報セクション */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 text-gray-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">工事情報</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">工事名</dt>
                    <dd className="mt-1 text-sm text-gray-900">{construction.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">工期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {format(new Date(construction.startDate), 'yyyy/MM/dd')} 〜{' '}
                      {format(new Date(construction.estimatedCompletionDate), 'yyyy/MM/dd')}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500">工事概要</dt>
                    <dd className="mt-1 text-sm text-gray-900">{construction.description}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* 報告内容セクション */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-gray-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">報告内容</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">点検内容</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">
                      {report.inspection_details}
                    </p>
                  </div>
                </div>
                {report.concerns && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">懸案事項</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {report.concerns}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 承認状況セクション */}
            <div>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-gray-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">承認状況</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  {report.approve_items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          {item.pivot.status === 'approved' && (
                            <div className="mt-1">
                              <div className="text-xs text-gray-500">
                                承認日時: {format(new Date(item.updated_at || ''), 'yyyy/MM/dd HH:mm')}
                              </div>
                              <div className="mt-1 border border-gray-300 rounded p-2 bg-white">
                                <div className="text-center text-sm font-bold">
                                  承認印
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>{getStatusBadge(item.pivot.status)}</div>
                        {canApprove(item) && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(item.id)}
                              disabled={processingApproveItem === item.id}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                            >
                              承認
                            </button>
                            <button
                              onClick={() => {
                                setProcessingApproveItem(item.id);
                                setShowRejectModal(true);
                              }}
                              disabled={processingApproveItem === item.id}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                            >
                              却下
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 却下理由モーダル */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">却下理由の入力</h3>
              </div>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
                placeholder="却下理由を入力してください"
                required
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason('');
                    setProcessingApproveItem(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => handleReject(processingApproveItem!)}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  却下する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConstructionLayout>
  );
}
