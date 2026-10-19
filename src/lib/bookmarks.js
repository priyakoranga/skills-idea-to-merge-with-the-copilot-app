const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SLUG_PATTERN = /^mona-[0-9a-zA-Z]{1,12}$/;

export function normalizeUrl(input) {
  const value = input.trim();
  if (!value) throw new Error('Enter a URL to save.');

  let candidate;
  if (/^https?:\/\//i.test(value)) {
    candidate = value;
  } else {
    if (/^[a-z][a-z\d+.-]*:/i.test(value) && !/^[^/:\s]+:\d+(?:[/?#]|$)/.test(value)) {
      throw new Error('Use a web address with http:// or https://.');
    }
    candidate = `https://${value.replace(/^\/\//, '')}`;
  }

  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error('Enter a valid web address.');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Use a web address with http:// or https://.');
  }
  return url.href;
}

export function loadBookmarks(serialized) {
  if (typeof serialized !== 'string' || serialized.length === 0) return [];

  try {
    const parsed = JSON.parse(serialized);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      if (
        !item ||
        typeof item !== 'object' ||
        typeof item.url !== 'string' ||
        typeof item.slug !== 'string' ||
        !SLUG_PATTERN.test(item.slug)
      ) return [];

      try {
        const url = normalizeUrl(item.url);
        return [{ url, slug: item.slug }];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
}

export function formatBookmark(bookmark) {
  return `${bookmark.url} :: ${bookmark.slug}`;
}

export function generateSlug(random = Math.random) {
  let suffix = '';
  for (let index = 0; index < 4; index += 1) {
    suffix += BASE62[Math.floor(random() * BASE62.length)];
  }
  return `mona-${suffix}`;
}
