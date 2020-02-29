import SiteWide from '@components/presentation/SiteWide';
import { css } from '@emotion/core';
import styled from '@utils/styled';
import { rhythm } from '@utils/typography';
import { ITransitionProps } from 'schema';

export const ModalWrapper = styled.div<ITransitionProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.siteBackground};
  height: 100vh;
  opacity: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${rhythm(2)} 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  width: 100%;
  z-index: ${({ theme }) => theme.layers.overlay};

  ${({ state }) => {
    switch (state) {
      case 'entering':
        return css`
          display: flex;
        `;

      case 'entered':
        return css`
          display: flex;
          opacity: 1;
          transform: translateY(0);
        `;

      case 'exiting':
        return css`
          display: flex;
          opacity: 0;
          transform: translateY(20px);
        `;

      case 'exited':
        return css`
          display: none;
        `;
    }
  }}
`;

export const ModalInner = styled(SiteWide)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: ${rhythm(0.5)};
  right: ${rhythm(1)};
  display: flex;
  align-items: center;
  background: none;
  border: 0;
  color: ${({ theme }) => theme.colors.body};
  cursor: pointer;
  font-size: 16px;
  height: 24px;
  justify-content: center;
  line-height: 1em;
  outline: 0;
  padding: 0;
  width: 24px;
  z-index: 1;

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.colors.body};
  }
`;
