'use client';

import { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Search, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  UploadCloud,
  Copy,
  Check
} from 'lucide-react';

const KEBELES = [
  'ቀበሌ 01',
  'ቀበሌ 02',
  'ቀበሌ 03',
  'ቀበሌ 04',
  'ቀበሌ 05',
  'ቀበሌ 06',
  'ቀበሌ 07',
  'ቀበሌ 08'
];

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'track'
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    category: 'ቅሬታ',
    kebele: 'ቀበሌ 01',
    subject: '',
    message: '',
    isAnonymous: false,
  });

  const [submittedCode, setSubmittedCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  // 1. Submit Feedback Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API Delay እና Tracking ID ማመንጫ (ለምሳሌ: WRD-2026-8941)
    setTimeout(() => {
      const generatedCode = `WRD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCode(generatedCode);
      setIsSubmitting(false);
    }, 800);
  };

  // 2. Track Feedback Status Handler
  const handleTrack = (e) => {
    e.preventDefault();
    setTrackError('');
    setTrackResult(null);

    if (!trackQuery.trim()) {
      setTrackError('እባክዎ ትክክለኛ የመከታተያ ኮድ ያስገቡ');
      return;
    }

    // Mock Tracking Data (በእውነተኛ አሰራር ከ Strapi/DB Fetch የሚደረግ)
    if (trackQuery.toUpperCase().startsWith('WRD-')) {
      setTrackResult({
        code: trackQuery.toUpperCase(),
        date: 'ነሐሴ 18, 2018',
        category: 'የመልካም አስተዳደር ቅሬታ',
        kebele: 'ቀበሌ 03',
        status: 'በሂደት_ላይ', // 'አዲስ' | 'በሂደት_ላይ' | 'የተጠናቀቀ'
        remark: 'ጉዳዩ ለሚመለከተው የሥራ ኃላፊ ተመርቶ በምርመራ ሂደት ላይ ይገኛል።',
      });
    } else {
      setTrackError('ይህ የመከታተያ ኮድ በሲስተሙ ውስጥ አልተገኘም። እባክዎ ኮዱን አረጋግጠው ዳግም ይሞክሩ።');
    }
  };

  const copyToClipboard = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-800">
            <ShieldCheck className="w-4 h-4" />
            <span>ግልጽ እና ተጠያቂነት ያለው አሰራር</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            የህዝብ ቅሬታ፣ ጥቆማ እና አስተያየት መስጫ
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            በወረዳችን አገልግሎት አሰጣጥ ላይ ያለዎትን ቅሬታ ወይም የማህበረሰብ ልማት ጥቆማዎችን እዚህ ያድርሱ። ጉዳይዎን በሚሰጥዎት ኮድ መከታተል ይችላሉ።
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-200 p-1.5 rounded-2xl max-w-md mx-auto shadow-inner">
          <button
            onClick={() => { setActiveTab('submit'); setSubmittedCode(null); }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'submit'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            አዲስ ጥቆማ / ቅሬታ ላክ
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'track'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            የጉዳይ ሁኔታ መከታተያ
          </button>
        </div>

        {/* Tab 1: Submit Feedback Form */}
        {activeTab === 'submit' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
            {submittedCode ? (
              // Success Screen with Tracking Code
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    መልእክትዎ በተሳካ ሁኔታ ደርሷል!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    ጥቆማዎ ወደ ወረዳው አቤቱታ ሰሚ ክፍል ተመርቷል። ጉዳይዎ የደረሰበትን ደረጃ ለመከታተል ይህንን ኮድ ይጠቀሙ፡
                  </p>
                </div>

                <div className="inline-flex items-center gap-3 bg-slate-100 border border-slate-300 px-6 py-3.5 rounded-2xl">
                  <span className="text-xl sm:text-2xl font-mono font-black text-blue-700 tracking-wider">
                    {submittedCode}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-600"
                    title="ኮዱን ኮፒ አድርግ"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => { setSubmittedCode(null); setFormData({ fullName: '', phoneNumber: '', category: 'ቅሬታ', kebele: 'ቀበሌ 01', subject: '', message: '', isAnonymous: false }); }}
                    className="text-sm font-bold text-blue-700 hover:underline"
                  >
                    ተጨማሪ ሌላ መልእክት ለመላክ እዚህ ይጫኑ
                  </button>
                </div>
              </div>
            ) : (
              // The Actual Form
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-900">ያለ ስም (በሚስጥር) መላክ ይፈልጋሉ?</span>
                    <p className="text-xs text-slate-500">የግል መረጃዎን ሳይገልጹ ቅሬታዎን ማቅረብ ይችላሉ</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {/* Personal Details (if not anonymous) */}
                {!formData.isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">ሙሉ ስም</label>
                      <input
                        type="text"
                        placeholder="ስምዎን ያስገቡ"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">ስልክ ቁጥር</label>
                      <input
                        type="tel"
                        placeholder="09... / 07..."
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Category & Kebele */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">የመልእክቱ ዓይነት *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    >
                      <option value="ቅሬታ">የአገልግሎት አሰጣጥ ቅሬታ</option>
                      <option value="ጥቆማ">የመልካም አስተዳደር ጥቆማ</option>
                      <option value="የልማት_ሀሳብ">የልማትና የመሰረተ ልማት ጥያቄ</option>
                      <option value="አድናቆት">አድናቆት እና አስተያየት</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">የሚመለከተው ቀበሌ *</label>
                    <select
                      value={formData.kebele}
                      onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    >
                      {KEBELES.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">የጉዳዩ ርዕስ *</label>
                  <input
                    type="text"
                    required
                    placeholder="የጉዳዩን ዋና ሃሳብ በአጭሩ ይግለጹ"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">ዝርዝር ማብራሪያ *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="ስለ ጉዳዩ በቂ መረጃ፣ ቀን እና የተከሰተበትን ቦታ በዝርዝር ይጻፉ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* File Attachment Upload Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">ማስረጃ ፋይል/ፎቶ (አማራጭ)</label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50 cursor-pointer transition-colors">
                    <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">ማስረጃ ፎቶ ወይም ፒዲኤፍ (PDF) ይጫኑ</p>
                    <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, PDF እስከ 5MB</p>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold p-4 shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'እየተላከ ነው...' : 'መልእክቱን ላክ'}</span>
                </button>

              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Feedback Status */}
        {activeTab === 'track' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Search Box */}
            <form onSubmit={handleTrack} className="space-y-4">
              <label className="block text-sm font-bold text-slate-800">
                የመከታተያ ኮድዎን (Tracking Code) ያስገቡ
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ለምሳሌ፡ WRD-2026-XXXX"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm font-mono uppercase focus:border-blue-600 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 text-sm shadow-sm transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>ፈልግ</span>
                </button>
              </div>
              {trackError && (
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}
            </form>

            {/* Tracking Result Card */}
            {trackResult && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs text-slate-500">የመከታተያ ቁጥር</span>
                    <h3 className="text-lg font-mono font-black text-blue-700">{trackResult.code}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>በሂደት ላይ ያለ</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">የቀረበበት ቀን፡</span>
                    <p className="font-bold text-slate-800 mt-0.5">{trackResult.date}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">የሚመለከተው ክፍል/ቀበሌ፡</span>
                    <p className="font-bold text-slate-800 mt-0.5">{trackResult.kebele}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-700">የአስተዳደሩ ምላሽ/ሁኔታ፡</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {trackResult.remark}
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}