/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import PageRoot from './src/components/PageRoot';

const WrapPageElement = ({ element, props }) => (
  <PageRoot pageContext={props}>{element}</PageRoot>
);

export { WrapPageElement as wrapPageElement };
