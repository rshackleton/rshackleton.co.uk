/**
 * This file requires both `jsx` and `React` to be in scope, therefore both are imported.
 * `@babel/plugin-transform-react-jsx` needs to be configured to use `jsx` using the `@jsx` definition below.
 * */

/* @jsx jsx */

/* eslint-disable no-unused-vars */
import { jsx } from '@emotion/core';
import parseHTML from 'html-react-parser';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
/* eslint-enable no-unused-vars */

import InlineAsset from '@components/shared/InlineAsset';
import InlineLink from '@components/shared/InlineLink';
import LinkedItem from '@components/linked-items';

const RichText = ({ content, images, links, linkedItems }) => {
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
  return <>{children}</>;
};

RichText.propTypes = {
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RichText;

/** Get data for Kentico Cloud inline asset. */
function getAsset(id, assets) {
  return assets.find(asset => asset.imageId === id);
}

/** Get ID for Kentico Cloud inline asset from DOM node. */
function getAssetId(domNode) {
  return get(domNode, 'attribs["data-asset-id"]') || null;
}

/** Get code name for Kentico Cloud inline content item from DOM node. */
function getCodeName(domNode) {
  return get(domNode, 'attribs["data-codename"]') || null;
}

/** Get data for Kentico Cloud inline link. */
function getLink(id, links) {
  return links.find(link => link.linkId === id);
}

/** Get content for Kentico Cloud inline link from DOM node. */
function getLinkContent(domNode) {
  return get(domNode, 'children[0].data') || null;
}

/** Get data for Kentico Cloud inline content item. */
function getLinkedItem(codename, linkedItems) {
  return linkedItems.find(item => item.system.codename === codename);
}

/** Get ID for Kentico Cloud inline link from DOM node. */
function getLinkId(domNode) {
  return get(domNode, 'attribs["data-item-id"]') || null;
}

/** Check if DOM node is a Kentico Cloud inline asset. */
function isAsset(domNode) {
  return (
    domNode.name === 'figure' &&
    domNode.attribs &&
    domNode.attribs['data-asset-id']
  );
}

/** Check if DOM node is a Kentico Cloud inline link. */
function isLink(domNode) {
  return (
    domNode.name === 'a' && domNode.attribs && domNode.attribs['data-item-id']
  );
}

/** Check if DOM node is a Kentico Cloud inline content item. */
function isLinkedItem(domNode) {
  return (
    domNode.name === 'p' &&
    domNode.attribs &&
    domNode.attribs.type === 'application/kenticocloud'
  );
}

/** Replace HTML DOM node with React component. */
function replaceNode(domNode, images, links, linkedItems) {
  // Replace inline assets.
  if (isAsset(domNode)) {
    const id = getAssetId(domNode);
    const image = getAsset(id, images);

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

    return <LinkedItem linkedItem={linkedItem} />;
  }
}
