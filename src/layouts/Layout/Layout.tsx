import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import cn from 'classnames';
import Sidebar from '../../widgets/sidebar/Sidebar';

import * as styles from './Layout.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Layout = () => (
  <div className={cn(styles.layoutWrapper)}>
    <Header />
    <main className={cn(styles.mainContent)}>
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="app-content">
          <Outlet />
        </div>
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default Layout;
