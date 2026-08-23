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
      throw new Error(`Strapi Fetch Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Fetch Failed at ${url}:`, error);
    return null;
  }
}

/**
 * 1. ወቅታዊ ዜናዎችን ከ Strapi መቀበያ (News List)
 */
export async function getArticles(category = null, limit = 10) {
  let endpoint = `/articles?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`;
  
  if (category && category !== 'ሁሉም') {
    endpoint += `&filters[category][$eq]=${encodeURIComponent(category)}`;
  }

  const response = await fetchAPI(endpoint, {
    next: { revalidate: 60 }, // ISR Caching በየ 60 ሰከንዱ ያድሳል
  });

  return response ? response.data : [];
}

/**
 * 2. የነጠላ ዜና ዝርዝር በ Slug መፈለጊያ (Single Article)
 */
export async function getArticleBySlug(slug) {
  const endpoint = `/articles?filters[slug][$eq]=${slug}&populate=*`;
  const response = await fetchAPI(endpoint, {
    next: { revalidate: 60 },
  });

  return response && response.data?.length > 0 ? response.data[0] : null;
}

/**
 * 3. የወረዳው አገልግሎቶችን መቀበያ (Public Services)
 */
export async function getPublicServices() {
  const endpoint = `/public-services?populate=*&sort=createdAt:asc`;
  const response = await fetchAPI(endpoint, {
    next: { revalidate: 3600 }, // አገልግሎቶች ቶሎ ስለማይቀያየሩ በ1 ሰዓት አንዴ ያድሳል
  });

  return response ? response.data : [];
}

/**
 * 4. የሚዲያና ፎቶ ጋለሪ መቀበያ (Media Gallery)
 */
export async function getMediaGalleries(type = null) {
  let endpoint = `/media-galleries?populate=*&sort=eventDate:desc`;
  
  if (type && type !== 'all') {
    endpoint += `&filters[type][$eq]=${type}`;
  }

  const response = await fetchAPI(endpoint, {
    next: { revalidate: 120 },
  });

  return response ? response.data : [];
}

/**
 * 5. የነዋሪዎች ቅሬታ ወይም ጥቆማ ወደ Strapi መላኪያ (Submit Feedback)
 */
export async function submitCitizenFeedback(feedbackData) {
  const endpoint = `/citizen-feedbacks`;
  
  const response = await fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      data: feedbackData,
    }),
    cache: 'no-store', // ዳታው ቀጥታ ዳታቤዝ እንዲገባ Caching ይከለከላል
  });

  return response;
}

/**
 * 6. የጉዳይ ሁኔታ በመከታተያ ኮድ መፈለጊያ (Track Feedback by Code)
 */
export async function trackFeedbackByCode(trackingCode) {
  const endpoint = `/citizen-feedbacks?filters[trackingCode][$eq]=${encodeURIComponent(trackingCode)}`;
  
  const response = await fetchAPI(endpoint, {
    cache: 'no-store',
  });

  return response && response.data?.length > 0 ? response.data[0] : null;
}

/**
 * 7. የምስሎች ትክክለኛ ሙሉ ዩአርኤል (Image URL Helper)
 */
export function getStrapiMediaUrl(mediaObject) {
  if (!mediaObject) return '/images/placeholder.jpg';
  
  const url = mediaObject.data?.attributes?.url || mediaObject.url;
  if (!url) return '/images/placeholder.jpg';

  if (url.startsWith('http')) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}