import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';
import { Image } from './InlineAsset.styles';

interface IInlineAssetProps {
  description?: string;
  id: string;
  image: FluidObject | undefined;
}

const InlineAsset: FC<IInlineAssetProps> = ({ description, id, image }) => {
  if (!image) {
    console.warn(`(ID: "${id}") No "FluidObject" supplied for "image" prop.`);
    return null;
  }

  return <Image key={id} alt={description} fluid={image} />;
};

export default InlineAsset;
