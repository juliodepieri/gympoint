import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { render } from 'react-dom';
import {
  Background,
  Content,
  Header,
  CloseButton,
  Body,
  Footer,
} from './styles';

function removeElementConfirmDialog() {
  const divDialog = document.getElementById('confirm-dialog');
  if (divDialog) {
    divDialog.parentNode.removeChild(divDialog);
    // divDialog.style.display = 'none';
  }
}

function createElementConfirmDialog(properties) {
  let divDialog = document.getElementById('confirm-dialog');

  const { ownerId } = properties;
  const owner = ownerId ? document.getElementById(ownerId) : document.body;

  if (ownerId) delete properties.ownerId;

  if (!divDialog) {
    divDialog = document.createElement('div');
    divDialog.id = 'confirm-dialog';
    owner.appendChild(divDialog);
  }
  // divDialog.style.display = 'block';

  render(<ConfirmDialog {...properties} />, divDialog);
}

export function confirmDialog(properties) {
  createElementConfirmDialog(properties);
}

export default function ConfirmDialog(props) {
  const {
    show,
    title,
    showCloseButton,
    onCancel,
    onConfirm,
    onClose,
    message,
    children,
  } = props;

  function close() {
    removeElementConfirmDialog();
  }

  function open() {
    createElementConfirmDialog(props);
  }

  useEffect(() => {
    if (show) {
      open();
    } else {
      close();
    }
  }, [show]); // eslint-disable-line

  function handleCloseDialog() {
    if (onClose) onClose();
    close();
  }

  function handleCancelDialog() {
    if (onCancel) onCancel();
    close();
  }

  function handleConfirmDialog() {
    if (onConfirm) onConfirm();
    close();
  }

  return (
    <Background className="confirm-dialog-background">
      <Content className="confirm-dialog-content">
        <Header className="confirm-dialog-header">
          <h2>{title}</h2>
          {showCloseButton && (
            <CloseButton onClick={() => handleCloseDialog()}>
              &times;
            </CloseButton>
          )}
        </Header>
        <Body className="confirm-dialog-content">
          {message}
          {children}
        </Body>
        <Footer className="confirm-dialog-footer">
          <button
            type="button"
            className="cancelar"
            onClick={() => handleCancelDialog()}
          >
            Cancelar
          </button>
          <button type="button" onClick={() => handleConfirmDialog()}>
            Confirmar
          </button>
        </Footer>
      </Content>
    </Background>
  );
}

ConfirmDialog.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  children: PropTypes.node,
};

ConfirmDialog.defaultProps = {
  show: true,
  showCloseButton: false,
  title: '',
  onCancel: null,
  onConfirm: null,
  onClose: null,
  message: null,
  children: null,
};
