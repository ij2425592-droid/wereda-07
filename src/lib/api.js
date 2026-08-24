/**
 * Strapi Base URL ማስተካከያ
 */
export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${path}`;
}

/**
 * ዋና የ Strapi API መጠሪያ ፈንክሽን (Fetch API)
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(process.env.STRAPI_API_TOKEN && {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }),
    };

    const mergedOptions = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    // Query parameters ማዘጋጀት
    const queryParams = new URLSearchParams();
    if (urlParamsObject && Object.keys(urlParamsObject).length > 0) {
      Object.entries(urlParamsObject).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
    }

    const queryString = queryParams.toString();
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const res = await fetch(requestUrl, mergedOptions);

    if (!res.ok) {
      console.warn(`Strapi Fetch Warning [${res.status}]: ${res.statusText} at ${requestUrl}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Fetch Error at ${path}:`, error);
    return null;
  }
}

/**
 * 1. ወቅታዊ ዜናዎችን ከ Strapi መቀበያ (News List)
 */
export async function getArticles(category = null, limit = 10) {
  const params = {
    'populate': '*',
    'sort': 'publishedAt:desc',
    'pagination[limit]': limit.toString(),
  };

  if (category && category !== 'all') {
    params['filters[category][$eq]'] = category;
  }

  const response = await fetchAPI('/articles', params, { cache: 'no-store' });
  return response?.data || [];
}

/**
 * 2. ነጠላ ዜናን በ Slug መፈለጊያ (Single Article)
 */
export async function getArticleBySlug(slug) {
  const params = {
    'filters[slug][$eq]': slug,
    'populate': '*',
  };

  const response = await fetchAPI('/articles', params, { next: { revalidate: 60 } });
  
  if (response?.data && response.data.length > 0) {
    return response.data[0];
  }
  return null;
}

/**
 * 3. የሚዲያ ማህደር መረጃዎች መቀበያ (Media Gallery)
 */
export async function getMediaGallery(type = null) {
  const params = {
    'populate': '*',
    'sort': 'createdAt:desc',
  };

  if (type && type !== 'all') {
    params['filters[mediaType][$eq]'] = type;
  }

  const response = await fetchAPI('/media-galleries', params, { next: { revalidate: 60 } });
  return response?.data || [];
}

/**
 * 4. የ Strapi ምስሎችን ሙሉ URL መስጫ
 */
export function getStrapiMediaUrl(media) {
  if (!media) {
    return '/images/placeholder.jpg';
  }

  // Cloudinary ወይም Strapi Image URL አወሳሰድ
  const url = media.data?.attributes?.url || media.attributes?.url || media.url;
  
  if (!url) {
    return '/images/placeholder.jpg';
  }

  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  return `${getStrapiURL()}${url}`;
}