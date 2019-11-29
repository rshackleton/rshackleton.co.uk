import styled from '@emotion/styled';

// import mq from '@utils/mq';
import theme from '@utils/theme';
import { rhythm } from '@utils/typography';

export const ErrorMessage = styled.span`
  display: block;
  color: ${theme.colors.error};
  margin-bottom: ${rhythm(0.5)};
`;

export const Field = styled.div`
  display: block;
  margin-bottom: ${rhythm(0.5)};
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: ${rhythm(0.25)};
`;

export const TextBox = styled.input`
  display: block;
  width: 100%;
  max-width: 320px;
  margin: 0;
  margin-bottom: ${rhythm(0.25)};
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding: ${rhythm(0.25)} ${rhythm(0.5)};
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  max-width: 320px;
  margin: 0;
  margin-bottom: ${rhythm(0.25)};
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding: ${rhythm(0.25)} ${rhythm(0.5)};
`;

export const Button = styled.button`
  display: inline-block;
  margin: 0;
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding: ${rhythm(0.25)} ${rhythm(0.5)};
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #cccccc;
  }
`;
