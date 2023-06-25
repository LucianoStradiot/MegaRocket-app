import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from 'Components/Layout/layout.module.css';

import Routes from 'routes';
function Layout() {
  return (
    <>
      <Router>
        <Header />
        <div className={styles.container}>
          <Routes />
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
