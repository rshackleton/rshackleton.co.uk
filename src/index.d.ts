import { FixedObject, FluidObject } from 'gatsby-image';

/**
 * A GatsbyJS connection.
 */
interface Connection<T extends Node> {
  edges: Edge<T>[];
}

/**
 * A GatsbyJS connection edge.
 */
interface Edge<T extends Node> {
  next?: T;
  node: T;
  previous?: T;
}

/**
 * A GatsbyJS node.
 */
interface Node {
  id: string;
  parent: Node;
  children: Node[];
}

/**
 * The site config data.
 */
interface Site {
  siteMetadata: SiteMetadata;
}

/**
 * The site metadata.
 */
interface SiteMetadata {
  lang?: string;
  locale?: string;
  siteUrl?: string;
  title?: string;
  twitterUsername?: string;
}

/**
 * A Kentico Kontent item.
 */
interface KontentItem extends Node {
  system: {
    codename: string;
    id: string;
    language: string;
    lastModified: Date;
    name: string;
    type: string;
  };
}

/**
 * A Kentico Kontent asset.
 */
interface KontentAsset {
  name: string;
  description?: string;
  type: string;
  size: number;
  url: string;
  width: number;
  height: number;
  fixed: FixedObject;
  fluid: FluidObject;
}

/**
 * A Kentico Kontent rich text image.
 */
interface KontentRichTextImage {
  description?: string;
  height: number;
  imageId: string;
  url: string;
  width: number;
}

/**
 * A Kentico Kontent rich text link.
 */
interface KontentRichTextLink {
  codename: string;
  linkId: number;
  type: string;
  urlSlug: string;
}

/**
 * A Kentico Kontent taxonomy item.
 */
interface KontentTaxonomyItem {
  name: string;
  codename: string;
}

/**
 * A Kentico Kontent element.
 */
interface KontentElement {
  name: string;
  type: string;
}

/**
 * A Kentico Kontent asset element.
 */
interface KontentAssetElement extends KontentElement {
  value: KontentAsset[];
}

/**
 * A Kentico Kontent date element.
 */
interface KontentDateElement extends KontentElement {
  value: string;
}

/**
 * A Kentico Kontent rich text element.
 */
interface KontentRichTextElement extends KontentElement {
  name: string;
  type: string;
  value?: string;
  images: KontentRichTextImage[];
  links: KontentRichTextLink[];
  linked_items: KontentItem[];
  linkedItemCodenames: string[];
  resolvedData: {
    componentCodenames: string[];
    html: string;
    linkedItemCodenames: string[];
  };
}

/**
 * A Kentico Kontent taxonomy element.
 */
interface KontentTaxonomyElement extends KontentElement {
  taxonomyGroup: string;
  value: KontentTaxonomyItem[];
}

/**
 * A Kentico Kontent text element.
 */
interface KontentTextElement extends KontentElement {
  value?: string;
}

/**
 * Content page.
 */
interface Article extends KontentItem {
  elements: {
    article_tags: KontentTaxonomyElement;
    banner: KontentAssetElement;
    body: KontentRichTextElement;
    date: KontentDateElement;
    slug: KontentTextElement;
    summary: KontentTextElement;
    title: KontentTextElement;
    metadata__page_title: KontentTextElement;
    metadata__page_description: KontentTextElement;
    metadata__page_keywords: KontentTextElement;
    metadata__open_graph_image: KontentAssetElement;
  };
}

/**
 * Content page.
 */
interface ArticleListing extends KontentItem {
  elements: {
    banner: KontentAssetElement;
    title: KontentTextElement;
    metadata__page_title: KontentTextElement;
    metadata__page_description: KontentTextElement;
    metadata__page_keywords: KontentTextElement;
    metadata__open_graph_image: KontentAssetElement;
  };
}

/**
 * Code block.
 */
interface CodeBlock extends KontentItem {
  elements: {
    code: KontentTextElement;
    language: KontentTextElement;
    source_url: KontentTextElement;
  };
}

/**
 * Content page.
 */
interface ContentPage extends KontentItem {
  elements: {
    banner: KontentAssetElement;
    body: KontentRichTextElement;
    slug: KontentTextElement;
    summary: KontentTextElement;
    title: KontentTextElement;
    metadata__page_title: KontentTextElement;
    metadata__page_description: KontentTextElement;
    metadata__page_keywords: KontentTextElement;
    metadata__open_graph_image: KontentAssetElement;
  };
}

/**
 * Content page.
 */
interface ContactPage extends KontentItem {
  elements: {
    banner: KontentAssetElement;
    body: KontentRichTextElement;
    title: KontentTextElement;
    metadata__page_title: KontentTextElement;
    metadata__page_description: KontentTextElement;
    metadata__page_keywords: KontentTextElement;
    metadata__open_graph_image: KontentAssetElement;
  };
}

/**
 * Home page.
 */
interface HomePage extends KontentItem {
  elements: {
    background_image: KontentAssetElement;
    metadata__open_graph_image: KontentAssetElement;
    metadata__page_description: KontentTextElement;
    metadata__page_keywords: KontentTextElement;
    metadata__page_title: KontentTextElement;
  };
}

interface Tweet extends KontentItem {
  elements: {
    tweet_url: KontentTextElement;
  };
}
