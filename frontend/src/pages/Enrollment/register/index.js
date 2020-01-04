import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import api from '~/services/api';

import { FormHeader } from '~/pages/_layouts/form/styles';
import { Content } from './styles';
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
        const { data } = response;

        setEnrollment({
          ...data,
          end_date: parseISO(data.end_date),
          price: data.plan.duration * data.plan.price,
        });
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
      toast.error('Não foi possível salvar os dados da Matrícula.');
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

  function handleStartDateChange(newStartDate) {
    setEnrollment({
      ...enrollment,
      start_date: newStartDate,
      end_date:
        enrollment && enrollment.plan
          ? addMonths(newStartDate, enrollment.plan.duration)
          : undefined,
    });
  }

  function handlePlanChange(newPlan) {
    const enrollmentPrice = newPlan.price * newPlan.duration;
    setEnrollment({
      ...enrollment,
      plan: newPlan,
      price: newPlan ? enrollmentPrice : 0,
      end_date:
        enrollment && parseISO(enrollment.start_date) && newPlan
          ? addMonths(parseISO(enrollment.start_date), newPlan.duration)
          : undefined,
    });
  }

  return (
    <Form schema={schema} initialData={enrollment} onSubmit={handleSubmit}>
      <FormHeader>
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
      </FormHeader>

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
              onChange={handlePlanChange}
            />
          </span>

          <span>
            <DatePicker
              label="DATA DE INÍCIO"
              name="start_date"
              onChange={handleStartDateChange}
            />
          </span>

          <span>
            <DatePicker label="DATA DE TÉRMINO" name="end_date" disabled />
          </span>

          <span>
            <NumberInput
              label="VALOR FINAL"
              name="price"
              disabled
              defaultValue={0}
              isCurrency
            />
          </span>
        </div>
      </Content>
    </Form>
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
