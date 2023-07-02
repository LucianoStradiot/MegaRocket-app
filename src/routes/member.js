import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const ActivityInfo = lazy(() => import('Views/Member/activities'));
const MembershipMember = lazy(() => import('Views/Member/memberships'));

const MemberRoute = () => {
  return (
    <Switch>
      <Route path="/activities" exact component={ActivityInfo} />

      <Route path="/membership" exact component={MembershipMember} />
      <Route path="/schedule" exact component={MemberSchedule} />
      <Route path="/schedule/:id" component={MemberSchedule} />
    </Switch>
  );
};
export default MemberRoute;
