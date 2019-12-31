import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '~/assets/logo-header.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, LinkMenu } from './styles';

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const menus = [
    { name: 'ALUNOS', to: '/students' },
    { name: 'PLANOS', to: '/plans' },
    { name: 'MATRÍCULAS', to: '/enrollments' },
    { name: 'PEDIDOS DE AUXÍLIO', to: '/orders' },
  ];

  function handleSignOut() {
    dispatch(signOut());
  }

  function isActive(path) {
    return path === props.location.pathname;
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          {menus.map(menu => (
            <LinkMenu
              key={menu.name}
              to={menu.to}
              active={isActive(menu.to) ? 1 : 0}
            >
              {menu.name}
            </LinkMenu>
          ))}
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

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
