import React, { FC, ReactNode } from 'react';

import { Inner, Outer } from './ContainerInset.styles';

interface ContainerInsetProps {
  children: ReactNode;
}

const ContainerInset: FC<ContainerInsetProps> = ({
  children,
  ...otherProps
}) => (
  <Outer {...otherProps}>
    <Inner>{children}</Inner>
  </Outer>
);

export default ContainerInset;
