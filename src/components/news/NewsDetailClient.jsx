'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getStrapiMediaUrl } from '@/lib/utils';

export default function NewsDetailClient({ article, relatedArticles = [] }) {
  const { t, language } = useLanguage();
  const n = t.news;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const locale = language === 'am' ? 'am-ET' : language === 'or' ? 'om-ET' : 'en-US';
      return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formattedDate = formatDate(article.publishedAt);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{n.backToNews}</span>
        </Link>
      </div>

      {/* Header Details */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
            {article.category || 'News'}
          </span>
          {formattedDate && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <time>{formattedDate}</time>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 border-y border-slate-200 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold text-white shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{article.author || n.authorDefault}</p>
            <p className="text-xs text-slate-500">{t.nav.portalSubtitle}</p>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-md bg-slate-100">
        <Image
          src={article.coverImage ? getStrapiMediaUrl(article.coverImage) : '/images/news-1.jpg'}
          alt={article.title || 'News Cover'}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </div>

      {/* Article Body */}
      <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        {article.excerpt && (
          <p className="font-semibold text-slate-900 text-base sm:text-lg leading-relaxed border-b border-slate-100 pb-4">
            {article.excerpt}
          </p>
        )}

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line text-justify">
          {article.content || article.excerpt}
        </div>

        {/* Social Share Strip */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Share2 className="w-4 h-4 text-blue-700" />
            <span>{n.shareText}:</span>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://t.me/share/url?url=https://woreda.gov.et/news/${article.slug}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://woreda.gov.et/news/${article.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Related News */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-black text-slate-900">{t.nav.news}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id || rel.slug}
                href={`/news/${rel.slug}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-colors flex gap-4 items-center"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={rel.coverImage ? getStrapiMediaUrl(rel.coverImage) : '/images/news-1.jpg'}
                    alt={rel.title || 'Related article'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-700">{rel.category}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 mt-0.5">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
