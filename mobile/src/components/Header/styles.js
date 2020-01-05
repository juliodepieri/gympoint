import styled from 'styled-components/native';
import logo from '~/assets/logo-header.png';

export const Container = styled.View`
  display: flex;
  align-items: center;
  background: #fff;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 116px;
  height: 18px;
  margin: 13px 0;
`;
