'use client';

import { useState } from 'react';
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

const SERVICES_DATA = [
  {
    id: 1,
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
];

const CATEGORIES = ['ሁሉም', 'ነዋሪነትና መታወቂያ', 'ወሳኝ ኩነቶች', 'ንግድና ኢኮኖሚ', 'ግንባታና መሬት'];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ሁሉም');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = selectedCategory === 'ሁሉም' || service.category === selectedCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-bold text-blue-800">
            <Building2 className="w-4 h-4" />
            <span>የዜጎች ቻርተርና አገልግሎት አሰጣጥ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            የወረዳው የህዝብ አገልግሎቶች መመሪያ
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            በወረዳችን ጽሕፈት ቤት የሚሰጡ አገልግሎቶችን መስፈርቶች፣ የሚፈጀውን ጊዜ ይወቁ፤ አስፈላጊ የማመልከቻ ሰነዶችን በቀጥታ ያውርዱ።
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="የአገልግሎት ስም ወይም መስፈርቶችን እዚህ ይፈልጉ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 pl-12 pr-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
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
                          <span>{service.processingTime}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{service.fee}</span>
                        </span>
                      </div>
                    </div>

                    <button className="rounded-xl bg-slate-100 p-2 text-slate-600 shrink-0 mt-1 sm:mt-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-6 space-y-6">
                      
                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          የሚያስፈልጉ ቅድመ-ሁኔታዎችና ማስረጃዎች
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

                      {/* Downloadable PDF Forms */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          ሊወርዱ የሚችሉ የማመልከቻ ቅጾች
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
                                <span>አውርድ</span>
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
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              የተፈለገው አገልግሎት አልተገኘም። እባክዎ ሌላ ቃል ሞክረው ይፈልጉ።
            </div>
          )}
        </div>

        {/* Help Banner */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span>ተጨማሪ እገዛ ወይም ማብራሪያ ይፈልጋሉ?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              በአገልግሎት አሰጣጡ ላይ ግልጽ ያልሆነ ነገር ካለ የወረዳው የደንበኞች አገልግሎት ማዕከልን ያነጋግሩ።
            </p>
          </div>
          <a
            href="tel:994"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 shrink-0 shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>994 ላይ ይደውሉ</span>
          </a>
        </div>

      </div>
    </div>
  );
}