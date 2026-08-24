const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * ከ Strapi ጋር የሚደረጉ የ-HTTP ጥያቄዎች ማዕከላዊ ፈፃሚ
 */
async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const url = `${STRAPI_URL}/api${endpoint}`;

  try {
    const res = await fetch(url, mergedOptions);
    if (!res.ok) {
      console.warn(`Strapi API response not OK [${res.status}] at: ${url}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Fetch Failed at ${url}:`, error.message);
    return null;
  }
}

/**
 * 1. ወቅታዊ ዜናዎችን መቀበያ
 */
export async function getArticles(category = null, limit = 10) {
  let endpoint = `/articles?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`;
  
  if (category && category !== 'ሁሉም') {
    endpoint += `&filters[category][$eq]=${encodeURIComponent(category)}`;
  }

  const response = await fetchAPI(endpoint, { cache: 'no-store' });
  return response?.data || [];
}

/**
 * 2. የነጠላ ዜና ዝርዝር በ Slug
 */
export async function getArticleBySlug(slug) {
  const endpoint = `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  const response = await fetchAPI(endpoint, { cache: 'no-store' });
  return response?.data?.length > 0 ? response.data[0] : null;
}

/**
 * 3. የወረዳው አገልግሎቶችን መቀበያ
 */
export async function getPublicServices() {
  const endpoint = `/public-services?populate=*&sort=createdAt:asc`;
  const response = await fetchAPI(endpoint, { cache: 'no-store' });
  return response?.data || [];
}

/**
 * 4. የሚዲያና ፎቶ ጋለሪ መቀበያ
 */
export async function getMediaGalleries(type = null) {
  let endpoint = `/media-galleries?populate=*&sort=eventDate:desc`;
  
  if (type && type !== 'all') {
    endpoint += `&filters[type][$eq]=${type}`;
  }

  const response = await fetchAPI(endpoint, { cache: 'no-store' });
  return response?.data || [];
}

/**
 * 5. የነዋሪዎች ቅሬታ ወይም ጥቆማ መላኪያ
 */
export async function submitCitizenFeedback(feedbackData) {
  const endpoint = `/citizen-feedbacks`;
  
  const response = await fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify({ data: feedbackData }),
    cache: 'no-store',
  });

  return response;
}

/**
 * 6. የጉዳይ ሁኔታ መከታተያ
 */
export async function trackFeedbackByCode(trackingCode) {
  const endpoint = `/citizen-feedbacks?filters[trackingCode][$eq]=${encodeURIComponent(trackingCode)}`;
  const response = await fetchAPI(endpoint, { cache: 'no-store' });
  return response?.data?.length > 0 ? response.data[0] : null;
}

/**
 * 7. የምስል URL Helper
 */
export function getStrapiMediaUrl(mediaObject) {
  if (!mediaObject) return '/images/placeholder.jpg';

  const url = mediaObject.data?.attributes?.url || mediaObject.attributes?.url || mediaObject.url;
  if (!url) return '/images/placeholder.jpg';

  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}