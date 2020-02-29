import React, { FC } from 'react';

import { Inner, Outer } from './ContainerInset.styles';
import { IContainerInsetProps } from './ContainerInset.types';

const ContainerInset: FC<IContainerInsetProps> = ({ children, ...otherProps }) => (
  <Outer {...otherProps}>
    <Inner>{children}</Inner>
  </Outer>
);

export default ContainerInset;
