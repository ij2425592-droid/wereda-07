import { 
  Compass, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Award, 
  Users, 
  Clock, 
  TrendingUp, 
  HeartHandshake, 
  Building 
} from 'lucide-react';

export default function VisionMissionSection({ showHeader = true, className = '' }) {
  const values = [
    {
      title: 'ተጠያቂነት',
      desc: 'በምንሰጠው ማንኛውም መረጃ እና አገልግሎት ሙሉ ኃላፊነት መውሰድ።',
      icon: ShieldCheck,
      color: 'blue'
    },
    {
      title: 'ግልጽነት',
      desc: 'ህዝብ ትክክለኛውንና ወቅታዊውን መረጃ ያለምንም መደለያ እንዲያገኝ ማድረግ።',
      icon: Eye,
      color: 'emerald'
    },
    {
      title: 'የላቀ አገልግሎት መስጠት',
      desc: 'ለነዋሪው ጥራቱን የጠበቀ፣ ፈጣን እና ቀልጣፋ የኮሚዩኒኬሽን አገልግሎት መስጠት።',
      icon: Award,
      color: 'amber'
    },
    {
      title: 'በእውቀትና በእምነት መምራት / መስራት',
      desc: 'በሙያዊ እውቀት፣ በስነ-ምግባር እና በፅኑ እምነት ስራዎችን መተግበር።',
      icon: TrendingUp,
      color: 'indigo'
    },
    {
      title: 'ለለውጥ ዝግጁነት',
      desc: 'አዳዲስ አሰራሮችን እና ዘመናዊ የዲጂታል ቴክኖሎጂዎችን ለመቀበል ሁሌም ዝግጁ መሆን።',
      icon: Sparkles,
      color: 'purple'
    },
    {
      title: 'ለከተማችን ገፅታ ግንባታ ግንባር ቀደም ሚና',
      desc: 'የአዲስ አበባን እና የክፍለ ከተማችንን መልካም ገፅታ በዓለም አቀፍ ደረጃ ማስተዋወቅ።',
      icon: Building,
      color: 'cyan'
    },
    {
      title: 'የጋራ መግባባት ለመፍጠር መታገል',
      desc: 'በመንግስት እና በህብረተሰቡ መካከል ጠንካራ መተማመንና አንድነት እንዲሰፍን መስራት።',
      icon: HeartHandshake,
      color: 'rose'
    },
    {
      title: 'ለጊዜ ላቅ ያለ ዋጋ መስጠት',
      desc: 'ጊዜ ወሳኝ ሃብት መሆኑን ተረድቶ ፈጣን ምላሽ እና አገልግሎት በወቅቱ ማድረስ።',
      icon: Clock,
      color: 'orange'
    },
  ];

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 ${className}`}>
      {/* Section Header */}
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-4 py-1 text-xs font-bold text-blue-800">
            <Building className="w-3.5 h-3.5" />
            <span>ቦሌ ክፍለ ከተማ አስተዳደር የኮሙኒኬሽን ጽህፈት ቤት</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ራዕይ፣ ተልዕኮ እና እሴቶች
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            የጽህፈት ቤታችን ተቋማዊ አቅጣጫዎች፣ ዓላማዎች እና የምንመራባቸው መሠረታዊ መርሆች
          </p>
        </div>
      )}

      {/* Vision & Mission Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Vision (ራዕይ) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-blue-800/40 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-blue-300 flex items-center justify-center shadow-inner">
                <Compass className="w-7 h-7" />
              </div>
              <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-bold text-blue-300">
                የ 2022 ዓ.ም ግብ
              </span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">ተቋማዊ ራዕይ</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                ራዕይ (Vision)
              </h3>
            </div>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-medium">
              «በ2022 ዓ.ም ጠንካራ የኮሙኒኬሽን ስርዓት በመዘርጋት በቂና የተሟላ መረጃ ያለው፣ በከተማዋ ሁለንተናዊ እድገት ንቁ ተሳትፎ የሚያደርግ ህብረተሰብ በመፍጠር ከተማችን አዲስ አበባ የአፍሪካ የበለፀገች ተምሳሌት ሆና ማየት።»
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-blue-800/50 flex items-center gap-2 text-xs font-semibold text-blue-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ጠንካራ የመረጃ ተደራሽነትና የህዝብ ንቁ ተሳትፎ</span>
          </div>
        </div>

        {/* 2. Mission (ተልዕኮ) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-700/60 flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
                ቀዳሚ ተልዕኮ
              </span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">ተቋማዊ ተልዕኮ</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                ተልዕኮ (Mission)
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              «በጽህፈት ቤቱ የተለያዩ የኮሙኒኬሽን አግባቦችን በመጠቀም ዘመናዊ፣ ግልጽ እና ፈጣን ምላሽ መስጠትን ባህል ያደረገ የኮሙኒኬሽን ስርዓት በመዘርጋትና በዘርፉ መሪ ሚና በመጫወት እንዲሁም በመንግስትና በህዝቡ መካከል ጥራት ያለው እና ለሁሉም ነዋሪ ተደራሽ የመረጃ ፍሰት እንዲኖር ማድረግ።»
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ዘመናዊ፣ ፈጣን እና ግልጽ የኮሙኒኬሽን ድልድይ</span>
          </div>
        </div>

      </div>

      {/* 3. Core Values (እሴቶች) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">የአሰራር መርሆቻችን</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              ተቋማዊ እሴቶች (Core Values)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            በእያንዳንዱ የስራ ክፍላችን እና አገልግሎታችን የምንመራባቸው እና የምንጠብቃቸው መሠረታዊ እሴቶች
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="group relative p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-blue-500 transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
