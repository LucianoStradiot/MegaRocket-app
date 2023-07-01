import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MemberUser = lazy(() => import('./membersUsers/members'));
const MemberSchedule = lazy(() => import('./membersUsers/memberSchedule'));
const ActivityInfo = lazy(() => import('./membersUsers/activitiesMembers'));
const SignUpMember = lazy(() => import('./membersUsers/signUpMembers'));
const LoginMember = lazy(() => import('./membersUsers/loginMembers'));
const MembershipMember = lazy(() => import('./membersUsers/membershipsMembers'));

const MemberRoute = () => {
  return (
    <Switch>
      <Route path="/" exact component={MemberUser} />
      <Route path="/activities" exact component={ActivityInfo} />
      <Route path="/login" exact component={LoginMember} />
      <Route path="/membership" exact component={MembershipMember} />
      <Route path="/schedule" exact component={MemberSchedule} />
      <Route path="/schedule/:id" component={MemberSchedule} />
      <Route path="/signUp" exact component={SignUpMember} />
    </Switch>
  );
};
export default MemberRoute;
