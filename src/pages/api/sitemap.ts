import orderBy from 'lodash/orderBy';
import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';

import {
  getArticleListing,
  getArticles,
  getContentPages,
  getHomePage,
  parseArticle,
  parseArticleListing,
  parseContentPage,
  parseHomepage,
} from '@/lib/api';

type SitemapItem = {
  lastmod: Date;
  url: string;
};

export default async (_: NextApiRequest, res: NextApiResponse) => {
  let items: SitemapItem[] = [];

  await addArticleListing(items);
  await addArticles(items);
  await addContentPages(items);
  await addHomePage(items);

  const smStream = new SitemapStream({
    hostname: `https://${process.env.NEXT_PUBLIC_HOST}`,
    lastmodDateOnly: true,
  });

  items = orderBy(items, ['url']);

  items.forEach((item) => {
    smStream.write({
      lastmod: item.lastmod,
      url: item.url,
    });
  });

  smStream.end();

  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

  // Serve from cache, revalidate every day.
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

async function addArticleListing(items: SitemapItem[]): Promise<void> {
  const response = await getArticleListing(false);

  response.items.forEach((item) => {
    const model = parseArticleListing(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    items.push({
      lastmod: item.system.lastModified,
      url,
    });
  });
}

async function addArticles(items: SitemapItem[]): Promise<void> {
  const response = await getArticles(false);

  response.items.forEach((item) => {
    const model = parseArticle(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    items.push({
      lastmod: item.system.lastModified,
      url,
    });
  });
}

async function addContentPages(items: SitemapItem[]): Promise<void> {
  const response = await getContentPages(false);

  response.items.forEach((item) => {
    const model = parseContentPage(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    items.push({
      lastmod: item.system.lastModified,
      url,
    });
  });
}

async function addHomePage(items: SitemapItem[]): Promise<void> {
  const response = await getHomePage(false);

  response.items.forEach((item) => {
    const model = parseHomepage(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    items.push({
      lastmod: item.system.lastModified,
      url,
    });
  });
}
