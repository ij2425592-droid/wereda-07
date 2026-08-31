import { getArticles } from '../../lib/api';
import { mockArticles } from '../../data/mockNews';
import NewsListClient from '../../components/news/NewsListClient';

export const metadata = {
  title: 'ዜና እና መረጃ | Sub-City News & Updates',
  description: 'ወቅታዊ የወረዳው የልማት ዜናዎች እና ይፋዊ መረጃዎች',
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const articlesData = await getArticles();
  const strapiArticles = Array.isArray(articlesData) ? articlesData : [];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsListClient
          strapiArticles={strapiArticles}
          fallbackArticles={mockArticles}
        />
      </div>
    </div>
  );
}