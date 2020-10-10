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

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const smStream = new SitemapStream({
    hostname: `https://${process.env.NEXT_PUBLIC_HOST}`,
    lastmodDateOnly: true,
  });

  await addArticleListing(smStream);
  await addArticles(smStream);
  await addContentPages(smStream);
  await addHomePage(smStream);

  smStream.end();

  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

  // Serve from cache, revalidate every day.
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

async function addArticles(sitemap: SitemapStream): Promise<void> {
  const response = await getArticles(false);

  response.items.forEach((item) => {
    const model = parseArticle(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    sitemap.write({
      lastmod: item.system.lastModified,
      url,
    });
  });
}

async function addArticleListing(sitemap: SitemapStream): Promise<void> {
  const response = await getArticleListing(false);

  response.items.forEach((item) => {
    const model = parseArticleListing(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    sitemap.write({
      lastmod: item.system.lastModified,
      url,
    });
  });
}

async function addContentPages(sitemap: SitemapStream): Promise<void> {
  const response = await getContentPages(false);

  response.items.forEach((item) => {
    const model = parseContentPage(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    sitemap.write({
      lastmod: item.system.lastModified,
      url,
    });
  });
}

async function addHomePage(sitemap: SitemapStream): Promise<void> {
  const response = await getHomePage(false);

  response.items.forEach((item) => {
    const model = parseHomepage(item);
    const url = model?.seo.canonicalUrl;

    if (!url) {
      return;
    }

    sitemap.write({
      lastmod: item.system.lastModified,
      url,
    });
  });
}
