import styled from '@utils/styled';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.siteBackground};
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: ${({ theme }) => theme.layers.overlay};
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 18px;
  height: 18px;
  margin: 8px;
  z-index: 1;
`;
