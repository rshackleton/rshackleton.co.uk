/**
 * This file requires both `jsx` and `React` to be in scope, therefore both are imported.
 * `@babel/plugin-transform-react-jsx` needs to be configured to use `jsx` using the `@jsx` definition below.
 * */

/* @jsx jsx */

/* eslint-disable no-unused-vars */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import parseHTML from 'html-react-parser';
/* eslint-enable no-unused-vars */

const RichText = ({ content, linkedItems }) => {
  // Remove any line breaks from HTML.
  const cleaned = content.replace(/(\n|\r)+/, '');

  // Parse HTML as React components, replacing any content items.
  const children = parseHTML(cleaned, {
    replace: domNode => replaceNode(domNode, linkedItems),
  });

  // Return all components inside a fragment.
  return <>{children}</>;
};

RichText.propTypes = {
  content: PropTypes.string.isRequired,
  linkedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RichText;

/** Replace HTML DOM node with React component. */
function replaceNode(domNode, linkedItems) {
  if (!isContentItem(domNode)) {
    return;
  }

  // @todo Get correct component to replace content.
  const codename = getCodeName(domNode);
  const linkedItem = getLinkedItem(codename, linkedItems);

  return (
    <blockquote linkedItem={linkedItem}>
      {linkedItem.elements.title.value}
    </blockquote>
  );
}

/** Get code name for Kentico Cloud inline content item from DOM node. */
function getCodeName(domNode) {
  return domNode.attribs ? domNode.attribs['data-codename'] : null;
}

/** Get data for Kentico Cloud inline content item. */
function getLinkedItem(codename, linkedItems) {
  return linkedItems.find(item => item.system.codename === codename);
}

/** Check if DOM node is a Kentico Cloud inline content item. */
function isContentItem(domNode) {
  return domNode.attribs && domNode.attribs.type === 'application/kenticocloud';
}
