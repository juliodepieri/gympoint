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
import FormLayout from '~/pages/_layouts/form';
import ListLayout from '~/pages/_layouts/list';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path="/students/:id"
        component={StudentRegister}
        layout={FormLayout}
        isPrivate
      />
      <Route
        path="/students"
        component={Student}
        layout={ListLayout}
        isPrivate
      />
      <Route
        path="/enrollments/:id"
        component={EnrollmentRegister}
        layout={FormLayout}
        isPrivate
      />
      <Route
        path="/enrollments"
        component={Enrollment}
        layout={ListLayout}
        isPrivate
      />
      <Route
        path="/plans/:id"
        component={PlanRegister}
        layout={FormLayout}
        isPrivate
      />
      <Route path="/plans" component={Plan} layout={ListLayout} isPrivate />
      <Route
        path="/help-orders"
        component={HelpOrder}
        layout={ListLayout}
        isPrivate
      />
    </Switch>
  );
}
