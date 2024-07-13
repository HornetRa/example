import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './paths';
import Layout from '../../layouts/Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import HomePage from '../../pages/HomePage/HomePage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT_ROOT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.CONTACTS_ROOT,
        element: <ContactsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
], {
  basename: '/',
});

export default router;
