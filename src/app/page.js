import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  ArrowRight, 
  FileText, 
  IdCard, 
  Briefcase, 
  MessageSquare, 
  AlertCircle, 
  Calendar,
  Users,
  Radio
} from 'lucide-react';
import { mockArticles } from '../data/mockNews';
import VisionMissionSection from '../components/common/VisionMissionSection';

export default function HomePage() {
  const latestNews = mockArticles.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-4 py-1.5 text-xs font-semibold text-blue-300">
                <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
                <span>ይፋዊ የመረጃና የሚዲያ ግንኙነት ፖርታል</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                ለፈጣን፣ ግልጽና ተዓማኒ <br className="hidden sm:inline" />
                <span className="text-blue-400">የወረዳ መረጃዎች</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                የወረዳችንን የልማት እንቅስቃሴዎች፣ የወጡ አስቸኳይ ማስታወቂያዎችን ይከታተሉ፤ የመንግሥት አገልግሎቶችን በቀላሉ ያግኙ፤ አስተያየትና ጥቆማዎን በቀጥታ ያድርሱ።
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/news"
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  ወቅታዊ ዜናዎችን አንብብ
                </Link>
                <Link
                  href="/feedback"
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all"
                >
                  ቅሬታ / ጥቆማ ላክ
                </Link>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/50 backdrop-blur-sm p-6 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white">120,000+</div>
                <div className="text-xs text-slate-400">የወረዳው ነዋሪዎች</div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/50 backdrop-blur-sm p-6 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white">12</div>
                <div className="text-xs text-slate-400">የቀበሌ አስተዳደሮች</div>
              </div>

              <div className="col-span-2 rounded-2xl border border-slate-800 bg-slate-800/50 backdrop-blur-sm p-6 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">የአገልግሎት ጥያቄዎች</div>
                  <div className="text-xl font-black text-white">24/7 የኦንላይን ጥቆማ</div>
                </div>
                <Link
                  href="/services"
                  className="rounded-lg bg-blue-600/20 text-blue-400 p-3 hover:bg-blue-600/30 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Urgent Announcement Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50 border border-amber-200 text-amber-900 px-5 py-4 rounded-2xl">
          <div className="flex items-center gap-2 font-bold shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>አስቸኳይ ማስታወቂያ፡</span>
          </div>
          <p className="text-sm text-amber-800 flex-1">
            በወረዳው የኤሌክትሪክ መስመር ማሻሻያ ምክንያት በቀጣዩ ቅዳሜና እሁድ የኃይል መቆራረጥ ስለሚኖር ነዋሪዎች ቅድመ ዝግጅት እንዲያደርጉ እናሳስባለን።
          </p>
          <Link
            href="/news/power-outage-maintenance-notice"
            className="text-xs font-bold text-amber-900 underline hover:text-amber-700 shrink-0"
          >
            ዝርዝሩን አንብብ
          </Link>
        </div>
      </section>

      {/* 3. Latest News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">የቅርብ ጊዜ መረጃዎች</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              ወቅታዊ ዜናዎች እና ኩነቶች
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
          >
            <span>ሁሉንም ዜናዎች ይመልከቱ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-blue-700/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                  </div>
                  <h3 className="line-clamp-2 text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center text-xs font-bold text-blue-700 hover:text-blue-800"
                  >
                    ሙሉውን አንብብ
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Institutional Vision, Mission & Values */}
      <VisionMissionSection />

      {/* 5. Quick Public Services */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">የህዝብ አገልግሎቶች</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              በብዛት የሚፈለጉ የወረዳ አገልግሎቶች
            </h2>
            <p className="text-sm text-slate-600">
              ቅድመ-ሁኔታዎችን ይወቁ፣ አስፈላጊ የማመልከቻ ቅጾችን በቀጥታ ያውርዱ።
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <IdCard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">የነዋሪነት መታወቂያ</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                አዲስ መታወቂያ ለማውጣት፣ ለማደስ ወይም የጠፋ ለመተካት የሚያስፈልጉ መስፈርቶች።
              </p>
              <Link href="/services" className="inline-block text-xs font-bold text-blue-700 hover:underline">
                ዝርዝር መመሪያ →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">የልደትና ጋብቻ ምዝገባ</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                የወሳኝ ኩነቶች ምዝገባ ቅጾች፣ ማረጋገጫ የምስክር ወረቀት አሰጣጥ ሂደት።
              </p>
              <Link href="/services" className="inline-block text-xs font-bold text-blue-700 hover:underline">
                ዝርዝር መመሪያ →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">ንግድ ፈቃድና እድሳት</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                የአነስተኛና መካከለኛ ንግድ ፈቃድ ምዝገባ፣ አመታዊ እድሳትና የግብር መመሪያዎች።
              </p>
              <Link href="/services" className="inline-block text-xs font-bold text-blue-700 hover:underline">
                ዝርዝር መመሪያ →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">የግንባታ ፈቃድ</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                የመኖሪያና የንግድ ቤቶች ግንባታ ፈቃድ ማመልከቻ እና የፕላን ፍተሻ ደንቦች።
              </p>
              <Link href="/services" className="inline-block text-xs font-bold text-blue-700 hover:underline">
                ዝርዝር መመሪያ →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Citizen Feedback & Grievance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-blue-700 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>የቀጥታ ግንኙነት</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              ቅሬታ፣ ጥቆማ ወይም አስተያየት አለዎት?
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              የወረዳችን አስተዳደር የአገልግሎት አሰጣጥ ክፍተቶችን ለማረም እና የመልካም አስተዳደር ችግሮችን ለመፍታት የእርስዎን ድምጽ መስማት ይፈልጋል።
            </p>
            <div className="pt-2">
              <Link
                href="/feedback"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-900 font-bold px-6 py-3.5 text-sm shadow-md hover:bg-blue-50 transition-colors"
              >
                <span>ጥቆማዎን እዚህ ይላኩ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}