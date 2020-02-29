import styled from '@utils/styled';
import { rhythm } from '@utils/typography';

export const Container = styled.div`
  display: block;
  max-width: ${({ theme }) => (theme && theme.container ? theme.container.base : '')};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};
`;
