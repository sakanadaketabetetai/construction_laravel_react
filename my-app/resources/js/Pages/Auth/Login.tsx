import React from 'react';
import { KeyRound, UserRound } from 'lucide-react';
import { Head, useForm, Link } from '@inertiajs/react';

interface Props {
  status?: string;
  canResetPassword: boolean;
}

interface FormData {
  employee_id: string;
  password: string;
  remember: boolean;
  [key: string]: string | boolean;
}

export default function Login({ status, canResetPassword }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    employee_id: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Head title="ログイン" />
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-blue-50 mb-4">
              <KeyRound className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">工事管理システム</h1>
            <p className="mt-2 text-gray-600">社員番号とパスワードでログイン</p>
          </div>

          {status && (
            <div className="mb-4 text-sm font-medium text-green-600 text-center">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-2">
                社員番号
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="employee_id"
                  type="text"
                  value={data.employee_id}
                  onChange={e => setData('employee_id', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="例: EMP001"
                />
              </div>
              {errors.employee_id && (
                <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="パスワードを入力"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  ログイン状態を保持
                </label>
              </div>
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  パスワードを忘れた場合
                </Link>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                システムに関する問題は
                <Link href="/support" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                  システム管理者
                </Link>
                にお問い合わせください
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}