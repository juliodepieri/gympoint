import React, { useState, useEffect, useCallback } from 'react';

import { MdModeEdit, MdDelete, MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import {
  Container,
  Title,
  EditButton,
  DeleteButton,
} from '~/pages/_layouts/list/styles';
import { confirmDialog } from '~/components/ConfirmDialog';
import Pagination from '~/components/Pagination';

export default function Enrollment({ history }) {
  const [enrollments, setEnrollments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadEnrollments = useCallback(async (page = 1) => {
    setIsLoading(true);
    const pageSize = 10;

    const response = await api.get('enrollments', {
      params: {
        page,
        pageSize,
      },
    });

    const { count, rows } = response.data;

    const data = rows.map(enrollment => ({
      ...enrollment,
      startDateFormatted: format(
        parseISO(enrollment.start_date),
        "d 'de' MMMM yyyy",
        {
          locale: pt,
        }
      ),
      endDateFormatted: format(
        parseISO(enrollment.end_date),
        "d 'de' MMMM yyyy",
        {
          locale: pt,
        }
      ),
    }));

    setEnrollments(data);
    setTotalPages(Math.ceil(count / pageSize));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  function deleteWithConfirmation(id) {
    async function handleDeleteEnrollment() {
      try {
        await api.delete(`enrollments/${id}`);
        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      } catch (err) {
        toast.error('Não foi possível excluír a matrícula.');
      }
    }

    confirmDialog({
      title: 'Exclusão',
      onConfirm: handleDeleteEnrollment,
      ownerId: 'container',
      message: (
        <>
          <p>Tem certeza que deseja excluir a matrícula?</p>
          <p className="text-warning">
            Atenção, esta ação não pode ser desfeita!
          </p>
        </>
      ),
    });
  }

  return (
    <Container id="container">
      <Title>
        <strong>Gerenciando matrículas</strong>
        <div>
          <button
            type="button"
            onClick={() => history.push('/enrollments/new')}
          >
            CADASTRAR
          </button>
        </div>
      </Title>

      {isLoading ? <div>Loading ...</div> : ''}
      <table>
        <colgroup>
          <col span="5" />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th>ALUNO</th>
            <th align="center">PLANO</th>
            <th align="center">INÍCIO</th>
            <th align="center">TÉRMINO</th>
            <th align="center">ATIVA</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              <td>{enrollment.student.name}</td>
              <td align="center">{enrollment.plan.title}</td>
              <td align="center">{enrollment.startDateFormatted}</td>
              <td align="center">{enrollment.endDateFormatted}</td>
              <td align="center">
                {enrollment.active ? (
                  <MdCheckCircle color="#42CB59" />
                ) : (
                  <MdCheckCircle color="#ddd" />
                )}
              </td>
              <td>
                <div>
                  <EditButton
                    type="button"
                    title="Editar"
                    onClick={() =>
                      history.push(`/enrollments/${enrollment.id}`)
                    }
                  >
                    <MdModeEdit size={20} />
                  </EditButton>
                  <DeleteButton
                    type="button"
                    title="Excluir"
                    onClick={() => deleteWithConfirmation(enrollment.id)}
                  >
                    <MdDelete size={20} />
                  </DeleteButton>
                </div>
              </td>
            </tr>
          ))}

          {enrollments.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        onChange={loadEnrollments}
        totalPages={totalPages}
        pageRangeDisplayed={6}
      />
    </Container>
  );
}

Enrollment.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
