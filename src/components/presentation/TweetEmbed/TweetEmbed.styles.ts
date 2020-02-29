import mq from '@utils/mq';
import styled from '@utils/styled';
import { rhythm } from '@utils/typography';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 ${rhythm(-0.5)} ${rhythm(1)} !important;

  ${mq.sm} {
    margin: 0 ${rhythm(-1)} ${rhythm(1)} !important;
  }

  .twitter-tweet {
    width: auto !important;
    margin: 0 !important;
  }
`;
