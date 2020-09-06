import { NextApiRequest, NextApiResponse } from 'next';

import { getArticle, getArticleListing, getContentPage, getHomePage } from '@/lib/api';

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.KONTENT_PREVIEW_SECRET) {
    return res
      .status(401)
      .json({ message: 'Invalid token or slug or type parameter not specified' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const slug = typeof req.query.slug === 'string' ? req.query.slug : req.query.slug[0];
  const type = typeof req.query.type === 'string' ? req.query.type : req.query.type[0];

  switch (type) {
    case 'article': {
      const itemResponse = await getArticle(slug, true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      enablePreviewAndRedirectTo(`/articles/${itemResponse.firstItem.slug.value}`);
      break;
    }

    case 'article_listing': {
      const itemResponse = await getArticleListing(true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      enablePreviewAndRedirectTo(`/articles/${itemResponse.firstItem.slug.value}`);
      break;
    }

    case 'content_page': {
      const itemResponse = await getContentPage(slug, true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      enablePreviewAndRedirectTo(`/articles/${itemResponse.firstItem.slug.value}`);
      break;
    }

    case 'homepage': {
      const itemResponse = await getHomePage(true);

      if (!itemResponse.firstItem) {
        return res.status(401).json({ message: 'Item not found' });
      }

      enablePreviewAndRedirectTo(`/articles/${itemResponse.firstItem.slug.value}`);
      break;
    }

    // If a content item doesn't exist prevent preview mode from being enabled
    default: {
      return res.status(401).json({ message: 'Invalid type' });
    }
  }

  function enablePreviewAndRedirectTo(url: string) {
    res.setPreviewData({});
    res.writeHead(307, { Location: url });
    res.end();
  }
}
