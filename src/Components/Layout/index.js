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
import FormSubscriptions from '../Subscriptions/FormSubscriptions/index';

function Layout() {
  return (
    <>
      <Router>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/activities" component={Activities} />
            <Route path="/admins" component={Admins} />
            <Route path="/classes" component={Classes} />
            <Route path="/members" component={Members} />
            <Route path="/subscriptions" exact component={Subscriptions} />
            <Route path="/superAdmins" component={SuperAdmins} />
            <Route path="/trainers" component={Trainers} />
            <Route path="/subscriptions/form" exact component={FormSubscriptions} />
            <Route path="/subscriptions/form/:id" component={FormSubscriptions} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
