/**
 * Extracts a single ID from a URL that matches a specific resource type.
 * @param url The URL to extract the ID from.
 * @param resource The type of resource (e.g., 'people', 'planets', 'starships').
 * @returns The extracted ID as a number.
 */
export function extractIdFromUrl(url: string, resource: string): number {
  const regex = new RegExp(`/${resource}/(\\d+)/?$`);
  const match = url.match(regex);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  throw new Error(`Invalid URL format for resource "${resource}": ${url}`);
}

/**
 * Extracts IDs from a list of URLs that match a specific resource type.
 * @param urls List of URLs.
 * @param resource The type of resource (e.g., 'people', 'planets', 'starships').
 * @returns List of extracted IDs as numbers.
 */
export function extractIdsFromUrls(urls: string[], resource: string): number[] {
  return urls.map((url) => extractIdFromUrl(url, resource));
}
