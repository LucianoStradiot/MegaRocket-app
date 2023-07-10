import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const MembershipMember = lazy(() => import('Views/Member/memberships'));
const Profile = lazy(() => import('Views/Profile'));
const FormMember = lazy(() => import('Views/Profile/FormMembers'));

const MemberRoute = () => {
  return (
    <Switch>
      <Route path="/membership" exact component={MembershipMember} />
      <Route path="/schedule/" component={MemberSchedule} />
      <Route path="/profile/form" component={FormMember} />
      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
};
export default MemberRoute;
