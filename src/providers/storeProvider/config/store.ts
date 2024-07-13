import {
  configureStore,
} from '@reduxjs/toolkit';

import { IStoreSchema } from './StoreSchema';
import { counterReducer } from '../slice/counterSlice';


export const store = configureStore<IStoreSchema>({
  reducer: {
    counter: counterReducer,
  },
  devTools: IS_DEV
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
