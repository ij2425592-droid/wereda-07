import Link from 'next/link';
import { createArticle } from '../actions';
import { ArrowLeft, Send } from 'lucide-react';

export default function NewArticlePage() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-3xl mx-auto space-y-6">

                <div className="flex items-center justify-between">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>ወደ ዳሽቦርድ ተመለስ</span>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-900">አዲስ ዜና መመዝገቢያ</h1>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                    <form action={createArticle} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                የዜናው ርዕስ *
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="ለምሳሌ፡ በወረዳው አዲስ የጤና ጣቢያ ግንባታ ተጀመረ"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    ምድብ (Category)
                                </label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="ልማት">ልማት</option>
                                    <option value="አስተዳደር">አስተዳደር</option>
                                    <option value="ማህበራዊ">ማህበራዊ</option>
                                    <option value="ግብርና">ግብርና</option>
                                    <option value="አጠቃላይ">አጠቃላይ</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    አዘጋጅ / ደራሲ
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    defaultValue="የኮሚዩኒኬሽን ጉዳዮች"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                የምስል ማስፈንጠሪያ (Image URL)
                            </label>
                            <input
                                type="url"
                                name="coverImage"
                                placeholder="https://images.unsplash.com/... ወይም የ Cloudinary ሊንክ"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                አጭር ማጠቃለያ (Excerpt) *
                            </label>
                            <textarea
                                name="excerpt"
                                rows="2"
                                required
                                placeholder="በዜና ካርዶች ላይ የሚታይ አጭር ማጠቃለያ..."
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                ሙሉ የዜናው ዝርዝር ይዘት (Content) *
                            </label>
                            <textarea
                                name="content"
                                rows="8"
                                required
                                placeholder="ሙሉ የዜናውን ዝርዝር እዚህ ይጻፉ..."
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>ዜናውን አስተላልፍ / ለጥፍ</span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}