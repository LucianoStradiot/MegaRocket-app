import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MemberSchedule = lazy(() => import('Views/Member/schedule'));
const ProfileTrainers = lazy(() => import('Views/Trainer'));
const Profile = lazy(() => import('Views/Profile'));
const FormTrainer = lazy(() => import('Views/Profile/FormTrainers'));

const TrainerRoute = () => {
  return (
    <Switch>
      <Route path="/trainers" exact component={ProfileTrainers} />
      <Route path="/schedule/" exact component={MemberSchedule} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/form/edit-trainer" component={FormTrainer} />
    </Switch>
  );
};
export default TrainerRoute;
