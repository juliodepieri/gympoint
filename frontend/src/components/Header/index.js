import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-header.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <ul>
            <li>
              <Link to="/students">ALUNOS</Link>
            </li>
            <li>
              <Link to="/students">PLANOS</Link>
            </li>
            <li>
              <Link to="/students">MATRÍCULAS</Link>
            </li>
            <li>
              <Link to="/students">PEDIDOS DE AUXÍLIO</Link>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
