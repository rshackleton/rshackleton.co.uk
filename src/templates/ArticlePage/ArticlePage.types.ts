import { Schema } from 'schema';

export interface IArticlePageProps {
  data: {
    kontentItemArticle: Schema.IArticle;
    site: Schema.ISite;
  };
}
