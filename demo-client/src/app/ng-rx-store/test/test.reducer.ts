import { createReducer, on } from '@ngrx/store';
import { testActions } from './test.actions';
import { initialTestState, TestState } from './test.state';

export const testReducer = createReducer(
  initialTestState,
  on(
    testActions.httpRequestResponse,
    (state): TestState => ({
      ...state,
      httpRequestResponse: 'Calling server ....',
    }),
  ),
  on(
    testActions.httpRequestResponseSuccess,
    (state, { serverResponse }): TestState => ({
      ...state,
      httpRequestResponse: serverResponse,
    }),
  ),
  on(
    testActions.httpRequestSignalRResponse,
    (state): TestState => ({
      ...state,
      httpRequestSignalRResponse: 'Calling server ....',
    }),
  ),
  on(
    testActions.httpRequestSignalRResponseSuccess,
    (state, { serverResponse }): TestState => ({
      ...state,
      httpRequestSignalRResponse: serverResponse,
    }),
  ),
  on(
    testActions.signalRRequestResponse,
    (state): TestState => ({
      ...state,
      signalRRequestResponse: 'Calling server ....',
    }),
  ),
  on(
    testActions.signalRRequestResponseSuccess,
    (state, { serverResponse }): TestState => ({
      ...state,
      signalRRequestResponse: serverResponse,
    }),
  ),
);
