import React, { FC } from 'react';

import { Image } from './InlineAsset.styles';
import { IInlineAssetProps } from './InlineAsset.types';

const InlineAsset: FC<IInlineAssetProps> = ({ description, id, image }) => {
  if (!image) {
    console.warn(`(ID: "${id}") No "FluidObject" supplied for "image" prop.`);
    return null;
  }

  return <Image key={id} alt={description} fluid={image} />;
};

export default InlineAsset;
