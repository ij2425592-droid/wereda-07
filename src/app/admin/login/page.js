'use client';

import { useActionState } from 'react';
import { loginAdmin } from '../actions';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(loginAdmin, null);

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">የአድሚን መግቢያ</h1>
                    <p className="text-sm text-slate-500">ይዘቶችን ለማስተዳደር የይለፍ ቃልዎን ያስገቡ</p>
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg text-center font-medium">
                        {state.error}
                    </div>
                )}

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            የይለፍ ቃል (Password)
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md disabled:opacity-50"
                    >
                        {isPending ? 'በማረጋገጥ ላይ...' : 'ግባ (Login)'}
                    </button>
                </form>
            </div>
        </div>
    );
}