import { ContentItem } from 'kentico-cloud-delivery';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ArticlePreview from '../src/components/kc/ArticlePreview';

class Article extends ContentItem {
  constructor() {
    super({
      richTextResolver: item => {
        const el = createElement(ArticlePreview, {
          title: item.title.value,
          slug: item.slug.value,
          summary: item.summary.value,
        });

        return renderToStaticMarkup(el);
      },
    });
  }
}

export default Article;
