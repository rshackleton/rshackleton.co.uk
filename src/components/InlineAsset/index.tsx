import React from 'react';

export interface IInlineAssetProps {
  description?: string;
  id: string;
  image?: string;
}

const InlineAsset: React.FC<IInlineAssetProps> = ({ description, image }) => {
  return <img alt={description} src={image} />;
};

export default InlineAsset;
