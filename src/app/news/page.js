import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, AlertTriangle } from 'lucide-react';
import { getArticles, getStrapiMediaUrl } from '../../lib/api';

export const metadata = {
  title: 'ዜና እና መረጃ | የወረዳ ጽሕፈት ቤት',
  description: 'ወቅታዊ የወረዳው የልማት ዜናዎች እና ይፋዊ መረጃዎች',
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const articlesData = await getArticles();
  const strapiArticles = Array.isArray(articlesData) ? articlesData : [];

  const hasArticles = strapiArticles.length > 0;
  const featuredItem = hasArticles ? strapiArticles[0] : null;
  const featuredArticle = featuredItem?.attributes || featuredItem;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header Title */}
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            የወረዳው ዜና እና መረጃ ማዕከል
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            ወቅታዊ የወረዳው የልማት ዜናዎች፣ አስተዳደራዊ ውሳኔዎች እና ይፋዊ መረጃዎች።
          </p>
        </div>

        {/* Strapi ግንኙነት ከሌለ ወይም ዳታ ባዶ ከሆነ */}
        {!hasArticles && (
          <div className="flex items-center gap-3 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">ዜናዎችን መጫን አልተቻለም (ወይም ዳታቤዙ ባዶ ነው)</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                እባክዎ Strapi ላይ ዜና መግባቱን እና የ Public API ፍቃድ መሰጠቱን ያረጋግጡ።
              </p>
            </div>
          </div>
        )}

        {/* Featured Hero Article */}
        {featuredArticle && (
          <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px]">
              <div className="relative h-64 lg:h-auto lg:col-span-7">
                <Image
                  src={getStrapiMediaUrl(featuredArticle.coverImage)}
                  alt={featuredArticle.title || 'Featured Article'}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 space-y-4">
                <div className="inline-block w-fit rounded-md bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 uppercase tracking-wide">
                  ዋና ዜና
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  <span>{featuredArticle.author || 'ኮሚዩኒኬሽን'}</span>
                  <span>•</span>
                  <Calendar className="w-3.5 h-3.5" />
                  <time>
                    {featuredArticle.publishedAt
                      ? new Date(featuredArticle.publishedAt).toLocaleDateString('am-ET')
                      : ''}
                  </time>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white hover:text-blue-300 transition-colors">
                  <Link href={`/news/${featuredArticle.slug || '#'}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/news/${featuredArticle.slug || '#'}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors"
                  >
                    <span>ዝርዝሩን አንብብ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        {hasArticles && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strapiArticles.map((rawItem) => {
              const article = rawItem.attributes || rawItem;
              const imageUrl = getStrapiMediaUrl(article?.coverImage);

              return (
                <article
                  key={rawItem.id || article.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageUrl}
                      alt={article?.title || 'News'}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-blue-700/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {article?.category || 'አጠቃላይ'}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{article?.author || 'ኮሚዩኒኬሽን'}</span>
                        <span>•</span>
                        <time>
                          {article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString('am-ET') : ''}
                        </time>
                      </div>
                      <h3 className="line-clamp-2 text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        <Link href={`/news/${article?.slug || '#'}`}>
                          {article?.title}
                        </Link>
                      </h3>
                      <p className="line-clamp-2 text-xs sm:text-sm text-slate-600">
                        {article?.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        href={`/news/${article?.slug || '#'}`}
                        className="inline-flex items-center text-xs font-bold text-blue-700 hover:text-blue-800"
                      >
                        <span>ሙሉውን አንብብ</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}