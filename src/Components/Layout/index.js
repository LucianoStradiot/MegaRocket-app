import Activities from 'Views/Admin/Activities';
import Classes from 'Views/Admin/Classes';
import Members from 'Views/Admin/Members';
import Subscriptions from 'Views/Admin/Subscriptions';
import SuperAdmins from 'Views/SuperAdmin/SAManagement';
import Trainers from 'Views/Admin/Trainers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'Components/Home/index';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from 'Components/Layout/layout.module.css';
import FormMembers from 'Views/Admin/Members/FormMembers';
import FormSubscriptions from 'Views/Admin/Subscriptions/FormSubscriptions/index';
import FormActivity from 'Views/Admin/Activities/FormActivity';
import FormTrainers from 'Views/Admin/Trainers/FormTrainers';
import FormSuperAdmin from 'Views/SuperAdmin/SAManagement/Form';
import Admins from 'Views/SuperAdmin/AdminManagement/index';
import AdminForm from 'Views/SuperAdmin/AdminManagement/Form';

import FormClasses from 'Views/Admin/Classes/FormClasses/index';

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
