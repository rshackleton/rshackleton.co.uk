import { TypeResolver } from 'kentico-cloud-delivery';

import Article from './Article';
import ContentPage from './ContentPage';

export const typeResolvers = [
  new TypeResolver('article', () => new Article()),
  new TypeResolver('content_page', () => new ContentPage()),
];
