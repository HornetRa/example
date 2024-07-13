import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from './getCounter';
import { ICounterSchema } from '../schemas/counterSchema';

export const getCounterValue = createSelector(
  getCounter,
  (counter: ICounterSchema) => counter.value,
);
