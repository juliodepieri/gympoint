import React, { useState, useEffect, useCallback } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import {
  Container,
  Title,
  EditButton,
  DeleteButton,
} from '~/pages/_layouts/list/styles';

import { confirmDialog } from '~/components/ConfirmDialog';
import Pagination from '~/components/Pagination';

export default function Plan({ history }) {
  const [plans, setPlans] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadPlans = useCallback(async (page = 1) => {
    setIsLoading(true);
    const pageSize = 10;

    const response = await api.get('plans', {
      params: {
        page,
        pageSize,
      },
    });

    const { count, rows } = response.data;

    const data = rows.map(plan => ({
      ...plan,
      durationFormatted: `${plan.duration} ${
        plan.duration === 1 ? 'mês' : 'meses'
      }`,
      priceFormatted: formatPrice(plan.price),
    }));
    setPlans(data);
    setTotalPages(Math.ceil(count / pageSize));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  function deleteWithConfirmation(id) {
    async function handleDeletePlan() {
      try {
        await api.delete(`plans/${id}`);
        setPlans(plans.filter(plan => plan.id !== id));
      } catch (err) {
        toast.error('Não foi possível excluír o plano.');
      }
    }

    confirmDialog({
      title: 'Exclusão',
      onConfirm: handleDeletePlan,
      ownerId: 'container',
      message: (
        <>
          <p>Tem certeza que deseja excluir o plano?</p>
        </>
      ),
    });
  }

  return (
    <Container id="container">
      <Title>
        <strong>Gerenciando planos</strong>
        <div>
          <button type="button" onClick={() => history.push('/plans/new')}>
            CADASTRAR
          </button>
        </div>
      </Title>

      {isLoading ? <div>Loading ...</div> : ''}
      <table>
        <colgroup>
          <col span="3" />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th>TÍTULO</th>
            <th align="center">DURAÇÃO</th>
            <th align="center">VALOR p/MÊS</th>
          </tr>
        </thead>

        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td align="center">{plan.durationFormatted}</td>
              <td align="center">{plan.priceFormatted}</td>
              <td>
                <div>
                  <EditButton
                    type="button"
                    title="Editar"
                    onClick={() => history.push(`/plans/${plan.id}`)}
                  >
                    <MdModeEdit size={20} />
                  </EditButton>
                  <DeleteButton
                    type="button"
                    title="Excluir"
                    onClick={() => deleteWithConfirmation(plan.id)}
                  >
                    <MdDelete size={20} />
                  </DeleteButton>
                </div>
              </td>
            </tr>
          ))}

          {plans.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        onChange={loadPlans}
        totalPages={totalPages}
        pageRangeDisplayed={6}
      />
    </Container>
  );
}

Plan.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
