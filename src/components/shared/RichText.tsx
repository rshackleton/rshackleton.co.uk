/* @jsx jsx */
import LinkedItem from '@components/linked-items';
import InlineAsset from '@components/shared/InlineAsset';
import InlineLink from '@components/shared/InlineLink';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from '@emotion/core';
import parseHTML, { DomElement } from 'html-react-parser';
import {
  IKontentItem,
  IKontentRichTextImage,
  IKontentRichTextLink,
} from 'index';
import get from 'lodash/get';
import React, { FC, Fragment } from 'react';

interface IRichTextProps {
  content: string;
  images: IKontentRichTextImage[];
  links: IKontentRichTextLink[];
  linkedItems: IKontentItem[];
}

const RichText: FC<IRichTextProps> = ({
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
function getAsset(
  id: string,
  assets: IKontentRichTextImage[],
): IKontentRichTextImage | undefined {
  return assets.find(asset => asset.imageId === id);
}

/** Get ID for Kentico Cloud inline asset from DOM node. */
function getAssetId(domNode: DomElement): string | null {
  return get(domNode, 'attribs["data-asset-id"]') || null;
}

/** Get code name for Kentico Cloud inline content item from DOM node. */
function getCodeName(domNode: DomElement): string | null {
  return get(domNode, 'attribs["data-codename"]') || null;
}

/** Get data for Kentico Cloud inline link. */
function getLink(
  id: number,
  links: IKontentRichTextLink[],
): IKontentRichTextLink | undefined {
  return links.find(link => link.linkId === id);
}

/** Get content for Kentico Cloud inline link from DOM node. */
function getLinkContent(domNode: DomElement): string | null {
  return get(domNode, 'children[0].data') || null;
}

/** Get data for Kentico Cloud inline content item. */
function getLinkedItem(
  codename: string,
  linkedItems: IKontentItem[],
): IKontentItem | undefined {
  return linkedItems.find(item => item.system.codename === codename);
}

/** Get ID for Kentico Cloud inline link from DOM node. */
function getLinkId(domNode: DomElement): number | null {
  return get(domNode, 'attribs["data-item-id"]') || null;
}

/** Check if DOM node is a Kentico Cloud inline asset. */
function isAsset(domNode: DomElement): boolean {
  return (
    domNode.name === 'figure' &&
    !!domNode.attribs &&
    !!domNode.attribs['data-asset-id']
  );
}

/** Check if DOM node is a Kentico Cloud inline link. */
function isLink(domNode: DomElement): boolean {
  return (
    domNode.name === 'a' &&
    !!domNode.attribs &&
    !!domNode.attribs['data-item-id']
  );
}

/** Check if DOM node is a Kentico Cloud inline content item. */
function isLinkedItem(domNode: DomElement): boolean {
  return (
    domNode.name === 'p' &&
    !!domNode.attribs &&
    domNode.attribs.type === 'application/kenticocloud'
  );
}

/** Replace HTML DOM node with React component. */
function replaceNode(
  domNode: DomElement,
  images: IKontentRichTextImage[],
  links: IKontentRichTextLink[],
  linkedItems: IKontentItem[],
): React.ReactElement | object | undefined | false {
  // Replace inline assets.
  if (isAsset(domNode)) {
    const id = getAssetId(domNode);

    if (!id) {
      return false;
    }

    const image = getAsset(id, images);

    if (!image) {
      return false;
    }

    return (
      <InlineAsset
        description={image.description}
        id={image.imageId}
        image={image.fluid}
      />
    );
  }

  // Replace inline links.
  if (isLink(domNode)) {
    const id = getLinkId(domNode);

    if (!id) {
      return false;
    }

    const link = getLink(id, links);

    if (!link) {
      return false;
    }

    const content = getLinkContent(domNode) || '';

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

    if (!codename) {
      return false;
    }

    const linkedItem = getLinkedItem(codename, linkedItems);

    if (!linkedItem) {
      return false;
    }

    return <LinkedItem linkedItem={linkedItem} />;
  }
}
