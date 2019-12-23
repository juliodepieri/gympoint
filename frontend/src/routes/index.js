import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Student from '../pages/Student';
import StudentRegister from '../pages/Student/register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/:id" component={StudentRegister} isPrivate />
      <Route path="/students" component={Student} isPrivate />
    </Switch>
  );
}
