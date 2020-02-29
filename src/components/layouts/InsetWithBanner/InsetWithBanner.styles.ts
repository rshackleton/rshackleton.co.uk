import BannerBase from '@components/presentation/Banner';
import ContainerInsetBase from '@components/presentation/ContainerInset';
import styled from '@utils/styled';
import { rhythm } from '@utils/typography';

export const Banner = styled(BannerBase)`
  position: fixed;
  top: ${({ theme }) => rhythm(theme.dimensions.header)};
  width: 100%;
`;

export const ContainerInset = styled(ContainerInsetBase)`
  margin-top: ${({ theme }) => rhythm(theme.dimensions.banner)};
`;

export const ContentWrapper = styled.main``;
