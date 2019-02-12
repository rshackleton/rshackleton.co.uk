import { ContentItem } from 'kentico-cloud-delivery';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ContentPagePreview from '../src/components/kc/ContentPagePreview';

class ContentPage extends ContentItem {
  constructor() {
    super({
      richTextResolver: item => {
        const el = createElement(ContentPagePreview, {
          title: item.title.value,
        });

        return renderToStaticMarkup(el);
      },
    });
  }
}

export default ContentPage;
