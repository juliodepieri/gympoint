import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { RegisterHeader, Content, Container } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  dateOfBirth: Yup.string().required('A data de nascimento é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function StudentRegister(props) {
  const [student, setStudent] = useState();
  const { id } = props.match.params;

  async function handleSubmit(student) {
    console.tron.log('Cadastrar', student);
    try {
      await api.post('/students', student);
      setStudent(null);
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
              onClick={() => props.history.push('/students')}
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
            <Input
              name="dateOfBirth"
              type="date"
              format
              // min="2000-04-01"
              // max="2999-04-30"
              label="DATA DE NASCIMENTO"
            />
            <Input
              name="weight"
              type="number"
              min="0"
              step=".01"
              label="PESO (em kg)"
            />
            <Input
              name="height"
              type="number"
              step=".01"
              min="0"
              label="ALTURA (em metros)"
            />
          </div>
        </Content>
      </Form>
    </Container>
  );
}
