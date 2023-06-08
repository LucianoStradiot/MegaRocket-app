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
import FormActivities from '../Activities/FormActivity';

function Layout() {
  return (
    <>
      <Router>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/activities" exact component={Activities} />
            <Route path="/admins" component={Admins} />
            <Route path="/classes" component={Classes} />
            <Route path="/members" component={Members} />
            <Route path="/subscriptions" component={Subscriptions} />
            <Route path="/superAdmins" component={SuperAdmins} />
            <Route path="/trainers" component={Trainers} />
            <Route path="/activities/form" component={FormActivities} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
