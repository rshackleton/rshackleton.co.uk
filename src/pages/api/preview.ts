import { NextApiRequest, NextApiResponse } from 'next';

import { getArticle, getArticleListing, getContentPage, getHomePage } from '@/lib/api';

export default async function preview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.query.secret !== process.env.KONTENT_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  if (!req.query.type || typeof req.query.type !== 'string') {
    return res.status(401).json({ message: 'No type parameter.' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const type = req.query.type;

  switch (type) {
    case 'article': {
      const slug = typeof req.query.slug === 'string' ? req.query.slug : req.query.slug[0];
      const itemResponse = await getArticle(slug, true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      return enablePreviewAndRedirectTo(`/articles/${itemResponse.firstItem.slug.value}`);
    }

    case 'article_listing': {
      const itemResponse = await getArticleListing(true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      return enablePreviewAndRedirectTo(`/articles`);
    }

    case 'content_page': {
      const slug = typeof req.query.slug === 'string' ? req.query.slug : req.query.slug[0];
      const itemResponse = await getContentPage(slug, true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      return enablePreviewAndRedirectTo(`/${itemResponse.firstItem.slug.value}`);
    }

    case 'homepage': {
      const itemResponse = await getHomePage(true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      return enablePreviewAndRedirectTo(`/`);
    }

    // If a content item doesn't exist prevent preview mode from being enabled
    default: {
      return res.status(401).json({ message: 'Invalid type' });
    }
  }

  function enablePreviewAndRedirectTo(url: string) {
    res.setPreviewData({});
    res.writeHead(307, { Location: `${url}?kontent-smart-link-enabled` });
    res.end();
  }
}
