import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiMediaUrl(mediaUrl) {
  if (!mediaUrl || mediaUrl === '/images/placeholder.jpg') {
    return '/images/news-1.jpg';
  }
  if (typeof mediaUrl === 'string' && mediaUrl.includes('unsplash.com/photos/')) {
    return '/images/news-1.jpg';
  }
  return mediaUrl;
}