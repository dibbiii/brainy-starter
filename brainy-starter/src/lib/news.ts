import { getCollection } from 'astro:content';
export const PER_PAGE = 12;
export async function publishedNews() {
  return (await getCollection('news', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
