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
  next: T?;
  node: T;
  previous: T?;
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
  description: string;
  type: string;
  size: Number;
  url: string;
  width: Number;
  height: Number;
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
 * A Kentico Kontent text element.
 */
interface KontentTextElement extends KontentElement {
  value: string;
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
