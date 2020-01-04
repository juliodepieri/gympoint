import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import NumberInput from '~/components/NumberInput';
import api from '~/services/api';

import { FormHeader } from '~/pages/_layouts/form/styles';
import { Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('A duração (em meses) é obrigatória'),
  price: Yup.number().required('O preço mensal é obrigatório'),
});

export default function PlanRegister({ match, history }) {
  const [plan, setPlan] = useState();
  const { id } = match.params;

  useEffect(() => {
    async function loadPlan() {
      if (id !== 'new') {
        const response = await api.get(`/plans/${id}`);
        setPlan(response.data);
      }
    }
    loadPlan();
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (id === 'new') {
        await api.post('/plans', data);
        toast.success('Plano cadastrado com sucesso.');
      } else {
        await api.put(`/plans/${id}`, data);
        toast.success('Plano atualizado com sucesso.');
      }
      history.push('/plans');
    } catch (err) {
      toast.error('Não foi possível salvar o plano.');
    }
  }

  function handleDurationChange(newDuration) {
    const price = plan ? plan.price : 0;
    setPlan({
      ...plan,
      duration: newDuration,
      totalPrice: price * newDuration,
    });
  }

  function handlePriceChange(newPrice) {
    const duration = plan ? plan.duration : 0;
    setPlan({
      ...plan,
      price: newPrice,
      totalPrice: newPrice * duration,
    });
  }

  return (
    <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
      <FormHeader>
        <strong>
          {id !== 'new' ? 'Edição de plano' : 'Cadastro de plano'}
        </strong>

        <aside>
          <button
            type="button"
            onClick={() => {
              history.push('/plans');
            }}
          >
            VOLTAR
          </button>
          <button type="submit">SALVAR</button>
        </aside>
      </FormHeader>

      <Content>
        <Input
          label="TÍTULO DO PLANO"
          name="title"
          placeholder="Título do Plano"
        />

        <div className="row">
          <span>
            <NumberInput
              label="DURAÇÃO (em meses)"
              name="duration"
              onValueChange={handleDurationChange}
            />
          </span>

          <span>
            <NumberInput
              label="PREÇO MENSAL"
              name="price"
              isCurrency
              onValueChange={handlePriceChange}
            />
          </span>

          <span>
            <NumberInput
              label="PREÇO TOTAL"
              name="totalPrice"
              isCurrency
              disabled
            />
          </span>
        </div>
      </Content>
    </Form>
  );
}

PlanRegister.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
