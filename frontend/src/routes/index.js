import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Student from '../pages/Student';
import StudentRegister from '../pages/Student/register';
import Enrollment from '../pages/Enrollment';
import EnrollmentRegister from '../pages/Enrollment/register';
import Plan from '../pages/Plan';
import PlanRegister from '../pages/Plan/register';
import HelpOrder from '../pages/HelpOrder';
import HelpOrderRegister from '../pages/HelpOrder/register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/:id" component={StudentRegister} isPrivate />
      <Route path="/students" component={Student} isPrivate />
      <Route path="/enrollments/:id" component={EnrollmentRegister} isPrivate />
      <Route path="/enrollments" component={Enrollment} isPrivate />
      <Route path="/plans/:id" component={PlanRegister} isPrivate />
      <Route path="/plans" component={Plan} isPrivate />
      <Route path="/help-orders/:id" component={HelpOrderRegister} isPrivate />
      <Route path="/help-orders" component={HelpOrder} isPrivate />
    </Switch>
  );
}
