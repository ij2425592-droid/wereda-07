import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/api';
import { mockArticles } from '@/data/mockNews';
import NewsDetailClient from '@/components/news/NewsDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let article = await getArticleBySlug(slug);
  if (!article) {
    article = mockArticles.find((a) => a.slug === slug);
  }

  if (!article) {
    return { title: 'News Article Not Found' };
  }

  return {
    title: `${article.title} | Sub-City Media`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  let article = await getArticleBySlug(slug);
  if (!article) {
    article = mockArticles.find((a) => a.slug === slug);
  }

  if (!article) {
    notFound();
  }

  // Related Articles
  const allStrapi = await getArticles();
  const allArticles = (Array.isArray(allStrapi) && allStrapi.length > 0) ? allStrapi : mockArticles;
  const relatedArticles = allArticles.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <NewsDetailClient
        article={article}
        relatedArticles={relatedArticles}
      />
    </div>
  );
}
