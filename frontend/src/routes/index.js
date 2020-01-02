import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Student from '../pages/Student';
import StudentRegister from '../pages/Student/register';
import Enrollment from '../pages/Enrollment';
import EnrollmentRegister from '../pages/Enrollment/register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/:id" component={StudentRegister} isPrivate />
      <Route path="/students" component={Student} isPrivate />
      <Route path="/enrollments/:id" component={EnrollmentRegister} isPrivate />
      <Route path="/enrollments" component={Enrollment} isPrivate />
    </Switch>
  );
}
