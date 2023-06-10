import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';
import FormMembers from '../Members/FormMembers';
import FormSubscriptions from '../Subscriptions/FormSubscriptions/index';
import FormActivity from '../Activities/FormActivity';
import FormTrainers from '../Trainers/FormTrainers';
import FormSuperAdmin from '../SuperAdmins/Form';
import AdminForm from '../Admins/Form';

import FormClasses from '../Classes/FormClasses/index';

function Layout() {
  return (
    <>
      <Router>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/activities" exact component={Activities} />
            <Route path="/activities/form" exact component={FormActivity} />
            <Route path="/activities/form/:id" component={FormActivity} />
            <Route path="/admins" exact component={Admins} />
            <Route path="/admins/form" exact component={AdminForm} />
            <Route path="/admins/form/:id" component={AdminForm} />{' '}
            <Route path="/classes" exact component={Classes} />
            <Route path="/classes/form" exact component={FormClasses} />
            <Route path="/classes/form/:id" component={FormClasses} />
            <Route path="/members" exact component={Members} />
            <Route path="/members/form" exact component={FormMembers} />
            <Route path="/members/form/:id" component={FormMembers} />
            <Route path="/subscriptions" exact component={Subscriptions} />
            <Route path="/subscriptions/form" exact component={FormSubscriptions} />
            <Route path="/subscriptions/form/:id" component={FormSubscriptions} />
            <Route path="/superAdmins" exact component={SuperAdmins} />
            <Route path="/superAdmins/form" exact component={FormSuperAdmin} />
            <Route path="/superAdmins/form/:id" component={FormSuperAdmin} />
            <Route exact path="/trainers" component={Trainers} />
            <Route exact path="/trainers/formTrainers" component={FormTrainers} />
            <Route path="/trainers/formTrainers/:id" component={FormTrainers} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
