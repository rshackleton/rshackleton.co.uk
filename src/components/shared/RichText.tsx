/* @jsx jsx */
import { jsx } from '@emotion/core';
import parseHTML, { DomElement } from 'html-react-parser';
import get from 'lodash/get';
import { FC, Fragment } from 'react';

import InlineAsset from '@components/shared/InlineAsset';
import InlineLink from '@components/shared/InlineLink';
import LinkedItem from '@components/linked-items';

interface RichTextProps {
  content: string;
  images: KontentRichTextImage[];
  links: KontentRichTextLink[];
  linkedItems: KontentItem[];
}

const RichText: FC<RichTextProps> = ({
  content,
  images,
  links,
  linkedItems,
}) => {
  if (!content || !content.length) {
    return null;
  }

  // Remove any line breaks from HTML.
  const cleaned = content.replace(/(\n|\r)+/, '');

  // Parse HTML as React components, replacing any content items.
  const children = parseHTML(cleaned, {
    replace: domNode => replaceNode(domNode, images, links, linkedItems),
  });

  // Return all components inside a fragment.
  return <Fragment>{children}</Fragment>;
};

export default RichText;

/** Get data for Kentico Cloud inline asset. */
function getAsset(id: string, assets: KontentRichTextImage[]) {
  return assets.find(asset => asset.imageId === id);
}

/** Get ID for Kentico Cloud inline asset from DOM node. */
function getAssetId(domNode: DomElement) {
  return get(domNode, 'attribs["data-asset-id"]') || null;
}

/** Get code name for Kentico Cloud inline content item from DOM node. */
function getCodeName(domNode: DomElement) {
  return get(domNode, 'attribs["data-codename"]') || null;
}

/** Get data for Kentico Cloud inline link. */
function getLink(id: number, links: KontentRichTextLink[]) {
  return links.find(link => link.linkId === id);
}

/** Get content for Kentico Cloud inline link from DOM node. */
function getLinkContent(domNode: DomElement) {
  return get(domNode, 'children[0].data') || null;
}

/** Get data for Kentico Cloud inline content item. */
function getLinkedItem(codename: string, linkedItems: KontentItem[]) {
  return linkedItems.find(item => item.system.codename === codename);
}

/** Get ID for Kentico Cloud inline link from DOM node. */
function getLinkId(domNode: DomElement) {
  return get(domNode, 'attribs["data-item-id"]') || null;
}

/** Check if DOM node is a Kentico Cloud inline asset. */
function isAsset(domNode: DomElement) {
  return (
    domNode.name === 'figure' &&
    domNode.attribs &&
    domNode.attribs['data-asset-id']
  );
}

/** Check if DOM node is a Kentico Cloud inline link. */
function isLink(domNode: DomElement) {
  return (
    domNode.name === 'a' && domNode.attribs && domNode.attribs['data-item-id']
  );
}

/** Check if DOM node is a Kentico Cloud inline content item. */
function isLinkedItem(domNode: DomElement) {
  return (
    domNode.name === 'p' &&
    domNode.attribs &&
    domNode.attribs.type === 'application/kenticocloud'
  );
}

/** Replace HTML DOM node with React component. */
function replaceNode(
  domNode: DomElement,
  images: KontentRichTextImage[],
  links: KontentRichTextLink[],
  linkedItems: KontentItem[],
): React.ReactElement | object | undefined | false {
  // Replace inline assets.
  if (isAsset(domNode)) {
    const id = getAssetId(domNode);
    const image = getAsset(id, images);

    if (!image) {
      return false;
    }

    return (
      <InlineAsset
        description={image.description}
        id={image.imageId}
        url={image.url}
      />
    );
  }

  // Replace inline links.
  if (isLink(domNode)) {
    const content = getLinkContent(domNode);
    const id = getLinkId(domNode);
    const link = getLink(id, links);

    if (!link) {
      return false;
    }

    return (
      <InlineLink
        content={content}
        linkId={link.linkId}
        type={link.type}
        urlSlug={link.urlSlug}
      />
    );
  }

  // Replace inline linked items.
  if (isLinkedItem(domNode)) {
    const codename = getCodeName(domNode);
    const linkedItem = getLinkedItem(codename, linkedItems);

    if (!linkedItem) {
      return false;
    }

    return <LinkedItem linkedItem={linkedItem} />;
  }
}
