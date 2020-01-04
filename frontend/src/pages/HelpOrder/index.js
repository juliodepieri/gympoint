import React, { useState, useEffect, useCallback } from 'react';
import { MdQuestionAnswer } from 'react-icons/md';
import api from '~/services/api';

import { ContainerHelpOrder, AnswerButton } from './styles';
import { Title } from '~/pages/_layouts/list/styles';

import Pagination from '~/components/Pagination';
import { showAnswerModal } from './AnswerModal';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadHelpOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    const pageSize = 10;

    const response = await api.get('help-orders', {
      params: {
        page,
        pageSize,
      },
    });

    const { count, rows } = response.data;

    setHelpOrders(rows);
    setTotalPages(Math.ceil(count / pageSize));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  function handleAnswerOrder(id) {
    setHelpOrders(helpOrders.filter(helpOrder => helpOrder.id !== id));
  }

  function handleAnswer(helpOrder) {
    showAnswerModal({
      onAnswer: handleAnswerOrder,
      ownerId: 'container',
      helpOrder,
    });
  }

  return (
    <ContainerHelpOrder id="container">
      <Title>
        <strong>Pedidos de auxílio</strong>
      </Title>

      {isLoading ? <div>Loading ...</div> : ''}
      <table>
        <colgroup>
          <col span="1" />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th>ALUNO</th>
          </tr>
        </thead>

        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={helpOrder.id}>
              <td>{helpOrder.student.name}</td>
              <td>
                <div>
                  <AnswerButton
                    type="button"
                    title="Responder"
                    onClick={() => handleAnswer(helpOrder)}
                  >
                    <MdQuestionAnswer size={20} />
                  </AnswerButton>
                </div>
              </td>
            </tr>
          ))}

          {helpOrders.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        onChange={loadHelpOrders}
        totalPages={totalPages}
        pageRangeDisplayed={6}
      />
    </ContainerHelpOrder>
  );
}
