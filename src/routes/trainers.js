import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const ProfileTrainers = lazy(() => import('Views/Trainer'));

const TrainerRoute = () => {
  return (
    <Switch>
      <Route path="/trainers" exact component={ProfileTrainers} />
      <Route path="/schedule/" exact component={MemberSchedule} />
    </Switch>
  );
};
export default TrainerRoute;
