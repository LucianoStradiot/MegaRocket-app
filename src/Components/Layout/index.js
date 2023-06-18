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
import activitiesMember from 'Views/Member/activities';
import loginMember from 'Views/Member/login';
import membershipMember from 'Views/Member/memberships';
import scheduleMember from 'Views/Member/schedule';
import signUpMember from 'Views/Member/signUp';
import FormClasses from 'Views/Admin/Classes/FormClasses/index';
import MemberUser from 'Views/Member';

function Layout() {
  return (
    <>
      <Router>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route path="/member" exact component={MemberUser} />
            <Route path="/member/activities" exact component={activitiesMember} />
            <Route path="/member/login" exact component={loginMember} />
            <Route path="/member/membership" exact component={membershipMember} />
            <Route path="/member/schedule" exact component={scheduleMember} />
            <Route path="/member/signUp" exact component={signUpMember} />
            <Route path="/" exact component={Home} />
            <Route path="/memberUser" exact component={MemberUser} />
            <Route path="/admins/activities" exact component={Activities} />
            <Route path="/admins/activities/form" exact component={FormActivity} />
            <Route path="/admins/activities/form/:id" component={FormActivity} />
            <Route path="/superAdmins/admins" exact component={Admins} />
            <Route path="/superAdmins/admins/form" exact component={AdminForm} />
            <Route path="/admins/form/:id" component={AdminForm} />{' '}
            <Route path="/admins/classes" exact component={Classes} />
            <Route path="/admins/classes/form" exact component={FormClasses} />
            <Route path="/admins/classes/form/:id" component={FormClasses} />
            <Route path="/admins/members" exact component={Members} />
            <Route path="/admins/members/form" exact component={FormMembers} />
            <Route path="/admins/members/form/:id" component={FormMembers} />
            <Route path="/admins/subscriptions" exact component={Subscriptions} />
            <Route path="/admins/subscriptions/form" exact component={FormSubscriptions} />
            <Route path="/admins/subscriptions/form/:id" component={FormSubscriptions} />
            <Route path="/superAdmins" exact component={SuperAdmins} />
            <Route path="/superAdmins/form" exact component={FormSuperAdmin} />
            <Route path="/superAdmins/form/:id" component={FormSuperAdmin} />
            <Route exact path="/admins/trainers" component={Trainers} />
            <Route exact path="/admins/trainers/formTrainers" component={FormTrainers} />
            <Route path="/admins/trainers/formTrainers/:id" component={FormTrainers} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
