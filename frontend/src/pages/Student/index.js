import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, differenceInYears } from 'date-fns';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import api from '~/services/api';

import {
  Container,
  StudentTable,
  StudentFilter,
  EditButton,
  DeleteButton,
} from './styles';

import { confirmDialog } from '~/components/ConfirmDialog';
import Pagination from '~/components/Pagination';

export default function Student(props) {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadStudents = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      const pageSize = 2;

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
          <p>Atenção, esta ação é irreversível!</p>
        </>
      ),
    });
  }

  return (
    <Container id="container">
      <StudentFilter>
        <strong>Gerenciando alunos</strong>

        <aside>
          <button
            type="button"
            onClick={() => props.history.push('/students/new')}
          >
            CADASTRAR
          </button>
          <input
            type="text"
            placeholder="Buscar aluno"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </aside>
      </StudentFilter>

      {isLoading ? <div>Loading ...</div> : ''}
      <StudentTable>
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
                    onClick={() =>
                      props.history.push(`/students/${student.id}`)
                    }
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
      </StudentTable>
      <Pagination
        onChange={loadStudents}
        totalPages={totalPages}
        pageRangeDisplayed={6}
      />
    </Container>
  );
}
