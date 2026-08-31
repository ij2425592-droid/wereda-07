'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  FileText, 
  Download, 
  Clock, 
  CreditCard, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  HelpCircle, 
  PhoneCall 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SERVICES_BY_LANG = {
  am: [
    {
      id: 1,
      categoryKey: 'residence',
      category: 'ነዋሪነትና መታወቂያ',
      title: 'የአዲስ ነዋሪነት መታወቂያ ካርድ አሰጣጥ',
      department: 'የወሳኝ ኩነቶችና ነዋሪዎች አገልግሎት ክፍል',
      processingTime: '1 - 2 የሥራ ቀናት',
      fee: '50 ብር',
      requirements: [
        'የቀድሞ መኖሪያ ቀበሌ/ወረዳ የልቀቃ ደብዳቤ (ካለ)',
        'የቤት ባለቤትነት ሰነድ ወይም ህጋዊ የኪራይ ውል ስምምነት',
        'በቅርብ ጊዜ የተነሱ 2 ጉርድ ፎቶግራፎች (3x4)',
        'የታደሰ የትውልድ ወይም የልደት ካርድ ማስረጃ'
      ],
      forms: [
        { name: 'የነዋሪነት መታወቂያ ማመልከቻ ቅጽ', size: '240 KB', url: '#' },
        { name: 'የአድራሻ ማረጋገጫ ፎርማት', size: '180 KB', url: '#' }
      ]
    },
    {
      id: 2,
      categoryKey: 'residence',
      category: 'ነዋሪነትና መታወቂያ',
      title: 'የጠፋ ወይም የተበላሸ መታወቂያ ምትክ አሰጣጥ',
      department: 'የወሳኝ ኩነቶችና ነዋሪዎች አገልግሎት ክፍል',
      processingTime: '1 የሥራ ቀን',
      fee: '100 ብር',
      requirements: [
        'ከፖሊስ ጣቢያ የተሰጠ የጠፋ ማስረጃ ደብዳቤ',
        'የቀድሞ መታወቂያ ኮፒ (ካለ)',
        '2 ጉርድ ፎቶግራፎች'
      ],
      forms: [
        { name: 'የጠፋ መታወቂያ ምትክ ማመልከቻ', size: '210 KB', url: '#' }
      ]
    },
    {
      id: 3,
      categoryKey: 'vital',
      category: 'ወሳኝ ኩነቶች',
      title: 'የልደት እና የጋብቻ ምዝገባ ምስክር ወረቀት',
      department: 'የወሳኝ ኩነቶች ምዝገባ ክፍል',
      processingTime: 'በቀጠሮ (በዕለቱ)',
      fee: 'ነፃ (በህጉ በተወሰነው ጊዜ ውስጥ)',
      requirements: [
        'ከጤና ተቋም የተሰጠ የልደት ማስታወቂያ ሰነድ (ለልደት)',
        'የወላጆች የታደሰ የነዋሪነት መታወቂያ',
        'የጋብቻ ማረጋገጫ እና 2 ምስክሮች ከመታወቂያ ጋር (ለጋብቻ)'
      ],
      forms: [
        { name: 'የወሳኝ ኩነቶች ምዝገባ መጠየቂያ ቅጽ', size: '320 KB', url: '#' }
      ]
    },
    {
      id: 4,
      categoryKey: 'trade',
      category: 'ንግድና ኢኮኖሚ',
      title: 'የአነስተኛና ጥቃቅን ንግድ ፈቃድ ምዝገባ እና እድሳት',
      department: 'የንግድና ኢንዱስትሪ ጽሕፈት ቤት',
      processingTime: '2 - 3 የሥራ ቀናት',
      fee: 'እንደ ንግድ ዘርፉ ይለያያል',
      requirements: [
        'የታደሰ የነዋሪነት መታወቂያ',
        'የንግድ ቦታው ህጋዊ የኪራይ ውል ወይም የይዞታ ማረጋገጫ',
        'የግብር ከፋይ መለያ ቁጥር (TIN Number)',
        'የደረጃ ብቃት ማረጋገጫ (አስፈላጊ ለሆኑ የንግድ ዘርፎች)'
      ],
      forms: [
        { name: 'የንግድ ምዝገባና ፈቃድ መጠየቂያ ቅጽ', size: '450 KB', url: '#' },
        { name: 'የንግድ ስም ማረጋገጫ ማመልከቻ', size: '150 KB', url: '#' }
      ]
    },
    {
      id: 5,
      categoryKey: 'construction',
      category: 'ግንባታና መሬት',
      title: 'የመኖሪያ ቤት ግንባታ እና እድሳት ፈቃድ',
      department: 'የከተማ ፕላንና የመሬት አስተዳደር ክፍል',
      processingTime: '5 - 7 የሥራ ቀናት',
      fee: 'በካሬ ሜትር ስሌት መሰረት',
      requirements: [
        'ህጋዊ የይዞታ ማረጋገጫ ካርታ/ደብተር',
        'በተፈቀደለት ባለሙያ የተዘጋጀና የጸደቀ የግንባታ ፕላን',
        'የአጎራባች ይሁንታ እና የጣቢያ ፍተሻ ሪፖርት'
      ],
      forms: [
        { name: 'የግንባታ ፈቃድ ማመልከቻ እና የፕላን ፍተሻ ቅጽ', size: '520 KB', url: '#' }
      ]
    }
  ],
  en: [
    {
      id: 1,
      categoryKey: 'residence',
      category: 'Residency & ID',
      title: 'New Resident ID Card Issuance',
      department: 'Vital Events & Resident Services Section',
      processingTime: '1 - 2 Business Days',
      fee: '50 ETB',
      requirements: [
        'Release letter from previous Kebele / Woreda (if applicable)',
        'Proof of home ownership or legal lease agreement',
        '2 recent passport-size photographs (3x4)',
        'Renewed birth certificate or birth registry verification'
      ],
      forms: [
        { name: 'Resident ID Application Form', size: '240 KB', url: '#' },
        { name: 'Address Verification Document', size: '180 KB', url: '#' }
      ]
    },
    {
      id: 2,
      categoryKey: 'residence',
      category: 'Residency & ID',
      title: 'Replacement of Lost or Damaged ID Card',
      department: 'Vital Events & Resident Services Section',
      processingTime: '1 Business Day',
      fee: '100 ETB',
      requirements: [
        'Official police clearance / lost certificate letter',
        'Copy of previous ID card (if available)',
        '2 passport-size photographs'
      ],
      forms: [
        { name: 'Replacement ID Application Form', size: '210 KB', url: '#' }
      ]
    },
    {
      id: 3,
      categoryKey: 'vital',
      category: 'Vital Events',
      title: 'Birth and Marriage Certificate Registration',
      department: 'Civil Registry & Vital Statistics Office',
      processingTime: 'Same Day (By Appointment)',
      fee: 'Free (Within statutory grace period)',
      requirements: [
        'Official birth notification from recognized health facility (for birth)',
        'Renewed resident ID cards of biological parents',
        'Marriage verification and 2 witnesses with valid ID cards (for marriage)'
      ],
      forms: [
        { name: 'Vital Events Registration Request Form', size: '320 KB', url: '#' }
      ]
    },
    {
      id: 4,
      categoryKey: 'trade',
      category: 'Trade & Economy',
      title: 'SME Commercial Registration & License Renewal',
      department: 'Trade & Industry Bureau',
      processingTime: '2 - 3 Business Days',
      fee: 'Varies by business category',
      requirements: [
        'Renewed resident identification card',
        'Legal rental agreement or verified premise ownership deed',
        'Taxpayer Identification Number (TIN)',
        'Competency certificate (for regulated trade sectors)'
      ],
      forms: [
        { name: 'Commercial Registration & License Form', size: '450 KB', url: '#' },
        { name: 'Business Name Verification Request', size: '150 KB', url: '#' }
      ]
    },
    {
      id: 5,
      categoryKey: 'construction',
      category: 'Construction & Land',
      title: 'Residential Construction & Renovation Permits',
      department: 'Urban Planning & Land Administration Bureau',
      processingTime: '5 - 7 Business Days',
      fee: 'Calculated per square meter',
      requirements: [
        'Certified land ownership title deed / registry map',
        'Architectural design plan certified by licensed engineer',
        'Adjoining neighbor consents and field inspection report'
      ],
      forms: [
        { name: 'Building Permit & Site Review Form', size: '520 KB', url: '#' }
      ]
    }
  ],
  or: [
    {
      id: 1,
      categoryKey: 'residence',
      category: 'Jiraattummaa fi Eenyummaa',
      title: 'Waraqaa Eenyummaa Jiraattummaa Haaraa Baasuu',
      department: 'Kutaa Tajaajila Ragaalee Murteessoo fi Jiraattotaa',
      processingTime: 'Guyyaa Hojii 1 - 2',
      fee: 'Qarshii 50',
      requirements: [
        'Xalayaa gadhiisaa ganda/aanaa kanaan duraa (yoo jiraate)',
        'Ragaa abbaa qabeenyummaa manaa yookiin waliigaltee kireeffannaa seera qabeessaa',
        'Suuraa gabaabaa 2 dhiyeenya ka\'ame (3x4)',
        'Waraqaa ragaa dhalootaa haaromfame'
      ],
      forms: [
        { name: 'Foormii Iyyannoo Waraqaa Eenyummaa', size: '240 KB', url: '#' },
        { name: 'Waraqaa Mirkaneessa Teessoo', size: '180 KB', url: '#' }
      ]
    },
    {
      id: 2,
      categoryKey: 'residence',
      category: 'Jiraattummaa fi Eenyummaa',
      title: 'Waraqaa Eenyummaa Bade Bakka Buusuu',
      department: 'Kutaa Tajaajila Ragaalee Murteessoo fi Jiraattotaa',
      processingTime: 'Guyyaa Hojii 1',
      fee: 'Qarshii 100',
      requirements: [
        'Xalayaa ragaa baduu buufata poolisiitii kenname',
        'Koppii waraqaa eenyummaa duraanii (yoo jiraate)',
        'Suuraa gabaabaa 2'
      ],
      forms: [
        { name: 'Foormii Bakka Buusuu Waraqaa Eenyummaa', size: '210 KB', url: '#' }
      ]
    },
    {
      id: 3,
      categoryKey: 'vital',
      category: 'Ragaalee Murteessoo',
      title: 'Galmee fi Waraqaa Ragaa Dhalootaa fi Fuudhaa',
      department: 'Kutaa Galmee Ragaalee Murteessoo',
      processingTime: 'Beellamaan (Guyyuma sanatti)',
      fee: 'Bilisa (Yeroo seeraan murtaa\'e keessatti)',
      requirements: [
        'Beeksisa dhalootaa dhaabbata fayyaatii kenname (dhalootaaf)',
        'Waraqaa eenyummaa maatii haaromfame',
        'Mirkaneessa gaa\'elaa fi ragaalee 2 waraqaa eenyummaa qaban (gaa\'elaaf)'
      ],
      forms: [
        { name: 'Foormii Gaaffii Galmee Ragaalee Murteessoo', size: '320 KB', url: '#' }
      ]
    },
    {
      id: 4,
      categoryKey: 'trade',
      category: 'Daldala fi Diinagdee',
      title: 'Galmee fi Haaromsa Hayyama Daldala Xixiqqaa',
      department: 'Waajjira Daldalaa fi Industirii',
      processingTime: 'Guyyaa Hojii 2 - 3',
      fee: 'Akka gosa daldalaatti garaagarummaa qaba',
      requirements: [
        'Waraqaa eenyummaa jiraattummaa haaromfame',
        'Waliigaltee kireeffannaa iddoo daldalaa yookiin ragaa qabeenyummaa',
        'Lakkoofsa addaa kaffalaa gibiraa (TIN)',
        'Waraqaa mirkaneessa gahumsa ogummaa'
      ],
      forms: [
        { name: 'Foormii Galmee fi Hayyama Daldalaa', size: '450 KB', url: '#' },
        { name: 'Iyyannoo Mirkaneessa Maqaa Daldalaa', size: '150 KB', url: '#' }
      ]
    },
    {
      id: 5,
      categoryKey: 'construction',
      category: 'Ijaarsa fi Lafa',
      title: 'Hayyama Ijaarsaa fi Haaromsa Mana Jireenyaa',
      department: 'Kutaa Pilaanii Magaalaa fi Bulchiinsa Lafaa',
      processingTime: 'Guyyaa Hojii 5 - 7',
      fee: 'Shallaggii iskuweer meetiraan',
      requirements: [
        'Kaartaa / ragaa qabeenyummaa lafaa seera qabeessaa',
        'Pilaanii ijaarsaa ogeessaan qophaa\'ee mirkanaa\'e',
        'Hayyama ollaa fi gabaasa sakatta\'a iddoo'
      ],
      forms: [
        { name: 'Foormii Iyyannoo Hayyama Ijaarsaa', size: '520 KB', url: '#' }
      ]
    }
  ]
};

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const s = t.services;

  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const servicesData = SERVICES_BY_LANG[language] || SERVICES_BY_LANG.am;

  const categoryTabs = [
    { key: 'all', label: s.categories.all },
    { key: 'residence', label: s.categories.residence },
    { key: 'vital', label: s.categories.vital },
    { key: 'trade', label: s.categories.trade },
    { key: 'construction', label: s.categories.construction },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = selectedCategoryKey === 'all' || service.categoryKey === selectedCategoryKey;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Breadcrumb & Header Section */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">{s.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-blue-700">{s.breadcrumbServices}</span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-800">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>{t.home.quickServicesBadge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {s.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {s.subtitle}
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={s.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 pl-12 pr-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategoryKey(tab.key)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                  selectedCategoryKey === tab.key
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List / Accordion */}
        <div className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const isExpanded = expandedId === service.id;
              return (
                <div
                  key={service.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all"
                >
                  {/* Accordion Head */}
                  <div
                    onClick={() => toggleExpand(service.id)}
                    className="flex cursor-pointer items-start sm:items-center justify-between p-5 sm:p-6 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="space-y-1.5 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                          {service.category}
                        </span>
                        <span className="text-xs text-slate-400">• {service.department}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {service.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>{s.processingTime}: <strong>{service.processingTime}</strong></span>
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{s.fee}: <strong>{service.fee}</strong></span>
                        </span>
                      </div>
                    </div>

                    <button 
                      className="rounded-xl bg-slate-100 p-2 text-slate-600 shrink-0 mt-1 sm:mt-0"
                      aria-label="Toggle service details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-6 space-y-6">
                      
                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {s.requirementsTitle}
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
                          {service.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Downloadable Forms */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {s.formsTitle}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.forms.map((form, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-900">{form.name}</p>
                                  <span className="text-[11px] text-slate-400">PDF • {form.size}</span>
                                </div>
                              </div>
                              <a
                                href={form.url}
                                download
                                className="flex items-center gap-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 text-xs font-bold transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>{s.downloadForm}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 space-y-2">
              <p className="font-bold text-slate-700">{s.noResultsTitle}</p>
              <p className="text-xs">{s.noResultsDesc}</p>
            </div>
          )}
        </div>

        {/* Help Banner */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span>{s.helpTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {s.helpDesc}
            </p>
          </div>
          <a
            href="tel:994"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 shrink-0 shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{s.helpCall}</span>
          </a>
        </div>

      </div>
    </div>
  );
}