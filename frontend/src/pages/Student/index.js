import React, { useState, useEffect } from 'react';
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

export default function Student(props) {
  const [students, setStudents] = useState([]);

  function calculateAgeStudents(dataStudents) {
    const data = dataStudents.map(student => {
      const age = differenceInYears(new Date(), parseISO(student.dateOfBirth));

      return {
        age,
        ...student,
      };
    });

    return data;
  }

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      setStudents(calculateAgeStudents(response.data));
    }

    loadStudents();
  }, []);

  async function handleInputChange(e) {
    const name = e.target.value;
    const response = await api.get('students', { params: { name } });
    setStudents(calculateAgeStudents(response.data));
    console.tron.log('teste');
  }

  async function handleDeleteStudent(studentId) {
    try {
      await api.delete(`students/${studentId}`);

      setStudents(students.filter(student => student.id !== studentId));
    } catch (err) {
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <StudentFilter>
        <strong>Gerenciando alunos</strong>

        <aside>
          <button type="button">CADASTRAR</button>
          <input
            type="text"
            placeholder="Buscar aluno"
            onChange={e => handleInputChange(e)}
          />
        </aside>
      </StudentFilter>

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
                    onClick={() =>
                      props.history.push(`/students/${student.id}`)
                    }
                  >
                    <MdModeEdit size={20} />
                  </EditButton>
                  <DeleteButton
                    type="button"
                    title="Excluir"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    <MdDelete size={20} />
                  </DeleteButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentTable>
    </Container>
  );
}
