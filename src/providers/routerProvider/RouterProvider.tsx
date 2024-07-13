import React, { Suspense } from 'react';
import { RouterProvider as Provider } from 'react-router-dom';
import router from './routers';

export const RouterProvider = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Provider router={router} />
  </Suspense>
);
