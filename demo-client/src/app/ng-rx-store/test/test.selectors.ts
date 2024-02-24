import { createSelector } from '@ngrx/store';
import { RootState } from '../state';

const selectTestState = (state: RootState) => state.test;

const selectHttpRequestResponse = createSelector(selectTestState, (state) => {
  return state.httpRequestResponse;
});

const selectHttpRequestSignalRResponse = createSelector(
  selectTestState,
  (state) => {
    return state.httpRequestSignalRResponse;
  },
);

const selectSignalRRequestResponse = createSelector(
  selectTestState,
  (state) => {
    return state.signalRRequestResponse;
  },
);

export const testSelectors = {
  selectHttpRequestResponse,
  selectHttpRequestSignalRResponse,
  selectSignalRRequestResponse,
};
