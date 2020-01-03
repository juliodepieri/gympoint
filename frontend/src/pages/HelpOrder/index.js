import React, { useState, useEffect, useCallback } from 'react';
import { MdQuestionAnswer } from 'react-icons/md';
import api from '~/services/api';

import { Container, StudentTable, Title } from './styles';

import Pagination from '~/components/Pagination';

export default function HelpOrder({ history }) {
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

  return (
    <Container id="container">
      <Title>
        <strong>Pedidos de auxílio</strong>
      </Title>

      {isLoading ? <div>Loading ...</div> : ''}
      <StudentTable>
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
                  <button
                    type="button"
                    title="Editar"
                    onClick={() => history.push(`/help-orders/${helpOrder.id}`)}
                  >
                    <MdQuestionAnswer size={20} />
                  </button>
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
      </StudentTable>
      <Pagination
        onChange={loadHelpOrders}
        totalPages={totalPages}
        pageRangeDisplayed={6}
      />
    </Container>
  );
}
