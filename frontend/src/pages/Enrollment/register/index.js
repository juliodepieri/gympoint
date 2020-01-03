import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import api from '~/services/api';

import { RegisterHeader, Content, Container } from './styles';
import NumberInput from '~/components/NumberInput';
import DatePicker from '~/components/DatePicker';
import AsyncSelectInput from '~/components/AsyncSelectInput';
import SelectInput from '~/components/SelectInput';

const schema = Yup.object().shape({
  student: Yup.object().shape({
    id: Yup.number().required('O aluno é obrigatório'),
  }),
  plan: Yup.object().shape({
    id: Yup.number().required('O plano é obrigatório'),
  }),
  start_date: Yup.date().required('A data de início é obrigatória'),
});

export default function EnrollmentRegister({ match, history }) {
  const [enrollment, setEnrollment] = useState();
  const [plans, setPlans] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`/plans`);
      setPlans(response.data.rows);
    }

    loadPlans();
  }, []);

  useEffect(() => {
    async function loadEnrollment() {
      if (id !== 'new') {
        const response = await api.get(`/enrollments/${id}`);
        setEnrollment(response.data);
      }
    }

    loadEnrollment();
  }, [id]);

  async function handleSubmit({ student, plan, start_date }) {
    try {
      const data = {
        plan_id: plan.id,
        student_id: student.id,
        start_date,
      };

      if (id === 'new') {
        await api.post('/enrollments', data);
        toast.success('Matrícula cadastrado com sucesso.');
      } else {
        await api.put(`/enrollments/${id}`, data);
        toast.success('Matrícula atualizada com sucesso.');
      }
      history.push('/enrollments');
    } catch (err) {
      console.tron.log(err);
    }
  }

  const loadOptions = async name => {
    const response = await api.get('students', {
      params: {
        name,
        pageSize: 10,
      },
    });

    const students = response.data.rows;
    return students;
  };

  return (
    <Container>
      <Form schema={schema} initialData={enrollment} onSubmit={handleSubmit}>
        <RegisterHeader>
          <strong>
            {id !== 'new' ? 'Edição de matrícula' : 'Cadastro de matrícula'}
          </strong>

          <aside>
            <button
              type="button"
              onClick={() => {
                history.push('/enrollments');
              }}
            >
              VOLTAR
            </button>
            <button type="submit">SALVAR</button>
          </aside>
        </RegisterHeader>

        <Content>
          <AsyncSelectInput
            name="student"
            loadOptions={loadOptions}
            label="ALUNO"
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            placeholder="Buscar Aluno"
          />
          <div className="row">
            <span>
              <SelectInput
                name="plan"
                options={plans}
                label="PLANO"
                placeholder="Selecione o Plano"
                getOptionLabel={option => option.title}
              />
            </span>

            <span>
              <DatePicker label="DATA DE INÍCIO" name="start_date" />
            </span>

            <span>
              <DatePicker label="DATA DE TÉRMINO" name="end_date" />
            </span>

            <span>
              <NumberInput
                label="VALOR FINAL"
                name="totalPrice"
                disabled
                defaultValue={0}
              />
            </span>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

EnrollmentRegister.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
