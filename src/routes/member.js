import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const MembershipMember = lazy(() => import('Views/Member/memberships'));

const MemberRoute = () => {
  return (
    <Switch>
      <Route path="/membership" exact component={MembershipMember} />
      <Route path="/schedule/" component={MemberSchedule} />
    </Switch>
  );
};
export default MemberRoute;
