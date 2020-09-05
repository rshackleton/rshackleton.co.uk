import {
  IContentItem,
  DeliveryClient,
  MultipleItemQuery,
  TypeResolver,
} from '@kentico/kontent-delivery';

import { Article } from '@/models/article';
import { ArticleListing } from '@/models/article_listing';
import { CodeBlock } from '@/models/code_block';
import { ContactPage } from '@/models/contact_page';
import { ContentPage } from '@/models/content_page';
import { Homepage } from '@/models/homepage';
import { Page } from '@/models/page';
import { Tweet } from '@/models/tweet';

// prettier-ignore
type MultipleItemQueryTransformFunction<T extends IContentItem> = (query: MultipleItemQuery<T>) => MultipleItemQuery<T>;

// prettier-ignore
type ParseFunction<T extends IContentItem> = (item?: T) => any;

const client = new DeliveryClient({
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
  projectId: process.env.KONTENT_PROJECT_ID ?? '',
  typeResolvers: [
    new TypeResolver('article', () => new Article()),
    new TypeResolver('article_listing', () => new ArticleListing()),
    new TypeResolver('code_block', () => new CodeBlock()),
    new TypeResolver('contact_page', () => new ContactPage()),
    new TypeResolver('content_page', () => new ContentPage()),
    new TypeResolver('homepage', () => new Homepage()),
    new TypeResolver('page', () => new Page()),
    new TypeResolver('tweet', () => new Tweet()),
  ],
});

/**
 * Get the specified article by slug.
 * @param slug
 * @param preview
 */
export async function getArticle(slug: string, preview: boolean): Promise<any> {
  return getItemBySlug('article', slug, preview, parseArticle);
}

/**
 * Get the article listing page.
 * @param preview
 */
export async function getArticleListing(preview: boolean): Promise<any> {
  return getFirstItem('article_listing', preview, parseArticleListing);
}

/**
 * Get all articles.
 * @param preview
 */
export async function getArticles(preview: boolean): Promise<any> {
  return getItems('article', preview, parseArticle, (query) =>
    query.orderByDescending('elements.date'),
  );
}

/**
 * Get the specified content page by slug.
 * @param slug
 * @param preview
 */
export async function getContentPage(slug: string, preview: boolean): Promise<any> {
  return getItemBySlug('content_page', slug, preview, parseContentPage);
}

/**
 * Get all content pages.
 * @param preview
 */
export async function getContentPages(preview: boolean): Promise<any> {
  return getItems('content_page', preview, parseContentPage);
}

/**
 * Get the home page.
 * @param preview
 */
export async function getHomePage(preview: boolean): Promise<any> {
  return getFirstItem<Homepage>('homepage', preview, parseHome);
}

function parseArticle(item?: Article) {
  return {
    body: item?.body.resolveHtml(),
    date: item?.date.value?.toISOString(),
    image: item?.banner.value[0].url,
    slug: item?.slug.value,
    summary: item?.summary.value,
    title: item?.title.value,
  };
}

function parseArticleListing(item?: ArticleListing) {
  return {
    image: item?.banner.value[0].url,
    title: item?.title.value,
  };
}

function parseContentPage(item?: ContentPage) {
  return {
    body: item?.body.resolveHtml(),
    image: item?.banner.value[0].url,
    slug: item?.slug.value,
    summary: item?.summary.value,
    title: item?.title.value,
  };
}

function parseHome(item?: Homepage) {
  return {
    image: item?.backgroundImage.value[0].url,
    title: item?.title.value,
  };
}

async function getFirstItem<T extends IContentItem>(
  type: string,
  preview: boolean,
  parse: ParseFunction<T>,
  transformQuery?: MultipleItemQueryTransformFunction<T>,
) {
  return (
    await getItems(type, preview, parse, (query) => {
      query = query.limitParameter(1);

      if (transformQuery) {
        query = transformQuery(query);
      }

      return query;
    })
  )[0];
}

async function getItemBySlug<T extends IContentItem>(
  type: string,
  slug: string,
  preview: boolean,
  parse: ParseFunction<T>,
  transformQuery?: MultipleItemQueryTransformFunction<T>,
) {
  return (
    await getItems<T>(type, preview, parse, (query) => {
      query = query.equalsFilter('elements.slug', slug).limitParameter(1);

      if (transformQuery) {
        query = transformQuery(query);
      }

      return query;
    })
  )[0];
}

async function getItems<T extends IContentItem>(
  type: string,
  preview: boolean,
  parse: ParseFunction<T>,
  transformQuery?: MultipleItemQueryTransformFunction<T>,
) {
  let query = client
    .items<T>()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(type);

  if (transformQuery) {
    query = transformQuery(query);
  }

  const response = await query.toPromise();

  return response.items.map((item) => parse(item));
}
