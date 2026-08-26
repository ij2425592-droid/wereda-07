import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { logoutAdmin, deleteArticle } from './actions';
import { Plus, Trash2, ExternalLink, LogOut, Newspaper } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const articles = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Top Navbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Newspaper className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">የዜና እና መረጃ ማስተዳደሪያ</h1>
                            <p className="text-xs text-slate-500">አጠቃላይ የተመዘገቡ ዜናዎች: {articles.length}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/new"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>አዲስ ዜና ጻፍ</span>
                        </Link>

                        <form action={logoutAdmin}>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>ውጣ</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                                    <th className="p-4">ርዕስ</th>
                                    <th className="p-4">ምድብ</th>
                                    <th className="p-4">ደራሲ</th>
                                    <th className="p-4">የተለጠፈበት ቀን</th>
                                    <th className="p-4 text-right">እርምጃዎች</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {articles.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-slate-400 text-sm">
                                            ምንም የተመዘገበ ዜና የለም። አዲስ ዜና ይጨምሩ።
                                        </td>
                                    </tr>
                                ) : (
                                    articles.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">
                                                {item.title}
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-600 text-xs">{item.author}</td>
                                            <td className="p-4 text-slate-500 text-xs">
                                                {new Date(item.createdAt).toLocaleDateString('am-ET')}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                    target="_blank"
                                                    className="inline-p-1.5 text-slate-400 hover:text-blue-600 inline-block align-middle"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <form action={deleteArticle.bind(null, item.id)} className="inline-block align-middle">
                                                    <button
                                                        type="submit"
                                                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}