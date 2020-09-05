import { DeliveryClient, ContentItem } from '@kentico/kontent-delivery';

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID ?? '',
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
});

function parseHome(item: ContentItem) {
  return {
    title: item.title.value,
    image: item.background_image.value[0].url,
  };
}

export async function getHomePage(preview: boolean) {
  return await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type('homepage')
    .limitParameter(1)
    .toPromise()
    .then((response) => response.items.map((item) => parseHome(item)))
    .then((items) => items[0]);
}
