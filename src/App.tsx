import React from 'react';
import { RouterProvider } from './providers/routerProvider/RouterProvider';

const App = () => (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
);

import { StoreProvider } from './providers/storeProvider/StoreProvider';

export default App;
