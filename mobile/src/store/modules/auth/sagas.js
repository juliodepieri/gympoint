import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'sessions/student', {
      id,
    });

    const { student } = response.data;
    yield put(signInSuccess(student));
  } catch (err) {
    switch (err.status) {
      case 401:
        Alert.alert(
          'Falha',
          'Estudante informado não possui matrícula ativa no momento. Entre em contato com a academia!'
        );
        break;

      case 404:
        Alert.alert('Falha', 'ID informado não existe!');
        break;

      default:
        Alert.alert('Falha', 'Falha na autenticação, verifique seus dados!');
    }
    yield put(signFailure());
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
