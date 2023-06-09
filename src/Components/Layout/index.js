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
import FormActivity from '../Activities/FormActivity';
import FormTrainers from '../Trainers/FormTrainers';
import FormSuperAdmin from '../SuperAdmins/Form';

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
            <Route path="/admins" component={Admins} />
            <Route path="/classes" component={Classes} />
            <Route path="/members" component={Members} />
            <Route path="/subscriptions" component={Subscriptions} />
            <Route exact path="/trainers" component={Trainers} />
            <Route exact path="/trainers/formTrainers" component={FormTrainers} />
            <Route path="/trainers/formTrainers/:id" component={FormTrainers} />
            <Route path="/superAdmins" exact component={SuperAdmins} />
            <Route path="/superAdmins/form" exact component={FormSuperAdmin} />
            <Route path="/superAdmins/form/:id" component={FormSuperAdmin} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
