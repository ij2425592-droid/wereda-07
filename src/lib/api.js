import { prisma } from './prisma';

export async function getArticles(category = null, limit = 10) {
  try {
    const where = { published: true };
    if (category && category !== 'ሁሉም' && category !== 'all') {
      where.category = category;
    }

    return await prisma.article.findMany({
      where,
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });
  } catch (error) {
    console.error('Error querying articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug) {
  try {
    return await prisma.article.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error(`Error querying article by slug (${slug}):`, error);
    return null;
  }
}

export async function getMediaGalleries(type = null) {
  try {
    const where = {};
    if (type && type !== 'all') {
      where.mediaType = type;
    }

    return await prisma.mediaGallery.findMany({
      where,
      orderBy: { eventDate: 'desc' },
    });
  } catch (error) {
    console.error('Error querying media galleries:', error);
    return [];
  }
}

export async function submitCitizenFeedback(data) {
  try {
    return await prisma.citizenFeedback.create({
      data: {
        ...data,
        trackingCode: `WRD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      },
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return null;
  }
}

export function getStrapiMediaUrl(mediaUrl) {
  if (!mediaUrl) return '/images/placeholder.jpg';
  return mediaUrl;
}