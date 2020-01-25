import { FixedObject, FluidObject } from 'gatsby-image';
import { TransitionStatus } from 'react-transition-group/Transition';

interface ITransitionProps {
  state: TransitionStatus;
}

/**
 * A GatsbyJS connection.
 */
interface IConnection<T extends INode> {
  edges: IEdge<T>[];
}

/**
 * A GatsbyJS connection edge.
 */
interface IEdge<T extends INode> {
  next?: T;
  node: T;
  previous?: T;
}

/**
 * A GatsbyJS node.
 */
interface INode {
  id: string;
  parent: INode;
  children: INode[];
}

/**
 * The site config data.
 */
interface ISite {
  siteMetadata: ISiteMetadata;
}

/**
 * The site metadata.
 */
interface ISiteMetadata {
  lang?: string;
  locale?: string;
  siteUrl?: string;
  title?: string;
  twitterUsername?: string;
}

/**
 * A Kentico Kontent item.
 */
interface IKontentItem extends INode {
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
interface IKontentAsset {
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
interface IKontentRichTextImage {
  description?: string;
  height: number;
  imageId: string;
  url: string;
  width: number;
  fixed: FluidObject;
  fluid: FluidObject;
}

/**
 * A Kentico Kontent rich text link.
 */
interface IKontentRichTextLink {
  codename: string;
  linkId: number;
  type: string;
  urlSlug: string;
}

/**
 * A Kentico Kontent taxonomy item.
 */
interface IKontentTaxonomyItem {
  name: string;
  codename: string;
}

/**
 * A Kentico Kontent element.
 */
interface IKontentElement {
  name: string;
  type: string;
}

/**
 * A Kentico Kontent asset element.
 */
interface IKontentAssetElement extends IKontentElement {
  value: IKontentAsset[];
}

/**
 * A Kentico Kontent date element.
 */
interface IKontentDateElement extends IKontentElement {
  value: string;
}

/**
 * A Kentico Kontent rich text element.
 */
interface IKontentRichTextElement extends IKontentElement {
  name: string;
  type: string;
  value?: string;
  images: IKontentRichTextImage[];
  links: IKontentRichTextLink[];
  linked_items: IKontentItem[];
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
interface IKontentTaxonomyElement extends IKontentElement {
  taxonomyGroup: string;
  value: IKontentTaxonomyItem[];
}

/**
 * A Kentico Kontent text element.
 */
interface IKontentTextElement extends IKontentElement {
  value?: string;
}

/**
 * Content page.
 */
interface IArticle extends IKontentItem {
  elements: {
    article_tags: IKontentTaxonomyElement;
    banner: IKontentAssetElement;
    body: IKontentRichTextElement;
    date: IKontentDateElement;
    slug: IKontentTextElement;
    summary: IKontentTextElement;
    title: IKontentTextElement;
    metadata__page_title: IKontentTextElement;
    metadata__page_description: IKontentTextElement;
    metadata__page_keywords: IKontentTextElement;
    metadata__open_graph_image: IKontentAssetElement;
  };
}

/**
 * Content page.
 */
interface IArticleListing extends IKontentItem {
  elements: {
    banner: IKontentAssetElement;
    title: IKontentTextElement;
    metadata__page_title: IKontentTextElement;
    metadata__page_description: IKontentTextElement;
    metadata__page_keywords: IKontentTextElement;
    metadata__open_graph_image: IKontentAssetElement;
  };
}

/**
 * Code block.
 */
interface ICodeBlock extends IKontentItem {
  elements: {
    code: IKontentTextElement;
    language: IKontentTextElement;
    source_url: IKontentTextElement;
  };
}

/**
 * Content page.
 */
interface IContentPage extends IKontentItem {
  elements: {
    banner: IKontentAssetElement;
    body: IKontentRichTextElement;
    slug: IKontentTextElement;
    summary: IKontentTextElement;
    title: IKontentTextElement;
    metadata__page_title: IKontentTextElement;
    metadata__page_description: IKontentTextElement;
    metadata__page_keywords: IKontentTextElement;
    metadata__open_graph_image: IKontentAssetElement;
  };
}

/**
 * Content page.
 */
interface IContactPage extends IKontentItem {
  elements: {
    banner: IKontentAssetElement;
    body: IKontentRichTextElement;
    title: IKontentTextElement;
    metadata__page_title: IKontentTextElement;
    metadata__page_description: IKontentTextElement;
    metadata__page_keywords: IKontentTextElement;
    metadata__open_graph_image: IKontentAssetElement;
  };
}

/**
 * Home page.
 */
interface IHomePage extends IKontentItem {
  elements: {
    background_image: IKontentAssetElement;
    metadata__open_graph_image: IKontentAssetElement;
    metadata__page_description: IKontentTextElement;
    metadata__page_keywords: IKontentTextElement;
    metadata__page_title: IKontentTextElement;
  };
}

interface ITweet extends IKontentItem {
  elements: {
    tweet_url: IKontentTextElement;
  };
}
