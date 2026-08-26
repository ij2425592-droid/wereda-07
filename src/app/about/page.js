import Link from 'next/link';
import { 
  Building2, 
  ArrowLeft, 
  Radio, 
  CheckCircle2, 
  Users, 
  FileText, 
  Megaphone, 
  MessageSquare, 
  Share2, 
  ArrowRight 
} from 'lucide-react';
import VisionMissionSection from '@/components/common/VisionMissionSection';

export const metadata = {
  title: 'ስለ እኛ | ራዕይ፣ ተልዕኮ እና እሴቶች | ቦሌ ክፍለ ከተማ አስተዳደር የኮሙኒኬሽን ጽህፈት ቤት',
  description: 'የቦሌ ክፍለ ከተማ አስተዳደር የኮሙኒኬሽን ጽህፈት ቤት ተቋማዊ ራዕይ፣ ተልዕኮ እና የሚመራባቸው መሠረታዊ እሴቶች',
};

export default function AboutPage() {
  const coreResponsibilities = [
    {
      title: 'የወቅታዊና ትክክለኛ መረጃ ስርጭት',
      desc: 'የክፍለ ከተማውን እና የወረዳዎችን ሁለንተናዊ የልማት፣ የመልካም አስተዳደር እና የአገልግሎት አሰጣጥ መረጃዎች ለህዝብ ማድረስ።',
      icon: Megaphone,
    },
    {
      title: 'የህዝብ አስተያየትና ግብረ-መልስ ማስተናገድ',
      desc: 'የነዋሪዎችን ጥቆማዎች፣ ጥያቄዎችና ቅሬታዎችን በመቀበል ለሚመለከታቸው የአመራር አካላት ማድረስና ፈጣን ምላሽ እንዲያገኙ ማድረግ።',
      icon: MessageSquare,
    },
    {
      title: 'የከተማይቱንና የክፍለ ከተማውን ገጽታ መገንባት',
      desc: 'አዲስ አበባ የአፍሪካ የበለፀገች ተምሳሌት እንድትሆን የከተማዋን መልካም ገጽታ በሀገር ውስጥና በዓለም አቀፍ ደረጃ ማስተዋወቅ።',
      icon: Building2,
    },
    {
      title: 'የሚዲያ እና የህዝብ ግንኙነት ስራዎች',
      desc: 'ከተለያዩ የመገናኛ ብዙሃን ጋር የተቀናጀ አሰራር በመዘርጋት አስተማማኝ የመረጃ ድልድይ ሆኖ ማገልገል።',
      icon: Share2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Breadcrumb & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">ዋና ገጽ</Link>
            <span>/</span>
            <span className="text-blue-700">ስለ እኛ</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-800">
                <Radio className="w-3.5 h-3.5 text-blue-700" />
                <span>ይፋዊ ተቋማዊ መግለጫ</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                ቦሌ ክፍለ ከተማ አስተዳደር <br />
                <span className="text-blue-700">የኮሙኒኬሽን ጽህፈት ቤት</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                ዘመናዊ፣ ግልጽና ፈጣን የኮሙኒኬሽን ስርዓት በመዘርጋት በመንግስትና በነዋሪው መካከል ታማኝ የመረጃ ድልድይ ሆነን እንሰራለን።
              </p>
            </div>

            <div className="flex sm:flex-col gap-3 shrink-0">
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 shadow-md transition-colors"
              >
                <span>ወቅታዊ ዜናዎችን ይመልከቱ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/feedback"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold px-5 py-3 transition-colors"
              >
                <span>ቅሬታ ወይም ጥቆማ ላክ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 1. Vision, Mission & Values Component */}
        <VisionMissionSection showHeader={false} />

        {/* 2. Key Responsibilities / ዋና ዋና ኃላፊነቶች */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              ተቋማዊ ተግባራት
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              የጽህፈት ቤታችን ዋና ዋና ኃላፊነቶች
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              በክፍለ ከተማችን የመረጃ ፍሰቱን ጥራትና ተደራሽነት ለማረጋገጥ የምናከናውናቸው ስራዎች
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreResponsibilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Call to Action Strip */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              አብረውን ይስሩ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              የእርስዎ ድምጽ እና ተሳትፎ ለከተማችን እድገት ወሳኝ ነው!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              ማንኛውንም ጥቆማ፣ አስተያየት ወይም ጥያቄ በኦንላይን ፖርታላችን በኩል በቀላሉ ያድርሱን።
            </p>
          </div>
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            <span>ጥቆማዎን አሁን ይላኩ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
