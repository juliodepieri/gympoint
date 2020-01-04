import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { render } from 'react-dom';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Modal,
  ModalBackground,
  ModalHeader,
  ModalBody,
  CloseButton,
} from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
});

function removeElementAnswerModal() {
  const div = document.getElementById('answer-modal');
  if (div) {
    div.parentNode.removeChild(div);
  }
}

export function showAnswerModal({ ownerId, helpOrder, onAnswer }) {
  let div = document.getElementById('answer-modal');
  const owner = ownerId ? document.getElementById(ownerId) : document.body;

  if (!div) {
    div = document.createElement('div');
    div.id = 'answer-modal';
    owner.appendChild(div);
  }

  render(<AnswerModal helpOrder={helpOrder} onAnswer={onAnswer} />, div);
}

export default function AnswerModal({ helpOrder, onAnswer }) {
  function close() {
    removeElementAnswerModal();
  }

  async function handleSubmit({ answer }) {
    try {
      await api.post(`help-orders/${helpOrder.id}/answer`, { answer });
      toast.success('Pedido de auxílio respondido com sucesso.');
      close();
      onAnswer(helpOrder.id);
    } catch (err) {
      toast.error('Não foi possível responder o pedido de auxílio.');
    }
  }

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <CloseButton onClick={close}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form schema={schema} onSubmit={handleSubmit}>
            <strong>PERGUNTA DO ALUNO</strong>
            <p>{helpOrder.question}</p>

            <Input
              label="SUA RESPOSTA"
              name="answer"
              multiline="true"
              rows="4"
              cols="50"
            />

            <button type="submit">Responder Aluno</button>
          </Form>
        </ModalBody>
      </Modal>
    </ModalBackground>
  );
}

AnswerModal.propTypes = {
  helpOrder: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
