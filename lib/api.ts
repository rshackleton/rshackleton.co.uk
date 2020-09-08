import {
  IContentItem,
  IContentItemsContainer,
  ItemResponses,
  DeliveryClient,
  MultipleItemQuery,
  TypeResolver,
  Elements,
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
export async function getArticle(
  slug: string,
  preview: boolean,
): Promise<ItemResponses.ListContentItemsResponse<Article>> {
  return getItemBySlug<Article>('article', slug, preview);
}

/**
 * Get the article listing page.
 * @param preview
 */
export async function getArticleListing(
  preview: boolean,
): Promise<ItemResponses.ListContentItemsResponse<ArticleListing>> {
  return getFirstItem<ArticleListing>('article_listing', preview);
}

/**
 * Get all articles.
 * @param preview
 */
export async function getArticles(
  preview: boolean,
): Promise<ItemResponses.ListContentItemsResponse<Article>> {
  return getItems<Article>('article', preview, (query) => query.orderByDescending('elements.date'));
}

/**
 * Get the specified content page by slug.
 * @param slug
 * @param preview
 */
export async function getContentPage(
  slug: string,
  preview: boolean,
): Promise<ItemResponses.ListContentItemsResponse<ContentPage>> {
  return getItemBySlug<ContentPage>('content_page', slug, preview);
}

/**
 * Get all content pages.
 * @param preview
 */
export async function getContentPages(
  preview: boolean,
): Promise<ItemResponses.ListContentItemsResponse<ContentPage>> {
  return getItems<ContentPage>('content_page', preview);
}

/**
 * Get the home page.
 * @param preview
 */
export async function getHomePage(
  preview: boolean,
): Promise<ItemResponses.ListContentItemsResponse<Homepage>> {
  return getFirstItem<Homepage>('homepage', preview);
}

export function parseItem<TItem extends IContentItem>(item?: TItem): ContentViewModel | null {
  if (item instanceof Article) {
    return parseArticle(item);
  }

  if (item instanceof ArticleListing) {
    return parseArticleListing(item);
  }

  if (item instanceof CodeBlock) {
    return parseCodeBlock(item);
  }

  if (item instanceof ContactPage) {
    return parseContactPage(item);
  }

  if (item instanceof ContentPage) {
    return parseContentPage(item);
  }

  if (item instanceof Homepage) {
    return parseHomepage(item);
  }

  if (item instanceof Page) {
    return parsePage(item);
  }

  if (item instanceof Tweet) {
    return parseTweet(item);
  }

  return null;
}

export function parseArticle(
  item?: Article,
  linkedItems?: IContentItemsContainer<IContentItem>,
): ArticleViewModel | null {
  if (!item) {
    return null;
  }

  return {
    seo: {
      canonicalUrl: `/articles/${item.slug.value}`,
      description: item.metadataPageDescription.value,
      image: item.metadataOpenGraphImage.value[0]?.url ?? '',
      keywords: item.metadataPageKeywords.value,
      title: item.metadataPageTitle.value,
      type: 'article',
    },
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
    body: parseRichText(item.body, linkedItems),
    date: item.date.value?.toISOString() ?? '',
    image: item.banner.value[0].url,
    slug: item.slug.value,
    summary: item.summary.value,
    title: item.title.value,
  };
}

export function parseArticleListing(item?: ArticleListing): ArticleListingViewModel | null {
  if (!item) {
    return null;
  }

  return {
    seo: {
      canonicalUrl: `/articles`,
      description: item.metadataPageDescription.value,
      image: item.metadataOpenGraphImage.value[0]?.url ?? '',
      keywords: item.metadataPageKeywords.value,
      title: item.metadataPageTitle.value,
      type: 'website',
    },
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
    image: item.banner.value[0].url,
    title: item.title.value,
  };
}

export function parseCodeBlock(item?: CodeBlock): CodeBlockViewModel | null {
  if (!item) {
    return null;
  }

  return {
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
    code: item.code.value,
    language: item.language.value,
    sourceUrl: item.sourceUrl.value,
  };
}

export function parseContactPage(item?: ContactPage): ContentViewModel | null {
  if (!item) {
    return null;
  }

  return {
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
  };
}

export function parseContentPage(
  item?: ContentPage,
  linkedItems?: IContentItemsContainer<IContentItem>,
): ContentPageViewModel | null {
  if (!item) {
    return null;
  }

  return {
    seo: {
      canonicalUrl: `/${item.slug.value}`,
      description: item.metadataPageDescription.value,
      image: item.metadataOpenGraphImage.value[0]?.url ?? '',
      keywords: item.metadataPageKeywords.value,
      title: item.metadataPageTitle.value,
      type: 'website',
    },
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
    body: parseRichText(item.body, linkedItems),
    image: item.banner.value[0].url,
    slug: item.slug.value,
    summary: item.summary.value,
    title: item.title.value,
  };
}

export function parseHomepage(item?: Homepage): HomepageViewModel | null {
  if (!item) {
    return null;
  }

  return {
    seo: {
      canonicalUrl: `/`,
      description: item.metadataPageDescription.value,
      image: item.metadataOpenGraphImage.value[0]?.url ?? '',
      keywords: item.metadataPageKeywords.value,
      title: item.metadataPageTitle.value,
      type: 'website',
    },
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
    image: item.backgroundImage.value[0].url,
    title: item.title.value,
  };
}

export function parsePage(item?: Page): ContentViewModel | null {
  if (!item) {
    return null;
  }

  return {
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
  };
}

export function parseTweet(item?: Tweet): TweetViewModel | null {
  if (!item) {
    return null;
  }

  return {
    codename: item.system.codename ?? '',
    id: item.system.id ?? '',
    type: item.system.type ?? '',
    tweetUrl: item.tweetUrl.value,
  };
}

export function parseRichText(
  element?: Elements.RichTextElement,
  linkedItems?: IContentItemsContainer<IContentItem>,
): RichTextViewModel | null {
  if (!element) {
    return null;
  }

  const linkedItemViewModels: ContentViewModel[] = [];

  element.linkedItemCodenames.forEach((codename) => {
    const model = parseItem(linkedItems?.[codename]);

    if (model) {
      linkedItemViewModels.push(model);
    }
  });

  return {
    html: element.resolveHtml(),
    images: element.images.map(
      (img): RichTextImageViewModel => ({
        description: img.description,
        height: img.height,
        imageId: img.imageId,
        url: img.url,
        width: img.width,
      }),
    ),
    links: element.links.map(
      (link): RichTextLinkViewModel => ({
        codename: link.codename,
        linkId: link.linkId,
        type: link.type,
        urlSlug: link.urlSlug,
      }),
    ),
    linkedItems: linkedItemViewModels,
  };
}

async function getFirstItem<T extends IContentItem>(
  type: string,
  preview: boolean,
  transformQuery?: MultipleItemQueryTransformFunction<T>,
): Promise<ItemResponses.ListContentItemsResponse<T>> {
  return await getItems(type, preview, (query) => {
    query = query.limitParameter(1);

    if (transformQuery) {
      query = transformQuery(query);
    }

    return query;
  });
}

async function getItemBySlug<T extends IContentItem>(
  type: string,
  slug: string,
  preview: boolean,
  transformQuery?: MultipleItemQueryTransformFunction<T>,
): Promise<ItemResponses.ListContentItemsResponse<T>> {
  return await getItems<T>(type, preview, (query) => {
    query = query.equalsFilter('elements.slug', slug).limitParameter(1);

    if (transformQuery) {
      query = transformQuery(query);
    }

    return query;
  });
}

async function getItems<T extends IContentItem>(
  type: string,
  preview: boolean,
  transformQuery?: MultipleItemQueryTransformFunction<T>,
): Promise<ItemResponses.ListContentItemsResponse<T>> {
  let query = client
    .items<T>()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(type);

  if (transformQuery) {
    query = transformQuery(query);
  }

  return query.toPromise();
}
