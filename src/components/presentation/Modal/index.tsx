import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Transition } from 'react-transition-group';

import { ModalClose, ModalInner, ModalWrapper } from './Modal.styles';
import { IModalProps } from './Modal.types';

const Modal: React.FunctionComponent<IModalProps> = ({ children, visible, onClose }) => {
  return (
    <Transition in={visible} timeout={300}>
      {state => (
        <ModalWrapper state={state}>
          <ModalInner>
            <ModalClose onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </ModalClose>
            {children}
          </ModalInner>
        </ModalWrapper>
      )}
    </Transition>
  );
};

export default Modal;
