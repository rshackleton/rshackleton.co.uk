import React, { FC, ReactNode } from 'react';
import { Inner, Outer } from './ContainerInset.styles';

interface IContainerInsetProps {
  children: ReactNode;
}

const ContainerInset: FC<IContainerInsetProps> = ({
  children,
  ...otherProps
}) => (
  <Outer {...otherProps}>
    <Inner>{children}</Inner>
  </Outer>
);

export default ContainerInset;
