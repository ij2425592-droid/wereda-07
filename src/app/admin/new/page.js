'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { createArticle } from '../actions';
import { ArrowLeft, Send, Upload, Image as ImageIcon, X, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function NewArticlePage() {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [showUrlFallback, setShowUrlFallback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) {
            alert('እባክዎ ትክክለኛ የምስል ፋይል (JPG, PNG, WEBP) ይምረጡ።');
            return;
        }

        setFileName(file.name);
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        setFileSize(file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`);

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
            }
            handleFile(file);
        }
    };

    const handleRemoveFile = () => {
        setPreviewUrl(null);
        setFileName('');
        setFileSize('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>ወደ ዳሽቦርድ ተመለስ</span>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-900">አዲስ ዜና መመዝገቢያ</h1>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                    <form 
                        action={createArticle} 
                        onSubmit={() => setIsSubmitting(true)}
                        className="space-y-6"
                    >
                        {/* Title */}
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

                        {/* Category & Author */}
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

                        {/* Image Upload Zone */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    የዜናው ዋና ፎቶ (Cover Image)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowUrlFallback(!showUrlFallback)}
                                    className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-medium"
                                >
                                    <LinkIcon className="w-3 h-3" />
                                    <span>{showUrlFallback ? 'ከኮምፒውተር ፎቶ ምረጥ' : 'በሊንክ (URL) ማስገባት'}</span>
                                </button>
                            </div>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="imageFile"
                                accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                                onChange={handleFileInputChange}
                                className="hidden"
                            />

                            {!showUrlFallback ? (
                                <div>
                                    {!previewUrl ? (
                                        <div
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                                                dragActive
                                                    ? 'border-blue-500 bg-blue-50/50'
                                                    : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30'
                                            }`}
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                                                <Upload className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-800">
                                                ከኮምፒውተርዎ ፎቶ ለመጫን እዚህ ይጫኑ
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                ወይም ፎቶውን እዚህ ይጎትቱ (Drag & Drop)
                                            </p>
                                            <p className="text-[11px] text-slate-400 mt-2">
                                                PNG, JPG, WEBP እስከ 10MB
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-200 shrink-0">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={previewUrl}
                                                        alt="Upload preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mb-1">
                                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                        <span>ፎቶው በተሳካ ሁኔታ ተመርጧል</span>
                                                    </div>
                                                    <p className="text-xs font-medium text-slate-800 truncate">
                                                        {fileName}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400">
                                                        {fileSize}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                                                    >
                                                        ቀይር
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveFile}
                                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="አስወግድ"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            name="coverImageUrl"
                                            placeholder="https://images.unsplash.com/... ወይም የ Cloudinary ሊንክ"
                                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-1">
                                        ከበይነመረብ የቀጥታ ምስል ሊንክ ማስገባት ይችላሉ።
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
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

                        {/* Content */}
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                            <span>{isSubmitting ? 'ዜናው በመለጠፍ ላይ ነው...' : 'ዜናውን አስተላልፍ / ለጥፍ'}</span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}