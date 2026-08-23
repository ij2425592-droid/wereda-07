'use client';

import { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  PhoneCall, 
  Send, 
  CheckCircle2,
  AlertCircle,
  Users
} from 'lucide-react';

const KEBELE_CONTACTS = [
  {
    kebele: 'ቀበሌ 01 ጽሕፈት ቤት',
    manager: 'አቶ አበበ ከበደ',
    phone: '+251 11 XXX 0101',
    location: 'ከዋናው አስፋልት 100 ሜትር ገባ ብሎ',
  },
  {
    kebele: 'ቀበሌ 02 ጽሕፈት ቤት',
    manager: 'ወ/ሮ ዘነቡ ታደሰ',
    phone: '+251 11 XXX 0102',
    location: 'ከጤና ጣቢያው ፊት ለፊት',
  },
  {
    kebele: 'ቀበሌ 03 ጽሕፈት ቤት',
    manager: 'አቶ ዮሐንስ በቀለ',
    phone: '+251 11 XXX 0103',
    location: 'ከመጀመሪያ ደረጃ ትምህርት ቤት አጠገብ',
  },
  {
    kebele: 'ቀበሌ 04 ጽሕፈት ቤት',
    manager: 'ወ/ሮ መሰረት አለሙ',
    phone: '+251 11 XXX 0104',
    location: 'የህዝብ አገልግሎት ማዕከል ግቢ ውስጥ',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    department: 'የኮሚዩኒኬሽን ጉዳዮች',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', emailOrPhone: '', department: 'የኮሚዩኒኬሽን ጉዳዮች', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-800">
            <Building2 className="w-4 h-4" />
            <span>የግንኙነትና የመረጃ ማዕከል</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            የወረዳችን አድራሻ እና የስልክ ማውጫ
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            የወረዳው ዋና መሥሪያ ቤት፣ የሥራ ክፍሎች እና የቀበሌ ጽሕፈት ቤቶችን አድራሻ በቀላሉ ያግኙ፤ ጥያቄዎን በቀጥታ ይላኩ።
          </p>
        </div>

        {/* Emergency & Key Numbers Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400">ነፃ የህዝብ ጥቆማ መስመር</span>
              <h3 className="text-2xl font-black text-emerald-400 tracking-wider">994</h3>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-red-600/30 text-red-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400">የአደጋ ጊዜ እና የወረዳ ፖሊስ</span>
              <h3 className="text-xl font-bold text-white">+251 11 XXX 9911</h3>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/30 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400">የአገልግሎት ሰዓት</span>
              <h3 className="text-sm font-bold text-white">ከሰኞ - አርብ (2:30 - 11:30)</h3>
            </div>
          </div>
        </div>

        {/* Main Grid: Office Info + Quick Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                የዋናው መሥሪያ ቤት አድራሻ
              </h3>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">አካላዊ አድራሻ</span>
                    <span>ወረዳ ጽሕፈት ቤት ዋና ሕንፃ፣ አዲስ አበባ፣ ኢትዮጵያ</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">የመረጃ ዴስክ ስልክ</span>
                    <span>+251 11 XXX 0000 / +251 11 XXX 0001</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">ኢሜይል አድራሻ</span>
                    <span>info@woreda.gov.et / media@woreda.gov.et</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">የህዝብ አገልግሎት መስጫ ሰዓታት</span>
                    <span>ሰኞ - ሐሙስ፡ 2:30 - 6:30 | 7:30 - 11:30</span>
                    <span className="block">አርብ፡ 2:30 - 5:30 | 7:30 - 11:30</span>
                    <span className="block text-xs text-slate-400 mt-0.5">* ቅዳሜና እሁድ እንዲሁም በበዓላት ዝግ ነው</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: General Inquiries Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              ፈጣን መልእክት ወይም አጠቃላይ ጥያቄ ይላኩ
            </h3>

            {isSent ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>መልእክትዎ ደርሷል! የሚመለከተው የሥራ ክፍል በቅርቡ ምላሽ ይሰጥዎታል።</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">ስም</label>
                    <input
                      type="text"
                      required
                      placeholder="ሙሉ ስምዎን ያስገቡ"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">ስልክ ቁጥር ወይም ኢሜይል</label>
                    <input
                      type="text"
                      required
                      placeholder="09... / name@email.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">የሚመለከተው የሥራ ክፍል</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    <option value="የኮሚዩኒኬሽን ጉዳዮች">የኮሚዩኒኬሽንና የሚዲያ ጉዳዮች</option>
                    <option value="የደንበኞች አገልግሎት">የደንበኞች አገልግሎት ማዕከል</option>
                    <option value="የወሳኝ ኩነቶች">የወሳኝ ኩነቶችና ነዋሪዎች አገልግሎት</option>
                    <option value="የንግድና ኢንዱስትሪ">የንግድና ኢንዱስትሪ ጽሕፈት ቤት</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">መልእክት</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="ጥያቄዎን ወይም አስተያየትዎን እዚህ ይጻፉ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold p-3.5 shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>መልእክቱን ላክ</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Kebeles Directory Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>የቀበሌ ጽሕፈት ቤቶች አድራሻ እና ስልክ ማውጫ</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              በአቅራቢያዎ የሚገኘውን የቀበሌ አስተዳደር ለማግኘት የሚከተሉትን ስልኮች ይጠቀሙ።
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEBELE_CONTACTS.map((k, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-colors"
              >
                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">{k.kebele}</h3>
                  <span className="text-xs text-blue-700 font-semibold">{k.manager}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono font-semibold text-slate-800">{k.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{k.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}