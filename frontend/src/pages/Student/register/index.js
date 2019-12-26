import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { RegisterHeader, Content, Container } from './styles';
import api from '~/services/api';

import NumberInput from '~/components/NumberInput';
import DatePicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  dateOfBirth: Yup.string().required('A data de nascimento é obrigatória'),
  weight: Yup.number().required('O peso é obrigatório'),
  height: Yup.number().required('A altura é obrigatória'),
});

export default function StudentRegister(props) {
  const [student, setStudent] = useState();
  const { params } = props.match;
  const { id } = params;

  useEffect(() => {
    async function loadStudent() {
      if (id !== 'new') {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      }
    }
    loadStudent();
  }, [id]);

  async function handleSubmit(data, { resetForm }) {
    console.tron.log('Cadastrar', data);
    try {
      if (id === 'new') {
        await api.post('/students', data);
        resetForm();
        toast.success('Aluno cadastrado com sucesso.');
      } else {
        const response = await api.put(`/students/${id}`, data);
        console.tron.log(response);
        toast.success('Aluno atualizado com sucesso.');
        props.history.push('/students');
      }
    } catch (err) {
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
        <RegisterHeader>
          <strong>
            {id !== 'new' ? 'Edição de aluno' : 'Cadastro de aluno'}
          </strong>

          <aside>
            <button
              type="button"
              onClick={() => {
                console.log(student);
                // props.history.push('/students')
              }}
            >
              VOLTAR
            </button>
            <button type="submit">CADASTRAR</button>
          </aside>
        </RegisterHeader>

        <Content>
          <Input name="name" placeholder="John Doe" label="NOME COMPLETO" />
          <Input
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            label="ENDEREÇO DE E-MAIL"
          />
          <div>
            <DatePicker name="dateOfBirth" label="DATA DE NASCIMENTO" />

            <NumberInput name="weight" label="PESO (em kg)" />

            <NumberInput name="height" label="ALTURA (em metros)" />
          </div>
        </Content>
      </Form>
    </Container>
  );
}
