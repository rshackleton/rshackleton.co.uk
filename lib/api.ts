import { DeliveryClient, ContentItem } from '@kentico/kontent-delivery';

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID ?? '',
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
});

function parseArticle(item: ContentItem) {
  return {
    title: item.title.value,
    slug: item.slug.value,
    date: item.date.value.toISOString(),
    summary: item.summary.value,
    body: item.body.value,
    image: item.banner.value[0].url,
  };
}

function parseArticleListing(item: ContentItem) {
  return {
    title: item.title.value,
    image: item.banner.value[0].url,
  };
}

function parseContentPage(item: ContentItem) {
  return {
    title: item.title.value,
    slug: item.slug.value,
    summary: item.summary.value,
    body: item.body.value,
    image: item.banner.value[0].url,
  };
}

function parseHome(item: ContentItem) {
  return {
    title: item.title.value,
    image: item.background_image.value[0].url,
  };
}

async function getItemBySlug(
  type: string,
  slug: string,
  preview: boolean,
  parse: (item: ContentItem) => Object,
) {
  const response = await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(type)
    .equalsFilter('elements.slug', slug)
    .limitParameter(1)
    .toPromise();

  return parse(response.items[0]);
}

async function getFirstItem(type: string, preview: boolean, parse: (item: ContentItem) => Object) {
  const response = await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(type)
    .limitParameter(1)
    .toPromise();

  return parse(response.items[0]);
}

async function getItems(type: string, preview: boolean, parse: (item: ContentItem) => Object) {
  const response = await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(type)
    .toPromise();
  return response.items.map(parse);
}

export async function getArticle(slug: string, preview: boolean): Promise<any> {
  return getItemBySlug('article', slug, preview, parseArticle);
}

export async function getArticleListing(preview: boolean): Promise<any> {
  return getFirstItem('article_listing', preview, parseArticleListing);
}

export async function getArticles(preview: boolean): Promise<any> {
  return getItems('article', preview, parseArticle);
}

export async function getContentPage(slug: string, preview: boolean): Promise<any> {
  return getItemBySlug('content_page', slug, preview, parseContentPage);
}

export async function getContentPages(preview: boolean): Promise<any> {
  return getItems('content_page', preview, parseContentPage);
}

export async function getHomePage(preview: boolean): Promise<any> {
  return getFirstItem('homepage', preview, parseHome);
}
