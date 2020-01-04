import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, differenceInYears } from 'date-fns';
import PropTypes from 'prop-types';
import { MdModeEdit, MdDelete, MdSearch, MdRotateRight } from 'react-icons/md';
import api from '~/services/api';

import { TitleStudent } from './styles';
import {
  Container,
  EditButton,
  DeleteButton,
} from '~/pages/_layouts/list/styles';

import { confirmDialog } from '~/components/ConfirmDialog';
import Pagination from '~/components/Pagination';
import InputIcon from '~/components/InputIcon';

export default function Student({ history }) {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadStudents = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      const pageSize = 10;

      const response = await api.get('students', {
        params: {
          name: searchName,
          page,
          pageSize,
        },
      });

      const { count, rows } = response.data;

      const data = rows.map(student => ({
        ...student,
        age: differenceInYears(new Date(), parseISO(student.dateOfBirth)),
      }));
      setStudents(data);
      setTotalPages(Math.ceil(count / pageSize));
      setIsLoading(false);
    },
    [searchName]
  );

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  function deleteWithConfirmation(id) {
    async function handleDeleteStudent() {
      try {
        await api.delete(`students/${id}`);
        setStudents(students.filter(student => student.id !== id));
      } catch (err) {
        console.tron.log(err);
      }
    }

    confirmDialog({
      title: 'Exclusão',
      onConfirm: handleDeleteStudent,
      ownerId: 'container',
      message: (
        <>
          <p>Tem certeza que deseja excluir o aluno?</p>
          <p>Atenção, esta ação não pode ser desfeita!</p>
        </>
      ),
    });
  }

  return (
    <Container>
      <TitleStudent>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button" onClick={() => history.push('/students/new')}>
            CADASTRAR
          </button>
          <InputIcon
            type="text"
            placeholder="Buscar aluno"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          >
            <MdSearch />
          </InputIcon>
        </div>
      </TitleStudent>

      {isLoading ? <MdRotateRight /> : ''}
      <table>
        <colgroup>
          <col span="3" />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th align="center">IDADE</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td align="center">{student.age}</td>
              <td>
                <div>
                  <EditButton
                    type="button"
                    title="Editar"
                    onClick={() => history.push(`/students/${student.id}`)}
                  >
                    <MdModeEdit size={20} />
                  </EditButton>
                  <DeleteButton
                    type="button"
                    title="Excluir"
                    onClick={() => deleteWithConfirmation(student.id)}
                  >
                    <MdDelete size={20} />
                  </DeleteButton>
                </div>
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        onChange={loadStudents}
        totalPages={totalPages}
        pageRangeDisplayed={6}
      />
    </Container>
  );
}

Student.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
