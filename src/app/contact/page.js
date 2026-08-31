'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { useLanguage } from '@/context/LanguageContext';

const KEBELES_BY_LANG = {
  am: [
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
  ],
  en: [
    {
      kebele: 'Kebele 01 Branch Office',
      manager: 'Ato Abebe Kebede',
      phone: '+251 11 XXX 0101',
      location: '100m off the main asphalt road',
    },
    {
      kebele: 'Kebele 02 Branch Office',
      manager: 'W/ro Zenebu Tadesse',
      phone: '+251 11 XXX 0102',
      location: 'Opposite to Public Health Center',
    },
    {
      kebele: 'Kebele 03 Branch Office',
      manager: 'Ato Yohannes Bekele',
      phone: '+251 11 XXX 0103',
      location: 'Adjacent to Primary School compound',
    },
    {
      kebele: 'Kebele 04 Branch Office',
      manager: 'W/ro Meseret Alemu',
      phone: '+251 11 XXX 0104',
      location: 'Inside Public Service Center complex',
    },
  ],
  or: [
    {
      kebele: 'Waajjira Ganda 01',
      manager: 'Obbo Abbabaa Kabbadaa',
      phone: '+251 11 XXX 0101',
      location: 'Asfaaltii guddaa irraa meetira 100 ol siqee',
    },
    {
      kebele: 'Waajjira Ganda 02',
      manager: 'Aaddee Zanabuu Taaddasaa',
      phone: '+251 11 XXX 0102',
      location: 'Fuuldura buufata fayyaatti',
    },
    {
      kebele: 'Waajjira Ganda 03',
      manager: 'Obbo Yohaannis Baqqalaa',
      phone: '+251 11 XXX 0103',
      location: 'Mana barumsaa sadarkaa tokkoffaa cinaatti',
    },
    {
      kebele: 'Waajjira Ganda 04',
      manager: 'Aaddee Masarat Alamuu',
      phone: '+251 11 XXX 0104',
      location: 'Wiirtuu tajaajila uummataa keessatti',
    },
  ]
};

export default function ContactPage() {
  const { t, language } = useLanguage();
  const c = t.contact;

  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    department: c.deptOptions[0] || 'የኮሚዩኒኬሽን ጉዳዮች',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const kebeleContacts = KEBELES_BY_LANG[language] || KEBELES_BY_LANG.am;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', emailOrPhone: '', department: c.deptOptions[0], message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Breadcrumb & Header Section */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">{c.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-blue-700">{c.breadcrumbContact}</span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-800">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>{t.home.heroBadge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {c.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {c.subtitle}
            </p>
          </div>
        </div>

        {/* Emergency & Key Numbers Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400">{t.nav.hotlineLabel}</span>
              <h3 className="text-2xl font-black text-emerald-400 tracking-wider">994</h3>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-red-600/30 text-red-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400">Emergency & Police Line</span>
              <h3 className="text-xl font-bold text-white">+251 11 XXX 9911</h3>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/30 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400">{c.workingHoursTitle}</span>
              <h3 className="text-xs font-bold text-white">{c.workingHoursVal}</h3>
            </div>
          </div>
        </div>

        {/* Main Grid: Office Info + Quick Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                {c.hqTitle}
              </h3>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">Address</span>
                    <span>{c.addressVal}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">{c.phoneTitle}</span>
                    <span>+251 11 XXX 0000 / +251 11 XXX 0001</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">{c.emailTitle}</span>
                    <span>info@woreda.gov.et / media@woreda.gov.et</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">{c.workingHoursTitle}</span>
                    <span>{c.workingHoursVal}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: General Inquiries Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              {c.sendMessageTitle}
            </h3>

            {isSent ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>{c.sentSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">{c.nameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">{c.emailOrPhoneLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="09... / email@domain.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">{c.deptLabel}</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  >
                    {c.deptOptions.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">{c.messageLabel}</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your message or enquiry..."
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
                  <span>{c.sendBtn}</span>
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
              <span>{c.kebelesTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Contact directory of your local Kebele administration offices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kebeleContacts.map((k, index) => (
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